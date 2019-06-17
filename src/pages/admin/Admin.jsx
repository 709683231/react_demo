import React,{Component} from 'react';
import memoryutil from '../../utils/memoryutil';
import {Redirect} from 'react-router-dom'



export default class Admin extends Component{
    
    render(){
        if(!memoryutil.user._id){
            return <Redirect to='/login'/>
        }
        console.log(memoryutil.user._id)
        const name = memoryutil.user.username
        return  <h2>123{name}</h2>       
    }
}