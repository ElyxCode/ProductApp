import React, { createContext, useEffect } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import { useState } from 'react';
import cafeApi from '../api/cafeApi';

type ProductsContextsProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: ( categoryId: string, productName: string ) => Promise<Producto>;
    updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>;
    deleteProduct: ( id: string ) => Promise<void>;
    loadProductById: ( id: string ) => Promise<Producto>;
    uploadImage: ( data: any, id: string ) => Promise<void>; // TODO: change any 
}

export const ProductsContext = createContext({} as ProductsContextsProps);

export const ProductProvider = ({ children }: any) => {

    const [ products, setProducts ] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, [])
    

    const loadProducts =  async() => {

        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
        // setProducts([...products, ...resp.data.productos]);
        setProducts([...resp.data.productos]);

    }

    const addProduct =  async( categoryId: string, productName: string ): Promise<Producto> => {
        const resp = await cafeApi.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId
        });

        setProducts([...products, resp.data]);

        return resp.data;

    }

    const updateProduct =  async( categoryId: string, productName: string, productId: string ) => {
        const resp = await cafeApi.put(`/productos/${productId}`, {
            nombre: productName,
            categoria: categoryId
        });

        setProducts(products.map(prod => {
            return (prod._id === productId) ? resp.data : prod;
        }));
    }

    const deleteProduct =  async( id: string ) => {
        
    }

    const loadProductById =  async( id: string ):Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`/productos/${id}`);
        return resp.data;
    }

    // TODO: change any 
    const uploadImage =  async( data: any, id: string ) => {

    }

    return(
        <ProductsContext.Provider
            value={{
                products,
                loadProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                loadProductById,
                uploadImage,
            }}
        >
            { children }
        </ProductsContext.Provider>
    )
}