import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "changeme",
    authDomain: "changeme",
    databaseURL: "changeme",
    projectId: "changeme",
    storageBucket: "changeme",
    messagingSenderId: "changeme",
    appId: "changeme",
    measurementId: "changeme"
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
