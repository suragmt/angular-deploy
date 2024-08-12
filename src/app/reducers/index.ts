import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromUser from '../user.reducer';
import * as fromHome from '../home.reducer';


export interface State {

  [fromUser.userFeatureKey]: fromUser.StateT;
  [fromHome.homeFeatureKey]: fromHome.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromHome.homeFeatureKey]: fromHome.reducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
