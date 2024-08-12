import { State, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

export const userFeatureKey = 'user';

export interface StateT {
list: Item[]
}

export interface Item{
  name: string,
address: string
}
export const initialState: StateT = {list: []};

export const reducer = createReducer(
  initialState,
  on(UserActions.userUsersSuccess, (state, props)=> {
console.log(props, "props")
    return {list: [{name:'surag', address: 'manal'}]}}
  )
);

