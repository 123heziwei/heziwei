/* eslint-disable jsx-a11y/alt-text */
import './Lunbo.css'
import React from 'react'

import {Image, Carousel} from 'antd'

//轮播图片
var a1 = 'https://ftp.bmp.ovh/imgs/2021/04/18161febaba56b2d.png'
var a2 = 'https://ftp.bmp.ovh/imgs/2021/04/f38beaa6313a9b1e.png'
var a3 = 'https://ftp.bmp.ovh/imgs/2021/04/cf05fc517121ad83.png'

class Lunbo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            b:1
        }
    }

    a = () => {

    }

    render(){
        return(
            <Carousel autoplay className='slider'>
         <div>
              {/* <img src={a1}/> */}
              <Image src={a1}/>
         </div>
         <div>
              <Image src={a2}/>
         </div>
         <div>
              <Image src={a3}/>
         </div>
      
            </Carousel>
        )
    }

}

export default Lunbo;