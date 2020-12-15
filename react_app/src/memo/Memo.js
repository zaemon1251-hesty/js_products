import React, { Component } from 'react';
import { connect } from 'react-redux';

import Item from './Item';


class Memo extends Component {

    th = {
        fontSize:"14pt",
        backgroundColor:"white",
        color:"#cac6c6",
        padding:"5px 10px",
        border:"1px solid lightblue",
        width:"50px",
        marginRight:"0px"
    }
    td = {
        fontSize:"14pt",
        backgroundColor:"white",
        color:"#cac6c6",
        padding:"5px 10px",
        border:"1px solid lightblue",
        minWidth:"300px",
    }
    date = {
        fontSize:"14pt",
        backgroundColor:"white",
        color:"#cac6c6",
        padding:"5px 10px",
        border:"1px solid lightblue",
        width:"80px",
    }

    render(){
        let data;
        let n = 0;
        switch (this.props.mode){
            case 'default':
            data = this.props.data.map((value)=>(
                <Item key={value.message} value={value} index={n++} />
            ));
            break;

            case 'find':
            data = this.props.fdata.map((value)=>(
                <Item key={value.message} value={value} index={n++} />
            ));
            break;

            case 'delete':
            data = this.props.data.map((value)=>(
                <Item key={value.message} value={value} index={n++} />
            ));
            break;

            default:
            data = this.props.data.map((value)=>(
                <Item key={value.message} value={value} index={n++} />
            ));
        }
        return (
            <table>
              <thead><tr>
                <th style={this.th}>Order</th>
                <th style={this.td}>Message</th>
                <th style={this.date}>Created</th>
              </tr></thead>
              <tbody>{data}</tbody>
            </table>
        );
    }
}


export default connect((state)=>state)(Memo);