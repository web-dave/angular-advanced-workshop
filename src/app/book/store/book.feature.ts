import { createFeatureSelector } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';

export const bookFeatureName = 'bookFeature';

export const bookFeatureSelector = createFeatureSelector<{ bookCollection: BookCollectionSlice }>(bookFeatureName);
