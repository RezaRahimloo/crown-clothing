import { createContext, useState, useEffect } from "react";

import SHOP_DATA from "../shop-data";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});


export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    useEffect(() => {
        const getCategories = async () => {
            const cats = await getCategoriesAndDocuments();
            console.log(cats);
            setCategoriesMap(cats);
        }
        getCategories();
    }, []);

    const value = {categoriesMap}
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}