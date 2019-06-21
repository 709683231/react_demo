import React, { Component } from 'react';
import { reqSubmit ,reqCategorys } from '../../api'
import PicturesWall from './pictures-wall';
import {
    Card,
    Form,
    Input,
    Icon,
    Cascader,
    Button,
} from 'antd';
import LinkButton from '../../components/link-button'


class AddUpdata extends Component {
    state = {
        options:[]//级联列表的数据
    }
    validatePrice = (rule,value,callback)=>{
        if(value<0){
            callback('价格不能小于0')
        }else{
            callback()
        }
    }
    submit = async () => {
        this.props.form.validateFields((err,value)=>{
            if(!err){
               console.log(value)
            }
        })
        // const result = await reqSubmit()
        // result = {}
    }

    loadData =  async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        const pCategoryId = targetOption.value;
        const result = await this.getCategorys(pCategoryId)
        targetOption.loading = false;
        console.log('loadData',result)
        if(!result && result.length===0){
            selectedOptions[0].isLeaf = true
        }else{
            targetOption.children = result.map((item)=>({
                label:item.name,
                value:item._id,
                isLeaf:true
            }))
        }
        this.setState({
            options:[...this.state.options]
        })
    }

    initOptions = (Categorys)=>{
        const options = Categorys.map((item)=>({
            label:item.name,
            value:item._id,
            isLeaf:false
        }))
        this.setState({
            options
        })
    }
    getCategorys= async (parentId)=>{
        const result = await reqCategorys(parentId);
        if(result.status===0){
            const Categorys = result.data;
            if(parentId==='0'){
                this.initOptions(Categorys)
            }else{
                return Categorys
            }
        }
    }
    componentDidMount(){
        this.getCategorys('0')
    }
    render() {
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left'></Icon>
                </LinkButton>
                <span>添加商品</span>
            </span>
        );
        const { getFieldDecorator } = this.props.form
        const { TextArea } = Input
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        }

        return (
            <Card title={title} >
                <Form {...formItemLayout}>
                    <Form.Item label="商品名称" >
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '商品名称必须输入', }
                            ]
                        })(
                            <Input placeholder='请输入商品名称' /> 
                        )
                        }
                    </Form.Item>

                    <Form.Item label="商品描述" >
                        {getFieldDecorator('desc', {
                            rules: [
                                { required: true, message: '商品描述必须输入'}
                            ]
                        })(<TextArea autosize placeholder='请输入商品描述' />)}
                    </Form.Item>

                    <Form.Item label="商品价格" >
                        {getFieldDecorator('price', {
                            rules: [
                                {required: true, message: '请输入商品价格'},
                                {validator: this.validatePrice}
                            ],
                        })(<Input type='number' addonAfter="元" placeholder='请输入商品价格' />)}
                    </Form.Item>

                    <Form.Item label="商品分类" >
                        {getFieldDecorator('categoryIds', {
                            rules: [
                                { required: true,message: '商品分类必须指定'}
                            ]
                        })(
                            <Cascader  options={this.state.options} loadData={this.loadData} placeholder='请指定商品分类' />
                        )}
                    </Form.Item>

                    <Form.Item label="商品图片" >
                        <PicturesWall />
                    </Form.Item>

                    <Button onClick={this.submit}>提交</Button>

                </Form>
            </Card>
        )
    }
}
export default Form.create()(AddUpdata)

