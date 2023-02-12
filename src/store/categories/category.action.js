import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

export const setCategories = (categories) => {
    console.log(categories)
    return createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categories);
}
    