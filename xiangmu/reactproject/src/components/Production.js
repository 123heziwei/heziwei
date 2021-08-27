/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

import { Row, Col, Divider } from 'antd'

import './Production.css'

import {Proimg} from './Proimg'




class Production extends React.Component{
    constructor(props){
        super(props)
        this.state={
            b:1
        }
    }
 
  a=()=>{

  }
  
  render(){
      return(
          <div className='content'>
              {this.props.type===1 && <Divider orientation="left a">{this.props.title}</Divider>}
              {this.props.type===2 && <Divider orientation="left b">{this.props.title}</Divider>}
              {this.props.type===3 && <Divider orientation="left c">{this.props.title}</Divider>}
              <Row>
                  <Col span={4}>
                      <img src={this.props.sideImage} className='side-image'/>
                  </Col>

                  <Col span={20}>
                       <Row>
                           <Col span='12'>
                               <Proimg 
                                id={this.props.products[0].id}
                                size={"large"}
                                title={this.props.products[0].title}
                                imgsrc={this.props.products[0].touristRoutePictures[0].url}
                                price={this.props.products[0].price}
                               >
                               </Proimg>
                           </Col>
                           <Col span='12'>
                               <Row>
                                    <Col span='12'>
                                        <Proimg 
                                            id={this.props.products[1].id}
                                            size={"small"}
                                            title={this.props.products[1].title}
                                            imgsrc={this.props.products[1].touristRoutePictures[0].url}
                                            price={this.props.products[1].price}
                                        >
                                        </Proimg>
                                    </Col>
                                    <Col span='12'>
                                    <Proimg 
                                            id={this.props.products[2].id}
                                            size={"small"}
                                            title={this.props.products[2].title}
                                            imgsrc={this.props.products[2].touristRoutePictures[0].url}
                                            price={this.props.products[2].price}
                                        >
                                        </Proimg>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span='12'>
                                    <Proimg 
                                            id={this.props.products[3].id}
                                            size={"small"}
                                            title={this.props.products[3].title}
                                            imgsrc={this.props.products[3].touristRoutePictures[0].url}
                                            price={this.props.products[3].price}
                                        >
                                        </Proimg>
                                    </Col>
                                    <Col span='12'>
                                    <Proimg 
                                            id={this.props.products[4].id}
                                            size={"small"}
                                            title={this.props.products[4].title}
                                            imgsrc={this.props.products[4].touristRoutePictures[0].url}
                                            price={this.props.products[4].price}
                                        >
                                        </Proimg>
                                    </Col>
                                </Row>
                           </Col>
                       </Row>
                       
                       <Row>
                           <Col span='6'>
                           <Proimg 
                                            id={this.props.products[5].id}
                                            size={"small"}
                                            title={this.props.products[5].title}
                                            imgsrc={this.props.products[5].touristRoutePictures[0].url}
                                            price={this.props.products[5].price}
                                        >
                                        </Proimg>
                           </Col>
                           <Col span='6'>
                           <Proimg 
                                            id={this.props.products[6].id}
                                            size={"small"}
                                            title={this.props.products[6].title}
                                            imgsrc={this.props.products[6].touristRoutePictures[0].url}
                                            price={this.props.products[6].price}
                                        >
                                        </Proimg>
                           </Col>
                           <Col span='6'>
                                        <Proimg 
                                            id={this.props.products[7].id}
                                            size={"small"}
                                            title={this.props.products[7].title}
                                            imgsrc={this.props.products[7].touristRoutePictures[0].url}
                                            price={this.props.products[7].price}
                                        >
                                        </Proimg>
                           </Col>
                           <Col span='6'>
                                                <Proimg 
                                                    id={this.props.products[8].id}
                                                    size={"small"}
                                                    title={this.props.products[8].title}
                                                    imgsrc={this.props.products[8].touristRoutePictures[0].url}
                                                    price={this.props.products[8].price}
                                                >
                                                </Proimg>
                           </Col>
                       </Row>
                  </Col>
              </Row>

              
              
          </div>
      )
  }

}

export default Production;