import React, { createContext, useEffect, useReducer } from 'react';
import { User, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './AuthReducer';
import cafeApi from '../api/cafeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    errorMessage: '',
    user: null
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        
        // No token, no autheticated
        if(!token) return dispatch({ type: 'notAuthenticated' });

        // Token
        const resp = await cafeApi.get('/auth');

        if(resp.status !== 200) return dispatch({ type: 'notAuthenticated' })

        // Save new token
        await AsyncStorage.setItem('token', resp.data.token);

        dispatch({ 
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        })           
    }
    
    
    const signIn = async({ correo, password }: LoginData ) => {
        
        try {
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password })
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            // Save token
            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {

            console.log(error.response.data.msg);
            
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'incorrect information'
            });
        }
    };
    
    const signUp = async({ correo, password, nombre }: RegisterData ) => {
        
        try {
            const { data } = await cafeApi.post<LoginResponse>('/usuarios', { correo, password, nombre });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            // Save token
            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {

            //console.log(error.response.data);

            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Revise la información'
            });
        }
    };
   
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logOut' })
    };
    
    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    };

    return (
        <AuthContext.Provider 
            value={{
                ...state,
                signUp,
                signIn,
                logOut,
                removeError
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}