import './Home.css';
import React from 'react'


import Header from '../components/Header'
import Footer from '../components/Footer'
import SideMenu from '../components/SideMenu'
import Lunbo from '../components/Lunbo'

import Production from '../components/Production'

import {Pathner} from '../components/Pathner'

import { Row, Col } from 'antd';

import {productList1,productList2,productList3} from '../mock/02.js'

var img1 = 'https://ftp.bmp.ovh/imgs/2021/04/ff8824bf623acce2.png'
var img2 = 'https://ftp.bmp.ovh/imgs/2021/04/2b3f6895ff145210.png'
var img3='https://ftp.bmp.ovh/imgs/2021/04/edcaf123cc99befb.png'

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    a=()=>{

    }

    render(){
        return(
            <div>
             <Header></Header>
             <div className='page-content'>
             <Row style={{marginTop:20}}>
                  <Col span={6}>
                      <div style={{background:""}}>
                         <SideMenu></SideMenu>
                      </div>
                  </Col>
                  <Col span={18}>
                      <div style={{background:"blue"}}>
                        <Lunbo />
                      </div>
                  </Col>
               </Row>
                
                {/* 热门产品推荐 */}
                <Production
                 title='热门推荐'
                 type={1}
                 sideImage={img1}
                 products ={productList1}
                >
                  
                </Production>

                  {/* 新产品推荐 */}
                  <Production
                    title='新产品推荐'
                    type={2}
                    sideImage={img2}
                    products ={productList2}
                    >
                  
                </Production>

                {/* 国内游推荐 */}
                <Production
                    title='国内游推荐'
                    type={3}
                    sideImage={img3}
                    products ={productList3}
                    >
                  
                </Production>


               <Pathner></Pathner>
             </div>

             <Footer></Footer>
        </div>
        )
    }

}

export default Home;