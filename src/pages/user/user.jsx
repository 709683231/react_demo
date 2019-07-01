import React, { Component } from 'react';
import { Card, Button,Table,Modal } from 'antd';
import LinkButton from '../../components/link-button';
import {reqUserList,reqDeleteUser,reqAddOrUpdateUser} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import UserForm from './user-form'
/**
 * 用户管理
 */
export default class User extends Component {
  state = {
    isShow : false,
    users:[] ,// 所有用户的列表
    roles:[]
  }
  initUserList = async ()=>{
    this.columns = [
      {
        title: '用户名',
        width:150,
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        width:250,
        className: 'column-money',
        dataIndex: 'email',
      },
      {
        title: '电话',
        width:250,
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        width:250,
        dataIndex: 'create_time',
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id)=> this.rolesObj[role_id].name,
      },
      {
        title: '操作',
        render: (user)=>(
          <span>
            <LinkButton onClick={()=>this.showUpdate(user)} style={{marginRight:'10px'}}>修改</LinkButton>
            <LinkButton onClick={()=>this.clcikDelete(user)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }
  getUsers = async ()=>{
    const result = await reqUserList();
    if(result.status === 0){
      const {users ,roles} = result.data
      this.rolesObj = roles.reduce((pre,role)=>{
        pre[role._id] = role
        return pre
      },{})
      this.setState({
        users,
        roles
      })
    }
  }
  AddOrUpdateUser = ()=>{
    this.form.validateFields( async (err,user)=>{
      if(!err){
        this.form.resetFields()
        if(this.user){
          user._id = this.user._id
        }
        this.setState({
          isShow:false
        })
        const result = await reqAddOrUpdateUser(user)
        if(result.status===0){
          this.getUsers()
        }
      }
    })
  }
  showUpdate = (user)=>{
    this.user = user
    this.setState({
      isShow:true
    })
  }
  showAddUser = () =>{
    this.user = null
    this.setState({
      isShow:true
    })
  }
  clcikDelete = (user)=>{
    Modal.confirm({
      content:`确定要删除${user.username}用户吗`,
      onOk:async ()=>{
        const result = await reqDeleteUser(user._id)
        if(result.status===0){
          this.getUsers()
        }
      }
    })
  }
  componentWillMount(){
    this.initUserList()
  }
  componentDidMount(){
    this.getUsers()
  }
  render() {
    const {columns} = this;
    const {users,roles,isShow} = this.state
    const user = this.user || {}
    
    const title = <Button type='primary' onClick={this.showUpdate}>创建用户</Button>
    return (
      <Card title={title}>
        <Table
          columns={columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
         <Modal
            title={user._id ? '修改用户' : '添加用户'}
            visible={isShow}
            onCancel={() => this.setState({ isShow: false })}
            onOk={this.AddOrUpdateUser}
          >
            <UserForm
              setForm={(form) => this.form = form}
              user={user}
              roles={roles}
            />
          </Modal>
      </Card>
    )
  }
}
