/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Login.css'
import axios from 'axios'

import { message, Button } from 'antd';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            b:1,
            mobile:'',
            password:'',
        }
    }

    change(e){
      console.log(e.target.value);
      this.setState({
           mobile:e.target.value
      })
    }

    change2(e){
        console.log(e.target.value);
        this.setState({
            password:e.target.value
       })
      }

    login(){
          console.log('login');
          axios({
              url:'http://127.0.0.1:3003/login',
              method:'post',
              data:{
                  mobile:this.state.mobile,
                  password:this.state.password
              }
          }).then(res=>{
              console.log('login res',res);
              message.info('登录成功');
              this.props.history.push('/')
          }).catch(error=>{
              message.error('登录失败')
              console.log('err',error);
          })
      }

    render(){
        return(
            <div className='loginWrap'>
                <div className='tuerqi '>
                    <img src='https://ftp.bmp.ovh/imgs/2021/04/2b8fc4626b2ba902.jpg'/>
                </div>

                <div className='loginWrap2'>
                        <h1>手机号</h1>
                        <div>
                            <input 
                            type="text" value={this.state.mobile} onChange={this.change.bind(this)} />
                        </div>
                        <h1>密码</h1>
                        <div>
                            <input 
                            type="text" value={this.state.password} onChange={this.change2.bind(this)} />
                        </div>
                        <button onClick={this.login.bind(this)} className='button1'>
                            登录
                        </button>
                    </div>

            </div>
        )
    }
}

export default Login;