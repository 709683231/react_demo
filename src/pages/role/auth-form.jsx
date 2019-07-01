import React,{Component} from 'react'
import {Form, Tree, Input} from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'

const {Item} = Form.Item
const {TreeNode} = Tree
export default class AuthForm extends Component{
    static propTypes = {
        role:PropTypes.object
    }
    constructor(props){
        super(props)
        const menus = this.props.role.menus
        this.state = {
            checkedKeys:menus
        }
    }
    getMenus = () => this.state.checkedKeys
    
    initTreeNodes = (menuList) =>{
        return menuList.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.initTreeNodes(item.children):null}
                </TreeNode>
            )
            return pre
        },[])
    }
    componentWillMount(){
        this.treeNodes = this.initTreeNodes(menuList)
    }
    componentWillReceiveProps(nextProps){
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys:menus
        })
    }
    onCheck = (checkedKeys)=>{
        this.setState({
            checkedKeys
        })
    }
    render(){
        const {checkedKeys} = this.state
        const {role} = this.props
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }
        return (
            <div>
            <Item label='角色名称' {...formItemLayout}>
              <Input value={role.name} disabled/>
            </Item>
    
            <Tree
              checkable
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={this.onCheck}
            >
              <TreeNode title="平台权限" key="all">
                {this.treeNodes}
              </TreeNode>
            </Tree>
          </div>
        )
    }
}

