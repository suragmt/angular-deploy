import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Item, StateT as UserState} from './user.reducer'
export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'User Users': emptyProps(),
    'User Users Success': props<{ data: Item[] }>(),
    'User Users Failure': props<{ error: unknown }>(),
    'User Users Fetch': props<{ data: Item[] }>(),

  }
});
