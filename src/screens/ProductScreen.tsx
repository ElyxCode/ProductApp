import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, ScrollView, Button } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ navigation, route }: Props) => {

    const { id, name = '' } = route.params;

    const { categories, isLoading } = useCategories();

    const [selectedLanguage, setSelectedLanguage] = useState();
    
    // Change title name with product 
    useEffect(() => {
        navigation.setOptions({
            headerTitle: (name) ? name : 'New product'
        })
    }, [])

    return (
        <View style={ styles.container }>

            <ScrollView>
                <Text style={ styles.label }>Product Name:</Text>
                <TextInput 
                    placeholder='Product'
                    style={ styles.textInput }
                />

                {/* picker / selector */}
                <Text style={ styles.label }>Category:</Text>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
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