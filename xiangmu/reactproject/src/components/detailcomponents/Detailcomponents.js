import React, { Component } from 'react';
import './Detailcomponents.css'

import { Typography, Carousel, Image, Rate, Table } from "antd";

class Detailcomponents extends Component {
    constructor(props){
        super(props)
        this.state={

        }
        console.log(props);
    }

    componentDidMount(){
        console.log('进去componentDidMount里面');
        console.log(this.props);
    }

    render() {
        return (
            <div className='intro-container'>
                <Typography.Title level={4}>{this.props.title}</Typography.Title>
                <Typography.Text>原价：￥{this.props.shorprice} 元</Typography.Text>
                <div className='intro-detail-content'>
                    {/* 这里是详情页里面的html */}
                    <Typography.Text style={{marginLeft:20}}>
                        现价： ￥<span className='intro-detail-strong-text '>{this.props.price} 元 {""}
                           </span>
                    </Typography.Text>
                    <Typography.Text style={{marginLeft:30}}>
                        评分：<span className='intro-detail-strong-text '>{this.props.rating}
                           </span> {""}
                        <Rate allowHalf defaultValue={this.props.rating} />
                    </Typography.Text>

                    {/* 渲染图片 用走马灯Carousel */}
                    <Carousel autoplay slidesToShow={3}>
                         {
                             this.props.pictures.map((p)=>(
                                 <Image key={p} height={200} src={p}/>
                             ))
                         }
                    </Carousel>

                </div>
            </div>
        );
    }
}

export default Detailcomponents;