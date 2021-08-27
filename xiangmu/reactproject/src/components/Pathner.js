/* eslint-disable jsx-a11y/alt-text */

import React from 'react'

import { Row, Col, Typography,Divider } from 'antd';

import './Pathner.css'

const companies =[
    { src: 'https://ftp.bmp.ovh/imgs/2021/04/fc4e37ec4b5bb513.png', title: "凯撒旅游"},
    { src:  'https://ftp.bmp.ovh/imgs/2021/04/e6c64d326f18830e.png', title:"云南旅游"},
    { src: 'https://ftp.bmp.ovh/imgs/2021/04/d2ebd8a7173dee72.png', title: "丽江旅游"},
    { src: 'https://ftp.bmp.ovh/imgs/2021/04/4efd3096e4ad9667.png', title: "爱彼旅游"}
]

export const Pathner=(props)=>{
    return (
        <div className= 'content'>
             <Divider orientation="left">
                 <Typography.Title level={3}>
                                   合作企业
                 </Typography.Title >
             </Divider>
         <Row>
             {
               companies.map((c,index)=>(
                   <Col
                    span={6} key={index}>
                   <img src={c.src}
                    style={{
                        width:'80%',
                        display:'block',
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                   />
                   </Col>
               ))
             }
         </Row>

        </div>
    )
}
