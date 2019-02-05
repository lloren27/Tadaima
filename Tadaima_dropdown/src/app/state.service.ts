import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { States } from './states';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class StateService {

  private statesUrl = 'api/states';  

  constructor(
    private http: HttpClient) { }

  /** GET cargar los estados del fake service */
  getStates (): Observable<States[]> {
    return this.http.get<States[]>(this.statesUrl)
      .pipe(tap(_ => console.log('states cargados'))
      );
  }
  /* GET buscador de estados que contenga el nombre */
  searchStates(term: string): Observable<States[]> {
    if (!term.trim()) {
      // si no encuentra estado devuelve un array vacio 
      return of([]);
    }
    return this.http.get<States[]>(`${this.statesUrl}/?name=${term}`).pipe(
      tap(_ => console.log(`encontrado states que coincide con "${term}"`)),
    );
  }
}
