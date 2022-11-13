import { createSelector } from "@reduxjs/toolkit";

export const selectData = (slice, data) => state => state[slice][data];
export const selectStatusSubmit = slice => state => state[slice].statusSubmit;
export const selectObjectData = state => state.category.objectData;

export const selectCategoriesWithoutRoot = createSelector(selectData("category", "categories"), (categories) => {
  return categories.filter(item => item.parentId);
});

export const selectArrSuppliers = createSelector(selectData("supplier", "suppliers"), (suppliers) => {
  return suppliers.map(item => item.name);
});

export const selectArrOrigin = createSelector(selectData("origin", "origin"), (origin) => {
  return origin.map(item => item.name);
});