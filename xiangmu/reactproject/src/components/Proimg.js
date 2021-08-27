/* eslint-disable eqeqeq */
import React from 'react'

import { Image, Typography } from "antd";

//路由穿透
import { withRouter } from "react-router-dom";

//用函数组件来承载图片 大小显示 做个判断
export const Proimg2 = ({id, size, imgsrc, price, title,history})=>{
    return (
        <div onClick={() => history.push(`detail/${id}`)}>
            {size=='large'?(
                <Image src={imgsrc} height={285} width={490}/>
            ):(
                <Image src={imgsrc} height={120} width={240} />
              )}

              <div>
                  <Typography.Text type="secondary">
                      {title.slice(0,22)}
                  </Typography.Text>

                  <Typography.Text type="danger" strong>
                          ¥ {price} 起
                  </Typography.Text>
              </div>
        </div>
    )
}

export const Proimg=withRouter(Proimg2)