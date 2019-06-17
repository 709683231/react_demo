import React, { Component } from 'react';
import { Form, Icon, Input, Button,message } from 'antd';
import logo from './images/logo.png';
import {reqLogin} from '../../api';
import './Login.less';
import {Redirect} from 'react-router-dom'
import memoryUtil from '../../utils/memoryutil'

class Login extends Component {
    handlerPassword = (rule, value, callback)=>{
        value = value.trim()
        if(!value){
            callback('必须输入')
        }else if(value.length<4){
            callback('密码不能小于4位')
        }else if(value.length>12){
            callback('密码不能大于12位')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('输入含有非法字符')
        }else{
            callback()
        }

    }
    handleSubmit = (e) => {
        e.preventDefault();        
        this.props.form.validateFields( async (err,values)=>{           
            if(!err){
                const {username,password} = values;
                const result = await reqLogin(username,password)          
                //跳转到admin
                if(result.status === 0){ 
                    const user = result.data;  
                    memoryUtil.user = user;
                    localStorage.setItem('KEY_NAME',JSON.stringify(user))                      
                    this.props.history.replace('/')
                } else {
                    message.error(result.msg,2)
                }

            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        if(memoryUtil.user._id){
            console.log(memoryUtil.user._id)
            return <Redirect to='/'/>
        }
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo'></img>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className='login-section'>
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true,whitespace:true, message: '请输入用户名称' },
                                        {min:4,message:'账号需要大于四位'},
                                        {max:12,message:'账号不能超过十二位'},
                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'含有非法词汇'}
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="账号"
                                />
                            )}

                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ validator:this.handlerPassword}]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                提 交
                        </Button>
                        </Form.Item>
                    </Form>

                </section>
            </div>
        )
    }
}
const LoginNew = Form.create()(Login);

export default LoginNew