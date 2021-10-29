import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { AppConst } from "src/app/helpers/app-contant";
import { PageEffects } from "./page.effects";
import { PageReducers } from "./page.reducers";
import { PageState } from "./page.states";

export const getPagesState = createFeatureSelector<MainState>(AppConst.PAGE_FEATURE_SELECTOR);

export interface MainState {
  pageState: PageState,
}

export const pagesReducers: ActionReducerMap<MainState> = {
  pageState: PageReducers
}

export const PagesEffects: any[] = [
  PageEffects,
]