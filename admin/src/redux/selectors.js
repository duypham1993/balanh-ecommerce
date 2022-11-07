import { createSelector } from "@reduxjs/toolkit";

export const selectCategories = state => state.category.categories;
export const selectObjectData = state => state.category.objectData;
export const selectStatusSubmit = state => state.category.statusSubmit;
export const selectisFetching = state => state.category.isFetching;
export const selectProducts = state => state.product.products;
export const selectOrigin = state => state.origin.origin;

export const selectCategoriesWithoutRoot = createSelector(selectCategories, (categories) => {
  return categories.filter(item => item.parentId);
});