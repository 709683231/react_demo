import React,{Component} from 'react';
import { Form, Icon, Input, Button} from 'antd';
import logo from './images/logo.png'

export default class Login extends Component{
    render(){
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo}></img>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section class='login-section'>
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>                  
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item>                       
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>                    
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        </Form.Item>
                    </Form>

                </section>
            </div>
        )
    }
}