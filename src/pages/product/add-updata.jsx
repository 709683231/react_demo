import React, { Component } from 'react';
import {
    Card,
    Form,
    Input,
    Icon,
} from 'antd';
import LinkButton from '../../components/link-button'


 class AddUpdataForm extends Component {
    render() {
        const title = (
            <span>
                <LinkButton >
                    <Icon type='arrow-left'></Icon>
                </LinkButton>
                <span>添加商品</span>
            </span>
        );
        const {getFieldDecorator} = this.props.form    
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
          }

        return (
            <Card title={title} labelAlign="left" layout='inline'>
                <Form  onSubmit={this.handleSubmit }>
                    <Form.Item label="商品名称" {...formItemLayout}>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>

                </Form>
            </Card>
        )
    }
}
 const AddUpdata = Form.create()(AddUpdataForm)
 export default AddUpdata
