import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { ProductsContext } from '../context/ProductsContext';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'>{}

export const ProductsScreen = ({ navigation }: Props) => {

    const { products, loadProducts } = useContext(ProductsContext);

    const [ isRefreshing, setIsRefreshing ] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ marginRight: 15 }}
                    onPress={() =>
                        navigation.navigate('ProductScreen', {}) // New product definition on productScreen
                    }
                >
                    <Text>Add</Text>
                </TouchableOpacity>
            )
        })
    }, [])
    

    // TODO: pull to refresh
    const loadProductsFromBackend = async() => {
        setIsRefreshing(true);
        await loadProducts();
        setIsRefreshing(false);
    }


    return (
        <View 
            style={{ 
                flex: 1, 
                marginTop: 10 
            }}
        >
            <FlatList
                data={ products }
                keyExtractor={ (product) => product._id }
                renderItem={({item}) => (
                    <TouchableOpacity 
                        activeOpacity={ 0.7 }
                        onPress={() => 
                            navigation.navigate('ProductScreen',{
                                id: item._id,
                                name: item.nombre    
                            })
                        }
                    >
                        <Text style={ styles.productName }>{ item.nombre }</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                    <View style={ styles.itemSeparator }></View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={ loadProductsFromBackend }
                    />
                }
                
            />
        </View>
    )
}

const styles = StyleSheet.create({
    productName: {
        fontSize: 20
    },
    itemSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        marginVertical: 5
    }
});