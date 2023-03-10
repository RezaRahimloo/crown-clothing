import './shop.styles.scss'
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategories } from '../../store/categories/category.action';
import { useDispatch } from 'react-redux';

const Shop = () =>{
    const dispatch = useDispatch();
    useEffect(() => {
        const getCategories =  () => {
            const categories =  getCategoriesAndDocuments();
            dispatch(setCategories(categories));
        }
        getCategories();
    }, [dispatch]);
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
        </Routes> 
    )
}

export default Shop;