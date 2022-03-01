import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

export const RegisterScreen = ({ navigation }:Props) => {

    const { signUp, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, name, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
      
        if(errorMessage.length === 0) return;
        
        Alert.alert('Registro incorrecto', errorMessage, [{ 
            text: 'Ok', 
            onPress: removeError 
            }]
        );
    }, [errorMessage]);

    const onRegister = () => {
        console.log({ email, password, name });
        Keyboard.dismiss();
        signUp({correo: email, password, nombre: name});
    }

    return (
        <>            
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#5856D6' }}
                behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }>

                <View style={ loginStyles.formContainer }>

                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Register</Text>

                    <Text style={ loginStyles.label }>Name:</Text>
                    <TextInput 
                        placeholder='Enter your name'
                        placeholderTextColor='rgba(255, 255,255, 0.4)'
                        underlineColorAndroid='#FFF'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='#FFF'
                        autoCapitalize='words'
                        autoCorrect={ false }
                        onChangeText={ (value) => onChange(value, 'name') }
                        value={ name }
                        onSubmitEditing={ onRegister }
                    />

                    <Text style={ loginStyles.label }>Email:</Text>
                    <TextInput 
                        placeholder='Enter your email'
                        placeholderTextColor='rgba(255, 255,255, 0.4)'
                        keyboardType='email-address'
                        underlineColorAndroid='#FFF'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='#FFF'
                        autoCapitalize='none'
                        autoCorrect={ false }
                        onChangeText={ (value) => onChange(value, 'email') }
                        value={ email }
                        onSubmitEditing={ onRegister }
                    />

                    <Text style={ loginStyles.label }>Password:</Text>
                    <TextInput 
                        placeholder='*******'
                        secureTextEntry={ true }
                        placeholderTextColor='rgba(255, 255,255, 0.4)'
                        underlineColorAndroid='#FFF'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='#FFF'
                        autoCapitalize='none'
                        autoCorrect={ false }
                        onChangeText={ (value) => onChange(value, 'password') }
                        value={ password }
                        onSubmitEditing={ onRegister }
                        
                    />

                    {/* Button Login */}
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.loginButton }
                            onPress={ onRegister }
                        >
                            <Text style={ loginStyles.buttonText }>Create account</Text>

                        </TouchableOpacity>
                    </View>

                    {/* Login */}
                    
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        onPress={ () => navigation.replace('LoginScreen')}
                        style={ loginStyles.buttonReturn }
                    >
                        <Text style={ loginStyles.buttonText }>Login</Text>

                    </TouchableOpacity>
                    

                </View>

            </KeyboardAvoidingView>
        </>
    )
}
