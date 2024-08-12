import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reducers';
import { StateT } from './user.reducer';

const selectUser = createFeatureSelector<StateT>('user')

export const selectuserlist = createSelector(selectUser, (state: StateT, props: {isAdmin: boolean})=> props.isAdmin? state.list: [...state.list, {name: 'sukee', address: 'manal'}])

