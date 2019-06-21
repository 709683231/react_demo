import React, { Component } from 'react';
import { Card, Table, Icon, Select, Input, Button, message } from 'antd';
import { reqProductList, reqProductSearchList, reqUpdateStatus } from '../../api';
import LinkButton from '../../components/link-button';
import { PAGE_SIZE } from '../../utils/constants';

/**
 * 商品管理
 */
export default class Product extends Component {
  state = {
    loading: false,//初始状态为loading
    list: [],//数据列表
    total: 0,//总数
    searchType: 'productName', // 根据什么来搜索, productName: 商品名, productDesc: 商品描述
    searchName: '', // 搜索的关键字

  }
  //获取指定页码的数据
  getProductList = async (pageNum) => {
    this.pageNum = pageNum;
    this.setState({ loading: true });
    const { searchType, searchName } = this.state;
    let result;
    if (!searchName) {
      result = await reqProductList(pageNum, PAGE_SIZE);
    } else {
      result = await reqProductSearchList(pageNum, PAGE_SIZE, searchType, searchName);
    }
    this.setState({ loading: false });
    if (result.status === 0) {
      const { list, total } = result.data
      this.setState({
        list,
        total
      })
    }
  }
  //初始化数据
  initProductList = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        className: 'column-money',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        width: 100,
        render: (price) => '￥' + price
      },
      {
        title: '状态',
        align: 'center',
        width: 100,
        render: (product) => {
          const { status, _id } = product;
          const btnText = status===1?'下架':'上架';
          const text = status===1?'在售':'已下架';
          return (
            <span>
              <Button type='primary' onClick={()=>this.updateStatus(_id,status===1?2:1)}>{btnText}</Button>
              <div>{text}</div>
            </span>
          )
        }

      },
      {
        title: '操作',
        align: 'center',
        width: 100,
        render: (product) =>
          <span>
            <div>
              <LinkButton>详情</LinkButton>
            </div>
            <div>
              <LinkButton>修改</LinkButton>
            </div>
          </span>
      }
    ]
  }
  //更新数据
  updateStatus = async (_id,status)=>{
    const result = await reqUpdateStatus(_id,status);
    if(result.status===0){
      message.success('数据更新成功');
      this.getProductList(this.pageNum)
    }
  }

  componentWillMount() {
    this.initProductList()
  }

  componentDidMount() {
    this.getProductList(1)
  }

  render() {
    const { loading, list, total, searchType, searchName } = this.state
    const { Option } = Select
    const title = (
      <span>
        <Select
          style={{ width: 150 }}
          value={searchType}
          onChange={(value) => this.setState({ searchType: value })}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 150, margin: '0 15px' }}
          onChange={(event) => this.setState({ searchName: event.target.value })}
          value={searchName}>
        </Input>
        <Button type="primary" onClick={() => this.getProductList(1)}>搜索</Button>
      </span>
    );
    const extra = (
      <Button type='primary' onClick={()=>this.props.history.push('/product/addupdata')}>
        <Icon type='plus' />添加商品
      </Button>
    );

    return (
      <Card title={title} extra={extra} >
        <Table
          columns={this.columns}
          dataSource={list}
          bordered
          rowKey='_id'
          loading={loading}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            total,
            onChange: this.getProductList
          }}

        />
      </Card>
    )
  }
}
