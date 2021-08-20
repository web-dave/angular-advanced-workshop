import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const routerSelector = createFeatureSelector<RouterReducerState>('router');
export const { selectRouteParam } = getSelectors(routerSelector);
