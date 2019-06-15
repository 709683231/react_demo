import React,{Component} from 'react';
import {Switch,BrowserRouter,Route} from 'react-router-dom';
import {Login} from './pages/login/Login'
import {Admin} from './pages/admin/Admin'


export default class App extends Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Login}/>
                    <Route path='/admin' component={Admin}/>
                </Switch>
            </BrowserRouter>
        )
    }
}