import { createSelector } from '@ngrx/store';
import { bookAdapter } from './book-collection.reducer';
import { bookFeatureSelector } from './book.feature';

const bookCollectionSelector = createSelector(bookFeatureSelector, state => state?.bookCollection);
export const { selectAll, selectEntities } = bookAdapter.getSelectors(bookCollectionSelector);
export const booksSelector = selectAll;
export const bookSelector = (isbn: string) => createSelector(selectEntities, entities => entities[isbn]);
