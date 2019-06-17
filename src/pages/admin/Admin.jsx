import React,{Component} from 'react';
import memoryutil from '../../utils/memoryutil';
import {Redirect,Switch,Route} from 'react-router-dom'
import { Layout } from 'antd';


import LeftNav from '../../components/leftNav';
import AdminHeader from '../../components/adminHeader';

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const { Header, Footer, Sider, Content } = Layout;


export default class Admin extends Component{
    
    render(){
        if(!memoryutil.user._id){
            return <Redirect to='/login'/>
        }

        return  (         
                <Layout style={{height:'100%'}}>
                    <Sider>
                        <LeftNav/>
                    </Sider>
                    <Layout >                      
                        <AdminHeader/>                       
                        <Content >
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/category' component={Category} />
                                <Route path='/product' component={Product} />
                                <Route path='/role' component={Role} />
                                <Route path='/user' component={User} />
                                <Route path='/charts/bar' component={Bar} />
                                <Route path='/charts/line' component={Line} />
                                <Route path='/charts/pie' component={Pie} />
                                <Redirect to='/home' />
                            </Switch>                           
                        </Content>
                        <Footer style={{textAlign:"center", color:'#aaaaaa'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                    </Layout>
                </Layout>
         
        )      
    }
}