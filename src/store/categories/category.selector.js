
export const selectCategoriesMap = (state) => state.categories.categories
    .reduce((accumilator, category) => {
      const { title, items } = category;
      accumilator[title.toLowerCase()] = items;
      return accumilator
    }, {});