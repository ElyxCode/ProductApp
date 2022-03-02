import { useEffect, useState } from 'react';

import cafeApi from "../api/cafeApi";
import { CategoriesResponse, Categoria } from '../interfaces/appInterfaces';

export const useCategories = () => {

    const [isLoading, setIsloading] = useState(true);
    const [categories, setCategories] = useState<Categoria[]>([]);

    useEffect(() => {
        getCategories();
    }, [])
    
    const getCategories = async() => {
        const resp = await cafeApi.get<CategoriesResponse>('/categorias');
        setCategories(resp.data.categorias);
        setIsloading(false);
    }

    return {
        isLoading,
        categories
    }
}