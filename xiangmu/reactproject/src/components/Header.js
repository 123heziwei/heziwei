/* eslint-disable jsx-a11y/alt-text */
// import logo from '../assets/logo.svg';
import './Header.css';
import React from 'react'

//
import { withRouter} from "react-router-dom";

import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

const logo = 'https://ftp.bmp.ovh/imgs/2021/06/7995dff8ae6dedb9.png'


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: 1
        }
    }

    a = (e) => {
        console.log('中文切换')
        // 往sessionStrage里面保存一份
        this.setState({
            flag: 1
        }, () => {
            console.log(this.state.flag)
        })
    }

    b = (e) => {
        console.log('english change')
        // 往sessionStrage里面保存一份
        this.setState({
            flag: 2
        }, () => {
            console.log(this.state.flag)
        })
    }
   
      render(){
      return(
        // eslint-disable-next-line eqeqeq
        this.state.flag==1?<div className='App'>
        <div className='app-header'>
           <div className='top-header'>
             <div className='innner'>
             <Typography.Text>
                     让旅行更幸福
              </Typography.Text>
              <Dropdown.Button
              style={{marginLeft:15}}
              icon={<GlobalOutlined />}
              overlay={
                <Menu>
                  <Menu.Item onClick={this.a} key={1}>中文</Menu.Item>
                  <Menu.Item onClick={this.b} key={2}>English</Menu.Item>
                </Menu>
              }
              >
                语言
              </Dropdown.Button>
              <Button.Group className='button-group'>
                    <Button
                     onClick={()=>this.props.history.push('Register')}
                    >注册</Button>
                    <Button
                     onClick={()=>this.props.history.push('login')}
                    >登录</Button>
              </Button.Group>
             </div>
           </div>


           <Layout.Header className='main-header'>
                <img src={logo} className='App-logo' />
                <Typography.Title level={3} className='title'>
                        环球旅行
                 </Typography.Title>
                 <Input.Search
                   placeholder={'请输入旅游目的地 主题 等关键字'}
                   className='search-input'
                 >
                 </Input.Search>
           </Layout.Header>

           {/* 场边导航菜单栏 */}
           <Menu mode='horizontal' className='main-menu'>
                    <Menu.Item key={1}>旅游首页</Menu.Item>
                    <Menu.Item key={2}>周末游</Menu.Item>
                    <Menu.Item key={3}>跟团游</Menu.Item>
                    <Menu.Item key="4"> 自由行 </Menu.Item>
                    <Menu.Item key="5"> 私家团 </Menu.Item>
                    <Menu.Item key="6"> 邮轮 </Menu.Item>
                    <Menu.Item key="7"> 酒店+景点 </Menu.Item>
                    <Menu.Item key="8"> 当地玩乐 </Menu.Item>
                    <Menu.Item key="9"> 主题游 </Menu.Item>
                    <Menu.Item key="10"> 定制游 </Menu.Item>
                    <Menu.Item key="11"> 游学 </Menu.Item>
                    <Menu.Item key="12"> 签证 </Menu.Item>
                    <Menu.Item key="13"> 企业游 </Menu.Item>
                    <Menu.Item key="14"> 高端游 </Menu.Item>
                    <Menu.Item key="15"> 爱玩户外 </Menu.Item>
                    <Menu.Item key="16"> 保险 </Menu.Item>
           </Menu>
        </div>

         
      </div>:(
        <div className='App'>
        <div className='app-header'>
           <div className='top-header'>
             <div className='innner'>
             <Typography.Text>
                  Make travel happier
              </Typography.Text>
              <Dropdown.Button
              style={{marginLeft:15}}
              icon={<GlobalOutlined />}
              overlay={
                <Menu>
                  <Menu.Item onClick={this.a} key={1}>chinese</Menu.Item>
                  <Menu.Item onClick={this.b} key={2}>English</Menu.Item>
                </Menu>
              }
              >
                language
              </Dropdown.Button>
              <Button.Group className='button-group'>
                    <Button
                       onClick={()=>this.props.history.push('Register')}
                    >register</Button>
                    <Button
                       onClick={()=>this.props.history.push('login')}
                    >login</Button>
              </Button.Group>
             </div>
           </div>


           <Layout.Header className='main-header'>
                <img src={logo} className='App-logo' />
                <Typography.Title level={3} className='title'>
                     Global travel
                 </Typography.Title>
                 <Input.Search
                   placeholder={'Please enter keywords such as tourism destination theme'}
                   className='search-input'
                 >
                 </Input.Search>
           </Layout.Header>

           <Menu mode={"horizontal"} className="main-menu">
                <Menu.Item key={1}>Travel home page</Menu.Item>
                <Menu.Item key={2}> The weekend</Menu.Item>
                <Menu.Item key={3}>package</Menu.Item>
                <Menu.Item key="4"> independent </Menu.Item>
                <Menu.Item key="5">  private group </Menu.Item>
                <Menu.Item key="6"> cruise </Menu.Item>
                <Menu.Item key="7"> hotel </Menu.Item>
                <Menu.Item key="8"> Local play </Menu.Item>
                <Menu.Item key="9"> Subject to swim </Menu.Item>
                <Menu.Item key="10"> The private group </Menu.Item>
                <Menu.Item key="11"> study </Menu.Item>
                <Menu.Item key="12"> haiguan </Menu.Item>
                <Menu.Item key="13"> company </Menu.Item>
                <Menu.Item key="14"> super travel </Menu.Item>
                <Menu.Item key="15"> play  </Menu.Item>
                <Menu.Item key="16"> insurance </Menu.Item>
          </Menu>

        </div>
              
      </div>
      )

      )
      
    }
}


export default withRouter(Header)