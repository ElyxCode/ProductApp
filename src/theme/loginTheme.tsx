import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50
    },
    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: '#FFF',
        fontWeight: 'bold'
    },
    inputField: {
        color: '#FFF',
        fontSize: 20,
    },
    inputFieldIOS: {
        borderBottomColor: '#FFF',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50    
    },
    loginButton: {
        borderWidth: 2,
        borderColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF'
    },
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 10 
    },
    buttonReturn: {
        position: 'absolute',
        top: 30,
        left: 20,
        borderWidth: 1,
        borderColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100
    }
});