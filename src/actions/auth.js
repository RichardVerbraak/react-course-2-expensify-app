import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = (uid) => {
    return {
        type: 'LOGIN',
        uid        
    }
}

// Asynchronous function to sign in with a Google popup
// Using redux-thunk by returning an action
// Used in login button
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'  
    }
}

// Used in logout button
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}