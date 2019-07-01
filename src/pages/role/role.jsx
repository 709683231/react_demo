import React, { Component } from 'react'
import { Card, Table, Modal ,Button, message} from 'antd'

import AddForm from './add-form'
import AuthForm from './auth-form'
import {PAGE_SIZE} from '../../utils/constants'
import {formateDate} from '../../utils/dataUtils'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryutil'

import { reqRoles ,reqAddRole ,reqUpdateRole} from '../../api';
/**
 * 角色管理
 */
export default class Role extends Component {
  state = {
    roles:[],
    isShowAdd:false,
    isShowAuth:false
  }
  constructor(props){
    super(props)
    this.authRef = React.createRef()
  }
  initColumn = () =>{
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: auth_time => formateDate(auth_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '操作',
        render: (role) => <LinkButton onClick={() => this.showAuth(role)}>设置权限</LinkButton> 
      },
    ]
  }
  showAuth = (role) =>{
    this.role = role
    this.setState({
      isShowAuth:true
    })
  }
  getRoles = async () =>{
    const result = await reqRoles()
    if(result.status===0){
      const roles = result.data
      this.setState({
        roles
      })
    }
  }
  addRole = ()=>{
    this.form.validateFields( async (error,values)=>{
      if(!error){
        this.setState({
          isShowAdd:false
        })
        this.form.resetFields()
        const result = await reqAddRole(values.roleName)
        if(result.status === 0){
          message.success('保存角色成功')
          const role = result.data
          const roles = this.state.roles
          this.setState({
            roles:[...roles,role]
          })
        }
      }
    })
  }
  updateRole = async () =>{
    this.setState({
      isShowAuth:false
    })
    const role = this.role
    role.menus = this.authRef.current.getMenus()
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    const result = await reqUpdateRole(role)
    if(result.status===0){
      message.success('授权成功')
      this.getRoles()
    }
  }
  componentWillMount(){
    this.initColumn()
  }
  componentDidMount(){
    this.getRoles()
  }
  render() {
    const {roles, isShowAdd, isShowAuth} = this.state
    const title = (
      <Button type='primary'>
        创建角色
      </Button>
    )
    const role = this.role || {}
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false })
            this.form.resetFields()
          }}
        >
          <AddForm
            setForm={(form) => this.form = form}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <AuthForm ref={this.authRef} role={role} />
        </Modal>
      </Card>
    )
  }
}
