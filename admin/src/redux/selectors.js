import { createSelector } from "@reduxjs/toolkit";

const selectcCategories = state => state.category.categories;

const selectSuppliers = state => state.supplier.suppliers;

const selectOrigin = state => state.origin.origin;

export const selectCategoriesWithoutRoot = createSelector(selectcCategories, (categories) => {
  return categories.filter(item => item.parentId);
});

export const selectArrSuppliers = createSelector(selectSuppliers, (suppliers) => {
  return suppliers.map(item => item.name);
});

export const selectArrOrigin = createSelector(selectOrigin, (origin) => {
  return origin.map(item => item.name);
});