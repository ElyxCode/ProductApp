import React, { createContext, useEffect, useState } from 'react';

import { ImagePickerResponse } from 'react-native-image-picker';

import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
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
    const uploadImage =  async( data: ImagePickerResponse, id: string ) => {


        const fileToUpload = {
            uri: data.assets?.[0].uri,
            type: data.assets?.[0].type,
            name: data.assets?.[0].fileName
        }

        console.log({ fileToUpload });

        const formData = new FormData();
        formData.append('archivo', fileToUpload);


        try {
            // const resp = await cafeApi.put(`/uploads/productos/${id}`, formData);
            const resp = await fetch(`https://cafe-back-rn.herokuapp.com/api/uploads/productos/${id}`,{
                method: 'PUT',
                body: formData
            })
            console.log(resp);

        } catch (error: any) {
            console.log(error.response.data)
        }
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