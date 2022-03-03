import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, ScrollView, Button, Image } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ navigation, route }: Props) => {

    const { id = '', name = '' } = route.params;

    const { categories, isLoading } = useCategories();

    const { loadProductById }  = useContext(ProductsContext);

    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    });

    
    // Change title name with product 
    useEffect(() => {
        navigation.setOptions({
            headerTitle: (name) ? name : 'New product'
        });

    }, []);

    useEffect(() => {
        loadProduct();
    }, [])
    

    const loadProduct = async() => {
        if(id.length === 0) return;
        const product = await loadProductById(id);
        setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            img: product.img || '',
            nombre
        });

    }

    return (
        <View style={ styles.container }>

            <ScrollView>
                <Text style={ styles.label }>Product Name:</Text>
                <TextInput 
                    placeholder='Product'
                    style={ styles.textInput }
                    value={ nombre }
                    onChangeText={ (value) => onChange(value, 'nombre')}
                />

                {/* picker / selector */}
                <Text style={ styles.label }>Category:</Text>
                <Picker
                    selectedValue={categoriaId}
                    onValueChange={(value) =>
                        onChange(value, 'categoriaId')
                    }
                >
                    {
                        categories.map((category) => (
                            <Picker.Item 
                                label={ category.nombre} 
                                value={ category._id }
                                key={ category._id } 
                            />
                        ))
                    }
                </Picker>
                
                <Button
                    title='Save'
                    onPress={() =>{}}
                    color='#5856D6'
                />
                
                <View 
                    style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'center',
                        marginTop: 10 
                    }}
                >
                    <Button
                        title='Camera'
                        onPress={() =>{}}
                        color='#5856D6'
                    />

                    <View style={{ width: 10 }} />

                    <Button
                        title='Gallery'
                        onPress={() =>{}}
                        color='#5856D6'
                    />
                </View>

                {/* <Text>
                    { JSON.stringify( form, null, 5 ) }
                </Text> */}

                {
                    (img.length > 0) && (
                    <Image
                        source={{ uri: img }}
                        style={{
                            marginTop: 20,
                            width: '100%',
                            height: 300
                        }}
                    />
                    )
                }

                {/* TODO: Show temporal image */}
                

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20
    },
    label: {
        fontSize: 18
    },
    textInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 45,
        marginTop: 5,
        marginBottom: 15
    }
});