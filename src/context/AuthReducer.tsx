import { User } from "../interfaces/appInterfaces";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: User | null;
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: User } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logOut' }

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {
    
    switch (action.type) {
        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }
            
        case 'addError':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload,
                user: null,
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }
        
        case 'logOut': // Same function than notAuthenticated
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,                
                user: null
            }
        
        // case 'logOut':
        //     return {
        //         ...state,
        //         status: 'not-authenticated',
        //         token: null,
        //         user: null
        //     }

        default:
            return state;
    }
}