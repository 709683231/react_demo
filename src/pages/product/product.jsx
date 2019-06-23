import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Home from './home';
import Detail from './detail';
import AddUpData from './add-updata';
import './product.less';


export default class product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/product' component={Home}/>
        <Route path='/product/detail' component={Detail}/>
        <Route path='/product/addupdata' component={AddUpData}/>
        <Redirect to='/product'/>
      </Switch>
    )
  }
}

