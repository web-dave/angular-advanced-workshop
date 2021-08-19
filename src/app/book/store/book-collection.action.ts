import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const createBookStart = createAction('[Book] Create Book Start', props<{ book: Book }>());
export const countAction = createAction('[Book] count', props<{ i: number }>());
