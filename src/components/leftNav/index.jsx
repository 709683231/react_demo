import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom'

import './index.less';
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png';


const { SubMenu,Item } = Menu;

class LeftNav extends Component {

    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                )
            } else {
                const cItem = item.children.find((cItem,index) => path.indexOf(cItem.key)===0)
                if(cItem){
                    this.openKey = item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}

                    </SubMenu>
                )
            }
        })
    }

    getMenuNodes2 = (menuList)=>{
        const path = this.props.location.pathname;
        return menuList.reduce((pre,item) => {
            if(!item.children){
                pre.push(
                    <Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                )
            } else {
                const cItem = item.children.find((cItem,index) => path.indexOf(cItem.key)===0)
                if(cItem){
                    this.openKey = item.key
                }
                
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}

                    </SubMenu>
                )
            }
            return pre 
        },[])
    }

    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        const openKey = this.openKey;
        let selectedKeys = this.props.location.pathname
        if(selectedKeys.indexOf('/product')===0){
            selectedKeys = '/product'
        }
        return (
            <div className='leftNav'>
                <Link className="left-nav-header" to='home'>
                    <img src={logo} alt='atguigu'></img>
                    <h1>硅谷后台</h1>
                </Link>
                <div >
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultOpenKeys={[openKey]}
                        selectedKeys={[selectedKeys]}
                    >
                        {this.menuNodes}

                        {/* <Menu.Item key="/home">
                            <Link to='home'>
                                <Icon type="home" />
                                <span>shouye</span>
                            </Link>                        
                        </Menu.Item>

                    

                        <SubMenu
                            key="/products"
                            title={
                            <span>
                                <Icon type="mail" />
                                <span>shangping</span>
                            </span>
                            }
                        >   
                            <Menu.Item key="/home">
                                <Link to='home'>
                                    <Icon type="home" />
                                    <span>shouye</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="/home">
                                <Link to='home'>
                                    <Icon type="home" />
                                    <span>shouye</span>
                                </Link>
                            </Menu.Item>

                                               
                            
                        </SubMenu> */}


                    </Menu>
                </div>
            </div>

        )
    }
}
export default withRouter(LeftNav)
