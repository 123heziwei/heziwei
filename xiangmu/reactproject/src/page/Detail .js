/* eslint-disable no-undef */
import React, { Component } from 'react';
import axios from 'axios';
// import './Detail.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {commentMockData} from '../mock/03'
import {Productcomments} from '../components/detailcomponents/Productcomments'

import Detailcomponents from '../components/detailcomponents/Detailcomponents'


import { Row, Col, Divider, Typography, Anchor, Menu } from 'antd'


class Detail  extends Component {
    constructor(props){
        super(props)
        this.state={
            data1:'',
            data2:[],
        }
        console.log('Detail props',props);
    }

    //生命周期
    componentDidMount(){
        axios({
            url:'http://localhost:3003/globaltravel',
            method:'get',
            params:{
                id:this.props.match.params.touristRouteId
            }
            
        }).then(res=>{
            console.log('res=',res);
            this.setState({
                data1:res.data.data2,
                data2:res.data.data2.touristRoutePictures,
            },()=>{
                console.log('data1',this.state.data1);
                console.log('data2',this.state.data2);
            })
        }).catch(err=>{
            console.log('err');
        })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className='page-content'>
                    {/* 产品简介 */}
                    <div className='product-intro-container'>
                        <Row>
                            <Col span={15}>
                                {
                                    this.state.data1?( <Detailcomponents
                                        title={this.state.data1.title}
                                        price={this.state.data1.price}
                                        shorprice={this.state.data1.originalPrice}
                                        discount={this.state.data1.discountPresent}
                                        rating={this.state.data1.rating}
                                        pictures={this.state.data2.map((p)=>p.url)}

                                       >
                                           
                                       </Detailcomponents>):<div></div>
                                }
                               
                            </Col>
                            <Col span={9}>
                            </Col>
                        </Row>
                    </div>
                    {/* 锚点菜单 */}
                    <div className='product-detail-anchor'>
                        {/* horizontal 能让 Anchor.Link横排显示 */}
                        {/* 里面的menu部分可以保证  里面的LINK元素横排显示 
                            外面的Anchor能保证  真的可以锚点链接
                        */}
                        <Anchor className='product-detail-anchor'>
                            <Menu mode={'horizontal'}  >
                                <Menu.Item key='1'>
                                    <Anchor.Link title='产品特色' href="#feature">

                                    </Anchor.Link>
                                </Menu.Item>
                                <Menu.Item key='2'>
                                    <Anchor.Link title='费用' href="#fees">

                                    </Anchor.Link>
                                </Menu.Item>
                                <Menu.Item key='3'>
                                    <Anchor.Link title='预定通知' href="#notes">

                                    </Anchor.Link>
                                </Menu.Item>
                                <Menu.Item key='4'>
                                    <Anchor.Link title='评价' href="#comments">

                                    </Anchor.Link>
                                </Menu.Item>

                            </Menu>
                        </Anchor>

                    </div>
                    {/* 产品特色 */}
                    <div id='feature' className='product-detail-container'>
                        <Divider orientation="center">
                           <Typography.Title level={3}>
                                产品特色
                           </Typography.Title> 
                        </Divider>
                        <div
                            style={{margin:50}}
                            dangerouslySetInnerHTML={{__html:this.state.data1.features}}
                           >

                           </div>
                    </div>
                     {/* 费用 */}
                     <div id='fees' className='product-detail-container'>
                     <Divider orientation="center">
                           <Typography.Title level={3}>
                               费用
                           </Typography.Title>
                           
                        </Divider>
                        <div
                            style={{margin:50}}
                            dangerouslySetInnerHTML={{__html:this.state.data1.fees}}
                           >

                           </div>
                     </div>
                    {/* 预定须知 */}
                    <div id='notes' className='product-detail-container'>
                    <Divider orientation="center">
                           <Typography.Title level={3}>
                                 预定须知
                           </Typography.Title>
                           
                        </Divider>
                        <div
                            style={{margin:50}}
                            dangerouslySetInnerHTML={{__html:this.state.data1.notes}}
                           >

                           </div>
                    </div>
                    {/* 商品评价 */}
                    <div id='comments' className='product-detail-container'>
                    <Divider orientation="center">
                           <Typography.Title level={3}>
                                     评价
                           </Typography.Title>
                           
                        </Divider>

                        {/* 评论的一个组件ProductComments */}
                        <div style={{margin:50}}>
                            <Productcomments data={commentMockData}></Productcomments>
                        </div>
                       

                    </div>
                </div>
                <Footer></Footer>

            </div>
        );
    }
}

export default Detail ;