/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { message, Button } from 'antd';
import './Register.css';
import axios from "axios";
export class RegisterPage  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: "",
            password: ""
        }
    }
    change(e) {
        console.log(e.target.value);
        //设置数据的值，用this.setState({})
        this.setState({
            mobile: e.target.value
        })
    }
    change2(e) {
        console.log(e.target.value);
        //设置数据的值，用this.setState({})
        this.setState({
            password: e.target.value
        })
    }

    reg() {
        const { history } = this.props
        console.log('进入reg')
        axios
            .post("http://127.0.0.1:3003/zhuce", {
                mobile: this.state.mobile,
                password: this.state.password,
            })
            .then((data) => {
                console.log(data);
                    if (data.data.code == "200") {
                    message.info('注册成功去登录页面登录');
                    history.push('/login')

                } else {
                    message.error('注册失败');
              
                }
            });

    }
    //   生命周期

    render() {

        return (
            <div>

                <div className='registerWrap'>
                    <div className='tuerqi'>
                        <img src="https://ftp.bmp.ovh/imgs/2021/04/7b366c73785c3f36.jpg" />
                    </div>

                    <div className='registerWrap2'>
                        <h1>手机号</h1>
                        <div>
                            <input type="text" value={this.state.mobile} onChange={this.change.bind(this)} />
                        </div>
                        <h1>密码</h1>
                        <div>
                            <input type="text" value={this.state.password} onChange={this.change2.bind(this)} />
                        </div>
                        <button onClick={this.reg.bind(this)} className='button1'>
                            注册
                        </button>
                    </div>


                </div>




            </div>
        )
    }
}






export default RegisterPage