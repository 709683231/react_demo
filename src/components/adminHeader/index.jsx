import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import {reqWeather} from '../../api/index';
import {formateDate} from '../../utils/dataUtils';
import memoryutil from '../../utils/memoryutil';
import menuList from '../../config/menuConfig';
import LinkButton from '../link-button'

import './index.less';
import { Modal } from 'antd';
import { removeMemory } from '../../utils/memoryTool';
import memoryUtils from '../../utils/memoryutil';

 class AdminHeader extends Component {
    state = {
        currentTime : formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }
    getWeather = async () => {
       const {dayPictureUrl,weather} = await reqWeather('北京');
       this.setState({
        dayPictureUrl,weather
       })
    }
    showCurrentTime = () => {
        this.interId = setInterval(()=>{
           const currentTime = formateDate(Date.now());
           this.setState({
            currentTime
           })
        },1000)
    }
    getTitle = () => {
        const path = this.props.location.pathname;
        let title ='';
        menuList.forEach( item => {
            if(item.key === path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find( cItem => path.indexOf(cItem.key)===0 );
                if(cItem){
                    title = cItem.title
                }
            }
            
        })
        return title
    }
    logout = () =>{
        Modal.confirm({
            title:'你确定要退出吗？',
            onOk : ()=>{
                removeMemory('KEY_NAME');
                memoryUtils.user = {}
                this.props.history.replace('/login')
            }
        })
    }

    componentDidMount(){
        this.getWeather();
        this.showCurrentTime()
    }
    componentWillUnmount(){
        clearInterval(this.interId)
    }

    render() {
        const {currentTime,dayPictureUrl,weather} = this.state ;
        const {user} = memoryutil;
        const title = this.getTitle();

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎  {user.username}</span>
                    <LinkButton  onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        {!!dayPictureUrl && <img src={dayPictureUrl} alt="weather"/>}
                        <span className='header-bottom-right-span'>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AdminHeader)
