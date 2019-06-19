import React, { Component } from 'react';
import { Card, Icon, Table ,Button,Modal, message} from 'antd';
import LinkButton from '../../components/link-button';
import {reqCategorys,reqUpdateCategory,reqAddCategory} from '../../api';
import UpdateForm from './upDateForm';
import AddForm from './addForm';

/* 
Admin的分类管理子路由
*/

export default class Category extends Component {
  state = {
    parentId:'0',// 当前分类列表的parentId
    Categorys:[],// 一级分类数组
    subCategorys:[],// 二级分类数组
    parentName:'',// 当前分类列表的父分类名称
    loading:false,//是否显示loading界面
    showStatus:0,// 0: 都不显示, 1: 修改, 2: 添加
  }
  //初始化数据
  initColumns = () => {
    this.columns = [{
      title: '分类的名称',
      dataIndex: 'name',
    }, {
      title: '操作',
      width: 300,
      render: (category) =>{
        return (
          <span>
            <LinkButton onClick={()=>this.showUpDate(category)}>修改分类</LinkButton>
            {
              this.state.parentId==='0' && <LinkButton onClick={()=>this.showSubCategorys(category)}>查看子分类</LinkButton>
            }
          </span>
        )
      }
    }]
  }
  //查看子分类
  showSubCategorys = (category) =>{
    this.setState({
      parentId:category._id,
      parentName:category.name
    },()=>{
      this.getCategorys()
    })
  }
 // 展示修改分类
  showUpDate = (category)=>{
    this.category = category;
    this.setState({
      showStatus:1
    })
  }
  //获取数据
  getCategorys = async (pId)=>{
    this.setState({loading:true})
    const parentId = pId || this.state.parentId ;
    const result = await reqCategorys(parentId);
    this.setState({loading:false})
    if(result.status === 0){
      const Categorys = result.data;
      if(parentId==='0'){
        this.setState({
          Categorys
        })
      }else{
        this.setState({
          subCategorys:Categorys
        })
      }
    }
  }
  //更新数据
  updateCategory = () =>{
    this.form.validateFields( async (err,values)=>{
      if(!err){
        this.setState({
          showStatus:0
        })        
      }
      const categoryName = this.form.getFieldValue('categoryName')
      this.form.resetFields()
      const categoryId = this.category._id
      const result = await reqUpdateCategory(categoryId,categoryName)
      if(result.status === 0){
        message.success('更新分类成功')
        this.getCategorys()
      }
    })
  }
  //添加数据
  addCategory =  ()=>{
    this.form.validateFields(async(err,values)=>{
      if(!err){
        this.setState({
          showStatus:0
        })
        const {categoryName,parentId} = this.form.getFieldsValue()
        this.form.resetFields()
        const result = await reqAddCategory(parentId,categoryName)
        if(result.status === 0){
          message.success('添加分类成功')
          if(parentId==='0'){
            this.getCategorys('0')
          }else if(parentId === this.state.parentId) {
            this.getCategorys()
          }
        }
      }

    })

  }
   //返回第一级菜单
  showCategorys = () => {
    this.setState({
      parentId:'0',
      parentName:'',
      subCategorys:[],
    })
  }
  componentWillMount() {
    this.initColumns();
  }
  componentDidMount(){
    this.getCategorys()
  }

  render() {
    const {parentId,parentName,Categorys,subCategorys,loading,showStatus} = this.state;
    const category = this.category || {};
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type="arrow-right"></Icon>
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type="primary" onClick={()=>this.setState({showStatus:2})}>
        <Icon type="plus"/>
        添加
      </Button>
    )

    return (
      <Card title={title} extra={extra} >
        <Table
          columns={this.columns}
          dataSource={parentId === '0'? Categorys:subCategorys}
          bordered
          rowKey='_id'
          pagination={{defaultPageSize:5,showQuickJumper:true}}
          loading={loading}
        />
        <Modal
          title="更新分类"
          visible={showStatus === 1}
          onOk={this.updateCategory}
          onCancel={()=>{
            this.form.resetFields();
            this.setState({
              showStatus:0
            })
          }}
        >
           <UpdateForm categoryName={category.name} setForm={(form) => this.form = form}/>
        </Modal>
        <Modal
          title="添加分类"
          visible={showStatus === 2}
          onOk={this.addCategory}
          onCancel={()=>{
            this.form.resetFields();
            this.setState({
              showStatus:0
            })
          }}
        >
           <AddForm Categorys={Categorys} parentId={parentId} setForm={(form) => this.form = form}/>
        </Modal>
      </Card>
    )
  }
}
