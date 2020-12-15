import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCl9J-bDCBjWT0a4qO7D0sYcUMQ06STcLM",
    authDomain: "react-1120.firebaseapp.com",
    databaseURL: "https://react-1120.firebaseio.com",
    projectId: "react-1120",
    storageBucket: "react-1120.appspot.com",
    messagingSenderId: "105019552308",
    appId: "1:105019552308:web:59a5d82bb773dd9e359061",
    measurementId: "G-Y25QFCQWML"
};

var fireapp;

try {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
} catch(error){
    console.log(error.message);
}

//export default fireapp;


const initial = {
    message:"START",
    count:0
}

//reducer
function counterReducer (state = initial, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                message:'INCREMENT',
                count: state.count + 1
            };
        
        case 'DECREMENT':
            return {
                message:'DECREMENT',
                count: state.count - 1
            }
        
        case 'RESET':
            return {
                message:'RESET',
                count: initial.count
            }
        
        default:
            return state;
    }
}


export function initStore(state = initial) {
    return createStore(counterReducer, state, applyMiddleware(thunkMiddleware))
}