// 这里是footer组件
import React from 'react'
import { Layout, Typography  } from 'antd'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bbb: ''
        }
    }



    render() {
        return (
            <div className='footer'>
                <Layout.Footer>
                    <Typography.Title level={3} style={{ textAlign: 'center' }}>
                          @环球旅行网
                    </Typography.Title>
                </Layout.Footer>
            </div>
        )
    }
}


export default App
