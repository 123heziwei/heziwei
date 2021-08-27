import React from 'react'
import './SideMenu.css'

import {sideMenuList} from '../mock/01.js'

import { Menu } from 'antd';
import { StarOutlined,DingdingOutlined ,SettingOutlined } from '@ant-design/icons';


class SideMenu extends React.Component{
    constructor(props){
        super(props)
        this.state={
            a:''
        }
    }

    a=()=>{

    }

    render(){
        return(
        // 水平vertical
          <Menu mode='vertical' className='side-menu'>
             {
               sideMenuList.map((m,index)=>(
                   <Menu.SubMenu
                      key={Math.random()}
                      title={
                          <span>
                              <SettingOutlined style={{marginRight:20}}/>
                              {m.title}
                          </span>
                      }
                   >

                       {
                           m.subMenu.map((m2,m2index)=>(
                            <Menu.SubMenu
                            key={Math.random()}
                            title={
                                <span>
                                    <DingdingOutlined style={{marginRight:15}}/>
                                    {m2.title}
                                </span>
                            }
                            >

                                {
                                    m2.subMenu.map((m3,m3index)=>(
                                        <Menu.Item
                                         key={Math.random()}
                                        
                                        >
                                             <span>
                                                  <StarOutlined style={{marginRight:15}}/>
                                                  {m3}
                                             </span>

                                        </Menu.Item>
                                    ))
                                }

                            </Menu.SubMenu>
                           ))
                       }
                       
                   </Menu.SubMenu>
               ))   
             }
          </Menu>
        )
    }


}

export default SideMenu;


