import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select ,Input} from 'antd';


class AddForm extends Component {
    PropTypes = {
        Categorys: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }
    componentWillMount() {
        this.props.setForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { parentId, Categorys } = this.props;
        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: parentId,
                            rules: [
                                { required: true, message: '分类名称必须指定' }
                            ]
                        })(
                            <Select>
                                <Select.Option value='0'>一级分类</Select.Option>
                                {
                                    Categorys.map((c, index) => 
                                        <Select.Option value={c._id} key={index} >{c.name}</Select.Option>
                                    )
                                }
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '分类名称必须指定' }
                            ]
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Form.Item>
            </Form>

        )
    }
}
export default Form.create()(AddForm)
