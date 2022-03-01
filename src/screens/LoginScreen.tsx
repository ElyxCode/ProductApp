import React, { useContext, useEffect } from 'react';
import { Text, TextInput, Platform, View, Keyboard, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn, removeError, errorMessage } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
      
        if(errorMessage.length === 0) return;
        
        Alert.alert('Login incorrecto', errorMessage, [{ 
            text: 'Ok', 
            onPress: removeError 
            }]
        );


    }, [errorMessage])
    

    const onLogin = () => {
        console.log({ email, password });
        Keyboard.dismiss();

        signIn({ correo: email, password });
    }

    return (
        <>
            <Background />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }>

                <View style={ loginStyles.formContainer }>

                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Login</Text>

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
                        onSubmitEditing={ onLogin }
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
                        onSubmitEditing={ onLogin }
                        
                    />

                    {/* Button Login */}
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.loginButton }
                            onPress={ onLogin }
                        >
                            <Text style={ loginStyles.buttonText }>Login</Text>

                        </TouchableOpacity>
                    </View>

                    {/* Sign up  */}
                    <View style={ loginStyles.newUserContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ () => navigation.replace('RegisterScreen')}
                        >
                            <Text style={ loginStyles.buttonText }>Sign Up</Text>

                        </TouchableOpacity>
                    </View>

                </View>

            </KeyboardAvoidingView>
            
        </>
    )
};
