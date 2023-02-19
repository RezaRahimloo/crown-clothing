import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
  return state.categories;
}

export const selectcategories = createSelector(
  [selectCategoryReducer], // if what this returns the method bellow gets run
  (categoriesSlice) =>{ 
    return categoriesSlice.categories 
  }
);
export const selectCategoriesMap = createSelector(
  [selectcategories],
  (categories) =>{
   return categories.reduce((accumilator, category) => {
    const { title, items } = category;
    accumilator[title.toLowerCase()] = items;
    return accumilator
  }, {})}
)

// export const selectCategoriesMap = (state) => 
//     {
//       console.log("selector fired");
//       return  state.categories.categories
//       .reduce((accumilator, category) => {
//         const { title, items } = category;
//         accumilator[title.toLowerCase()] = items;
//         return accumilator
//       }, {});
//     }