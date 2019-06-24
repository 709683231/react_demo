import React, { Component } from 'react';
import { Card, Button,Table } from 'antd';
import LinkButton from '../../components/link-button';
import {reqUserList} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
/**
 * 用户管理
 */
export default class User extends Component {
  state = {
    isShow : false,
    users:[] ,// 所有用户的列表

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
            <LinkButton style={{marginRight:'10px'}}>修改</LinkButton>
            <LinkButton>删除</LinkButton>
          </span>
        )
      },
    ]
  }
  getUsers = async ()=>{
    const result = await reqUserList();
    
  }
  componentWillMount(){
    this.initUserList()
  }
  componentDidMount(){
    this.getUsers()
  }
  render() {
    const {users} = this.state;
    const {columns} = this;
    
    const title = <Button type='primary'>创建用户</Button>
    return (
      <Card title={title}>
        <Table
          columns={columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
      </Card>
    )
  }
}
