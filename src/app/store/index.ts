import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { LoaderReducer } from '../shared/store/reducers/loader.reducers';
import { APP_LOADER_STATE_NAME } from '../shared/store/selectors/loader.selectors';
import { LoaderState } from '../shared/store/states/loader.states';


export interface AppState {
  [APP_LOADER_STATE_NAME]: LoaderState,
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  [APP_LOADER_STATE_NAME]: LoaderReducer,
  router: routerReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
