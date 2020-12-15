// import logo from './logo.svg';
import './App.css';
// import Rect from './Rect';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Memo from './memo/Memo';
import AddForm from './memo/AddForm';
import FindForm from './memo/FindForm';
import DelForm from './memo/DelForm';
import PersistForm from './memo/PersistForm';
import Sampledata from './fire/Sampledata';
import firebase from 'firebase';


  
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCl9J-bDCBjWT0a4qO7D0sYcUMQ06STcLM",
    authDomain: "react-1120.firebaseapp.com",
    databaseURL: "https://react-1120.firebaseio.com",
    projectId: "react-1120",
    storageBucket: "react-1120.appspot.com",
    messagingSenderId: "105019552308",
    appId: "1:105019552308:web:d030dd854f21bffd359061",
    measurementId: "G-9ZHPBS3CHQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
  



class App extends Component {

  td = {
    width:"250px"
  }

  constructor(props){
    super(props);
  }

  render(){
    
    return (
    <div>
      <h1>Memo</h1>
      <AddForm />
      <hr />
      <table><tbody><tr>
        <td style={this.td}><FindForm /></td>
        <td style={this.td}><DelForm /></td>
        <td style={this.td}><PersistForm /></td>
      </tr></tbody></table>
      <Memo />
      <hr />
      <Sampledata />
    </div>
    );
  }
}



export default connect()(App);
