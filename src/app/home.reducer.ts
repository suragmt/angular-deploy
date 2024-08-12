import { createReducer, on } from '@ngrx/store';
// import { HomeActions } from './home.actions';

export const homeFeatureKey = 'home';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

