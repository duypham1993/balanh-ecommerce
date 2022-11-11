import { createSelector } from "@reduxjs/toolkit";

export const selectCategories = state => state.category.categories;
export const selectObjectData = state => state.category.objectData;
export const selectisFetching = state => state.category.isFetching;
export const selectProducts = state => state.product.products;
export const selectOrigin = state => state.origin.origin;
export const selectSuppliers = state => state.supplier.suppliers;
export const selectStatusProductSubmit = state => state.product.statusSubmit;
export const selectStatusCategorySubmit = state => state.category.statusSubmit;
export const selectStatusSupplierSubmit = state => state.supplier.statusSubmit;
export const selectStatusOriginSubmit = state => state.origin.statusSubmit;

export const selectCategoriesWithoutRoot = createSelector(selectCategories, (categories) => {
  return categories.filter(item => item.parentId);
});

export const selectArrSuppliers = createSelector(selectSuppliers, (suppliers) => {
  return suppliers.map(item => item.name);
});

export const selectArrOrigin = createSelector(selectOrigin, (origin) => {
  return origin.map(item => item.name);
});