import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'

import './index.less';
import logo from '../../assets/images/logo.png';
const { SubMenu }  = Menu;

export default class LeftNav extends Component {
    render() {
        return (
            <div className='leftNav'>
                <Link className="left-nav-header" to='home'>
                    <img src={logo} alt='atguigu'></img>
                    <h1>硅谷后台</h1>  
                </Link>                             
                <div >
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        >

                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>

                    

                        <SubMenu
                            key="sub1"
                            title={
                            <span>
                                <Icon type="mail" />
                                <span>Navigation One</span>
                            </span>
                            }
                        >
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>

                   
                    </Menu>
                </div>
            </div>
           
        )
    }
}
