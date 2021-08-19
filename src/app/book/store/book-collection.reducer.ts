import { createReducer, on } from '@ngrx/store';
import { count } from 'rxjs/operators';
import { countAction, createBookStart } from './book-collection.action';
import { BookCollectionSlice } from './book-collection.slice';

const initialState: BookCollectionSlice = {
  entities: [],
  i: 0
};

export const bookCollectionReducer = createReducer(
  initialState,
  on(createBookStart, (state, { book }) => ({ ...state, entities: [...state.entities, book] })),
  on(countAction, (state, { i }) => ({ ...state, i: state.i + i }))
);
