import React, { Component } from 'react';
import { Card, Icon, List } from 'antd';
import LinkButton from '../../components/link-button';
import { reqCategory } from '../../api';
import { BASE_IMG_URL } from '../../utils/constants';


export default class Detail extends Component {
    state = {
        cName1: '',// 一级分类名称
        cName2: '',//二级分类名称
    }
    async componentDidMount() {
        const { pCategoryId, categoryId } = this.props.location.state
        if (pCategoryId === '0') {
            const result = await reqCategory(categoryId)
            const cName1 = result.data.name;
            this.setState({
                cName1
            })
        } else {
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({
                cName1,
                cName2
            })
        }
    }
    render() {
        const { name, desc, price, imgs, detail } = this.props.location.state;
        const { cName1, cName2 } = this.state
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left" style={{ fontSize: 20 }} />
                </LinkButton>
                &nbsp;&nbsp;商品详情
      </span>
        )
        return (
            <Card title={title} className="detail">
                <List>
                    <List.Item>
                        <span className="detail-left">商品名称:</span>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item>
                        <span className="detail-left">商品描述:</span>
                        <span>{desc}</span>
                    </List.Item>
                    <List.Item>
                        <span className="detail-left">商品价格:</span>
                        <span>{price}元</span>
                    </List.Item>
                    <List.Item>
                        <span className="detail-left">所属分类:</span>
                        <span>{cName1} {cName2===''?'':'-->'} {cName2}</span>
                    </List.Item>
                    <List.Item>
                        <span className="detail-left">商品图片:</span>
                        <span>
                            {
                                imgs.map(img => <img src={BASE_IMG_URL + img} alt="img" key={img} style={{ width: 150, height: 150 ,margin:('0px 10px 0px 0px')} }></img>)
                            }
                        </span>
                    </List.Item>
                    <List.Item>
                        <span className="detail-left">商品详情:</span>
                        <div dangerouslySetInnerHTML={{ __html: detail }}></div>
                    </List.Item>
                </List>
            </Card>
        )
    }
}
