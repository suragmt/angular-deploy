import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class AppEffects {
  loadUsers$ = createEffect(() => {
    return (
      this.actions$.pipe(
        tap((val) => {
          console.log(val, 'val');
        }),
        ofType('User Users Success')
      ),
      exhaustMap(() =>
        new Observable((observer) => {
          observer.next([{ name: 'ram', address: 'manal' }]);
        }).pipe(map((users) => ({ type: 'User Users Fetch', payload: users }), 
      catchError(()=>of({type:'error fetch'}))))
      )
    );
  });

  movies$ = new Observable((observer) => {
    setTimeout(() => {
      observer.next([
        { name: 'garudan', year: 2023 },
        { name: 'animal', year: 2023 },
      ]);
    }, 2000);
  });

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      tap((value) => {
        console.log('Spy:', value);
      }),
      ofType('User Users Success'),
      exhaustMap(() =>
        this.movies$.pipe(
          map((movies) => ({ type: '[Home] movieLoaded', payload: movies })),
          catchError(() => of({ type: 'movie error' }))
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
