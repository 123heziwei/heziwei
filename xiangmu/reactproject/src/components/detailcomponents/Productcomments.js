import React from 'react';
import { Comment,List,Tooltip} from "antd";
import moment from 'moment';

export const Productcomments=(props)=>{
    console.log('ProductComments props=',props);
    return(
       <List
       dataSource={props.data}
       itemLayout="horizontal"
       renderItem={(item)=>{
           return (
               <li>
                   
                   <Comment
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={
                         // moment时间的插件
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                          <span>{moment().fromNow()}</span>
                        </Tooltip>
                      }
                   >

                   </Comment>
               </li>
           )
       }}
       >

       </List>
    )
}