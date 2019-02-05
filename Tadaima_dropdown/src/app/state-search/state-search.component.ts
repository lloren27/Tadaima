import { Component, OnInit, ViewChild} from "@angular/core";

import { Observable, Subject } from "rxjs";

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { States } from "../states";
import { StateService } from "../state.service";

@Component({
  selector: "app-state-search",
  templateUrl: "./state-search.component.html",
  styleUrls: ["./state-search.component.css"]
})

export class StateSearchComponent implements OnInit {

  @ViewChild('searchBox') private searchBox;
 
  states$: Observable<States[]>;
  private searchTerms = new Subject<string>();
  states: States[];
  closeStates: Boolean = false;
  closePipes: Boolean = true;
  showClearButton:Boolean = false;
  state: String;
  showPhase:Boolean = false;
  limiteInputd:Boolean =false;

  constructor(private stateService: StateService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.states$ = this.searchTerms.pipe(
      debounceTime(3),
      distinctUntilChanged(),
      switchMap((term: string) => this.stateService.searchStates(term))
    );
  }
  pushTriangle() {
    this.closeStates = !this.closeStates;
    this.closePipes = false;
    this.stateService.getStates().subscribe(states => (this.states = states));
  }
  clickInInput(){
    this.closeStates = false;
    this.closePipes = true;
  }
  printState(state){
      this.searchBox.nativeElement.focus();
      let startPos =  this.searchBox.nativeElement.selectionStart;
      let inputState =  this.searchBox.nativeElement.value;
    
      if(inputState.length < 4){
        this.searchBox.nativeElement.value =  state  +" "+ inputState.substring(startPos, inputState.length)
      }else if(inputState.length > 15){
        this.limiteInputd = true;
        this.searchBox.nativeElement.value =  inputState.substring(0, startPos)+" "+  state  +" "+ inputState.substring(startPos, inputState.length)
      }
      else{
        this.searchBox.nativeElement.value =  inputState.substring(0, startPos)+" "+  state  +" "+ inputState.substring(startPos, inputState.length)
      }
      
      
      this.closeStates = false;
      this.closePipes = false;
      this.showClearButton = true;
    }
  clearInput (){
    this.searchBox.nativeElement.value = "";
    this.showClearButton = false;
    this.limiteInputd = false;
  }
 } 
