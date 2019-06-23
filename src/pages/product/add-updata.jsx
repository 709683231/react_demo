import React, { Component } from 'react';
import { reqAddAndUpdateProduct ,reqCategorys } from '../../api'
import PicturesWall from './pictures-wall';
import {
    Card,
    Form,
    Input,
    Icon,
    Cascader,
    Button,
    message,
} from 'antd';
import LinkButton from '../../components/link-button'


class AddUpdata extends Component {
    constructor(props){
        super(props)
        this.pwRef = React.createRef();
       
    }
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
        this.props.form.validateFields( async (err,value)=>{
            if(!err){
                const {name,desc,price,categoryIds} = value;
                let categoryId ,pCategoryId;
                if(categoryIds.length===1){
                    pCategoryId = '0';
                    categoryId = categoryIds[0];
                }else{
                    pCategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }
               const imgs = this.pwRef.current.getImgs();
               
               const product = {
                   name,
                   desc,
                   price,
                   categoryId,
                   pCategoryId,
                   imgs,
                   

               }
               if(this.isUpdate){
                product._id = this.product._id
               }
               const result = await reqAddAndUpdateProduct(product);
               if(result.status===0){
                message.success((this.isUpdate?'更新':'添加') + '商品添加成功')
                this.props.history.goBack()
               }
            }
        })
    }

    loadData =  async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        const pCategoryId = targetOption.value;
        const result = await this.getCategorys(pCategoryId)
        targetOption.loading = false;
        console.log('loadData',result)
        if(!result || result.length===0){
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

    initOptions =async (Categorys)=>{
        const options = Categorys.map((item)=>({
            label:item.name,
            value:item._id,
            isLeaf:false
        }))

        const {product,isUpdate} = this
        if(isUpdate && product.pCategoryId!=='0'){
            const result = await this.getCategorys(product.pCategoryId)
            if(result && result.length>0){
                const targetOption = options.find(option => option.value===product.pCategoryId)
                targetOption.children = result.map( c => ({
                    label:c.name,
                    value:c._id,
                    isLeaf:true
                }))
            }
        }
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
    componentWillMount(){
        this.product = this.props.location.state || {};
        this.isUpdate = !!this.product._id
    }
    componentDidMount(){
        this.getCategorys('0')
    }
    render() {
        const {product,isUpdate} = this;
        if(product._id){
            if(product.pCategoryId==='0'){
                product.categoryIds = [product.categoryId]
            }else{
                product.categoryIds = [product.pCategoryId,product.categoryId]
            }
        }else{
            product.categoryIds = []
        }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left'></Icon>
                </LinkButton>
                <span>{isUpdate?'更新商品':'添加商品'}添加商品</span>
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
                            initialValue: product.name,
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
                            initialValue: product.desc,
                            rules: [
                                { required: true, message: '商品描述必须输入'}
                            ]
                        })(<TextArea autosize placeholder='请输入商品描述' />)}
                    </Form.Item>

                    <Form.Item label="商品价格" >
                        {getFieldDecorator('price', {
                            initialValue: product.price,
                            rules: [
                                {required: true, message: '请输入商品价格'},
                                {validator: this.validatePrice}
                            ],
                        })(<Input type='number' addonAfter="元" placeholder='请输入商品价格' />)}
                    </Form.Item>

                    <Form.Item label="商品分类" >
                        {getFieldDecorator('categoryIds', {
                            initialValue: product.categoryIds,
                            rules: [
                                { required: true,message: '商品分类必须指定'}
                            ]
                        })(
                            <Cascader  options={this.state.options} loadData={this.loadData} placeholder='请指定商品分类' />
                        )}
                    </Form.Item>

                    <Form.Item label="商品图片" >
                        <PicturesWall ref={this.pwRef} imgs={product.imgs}/>
                    </Form.Item>

                    <Button onClick={this.submit}>提交</Button>

                </Form>
            </Card>
        )
    }
}
export default Form.create()(AddUpdata)

