import './Error.css';
import React from 'react'


class Error extends React.Component {
    constructor() {
        super()
        this.state = {
            bbb: ''

        }
    }
    a = (e) => {

    }
    render() {

        return (
            <div>
                <div id="clouds">
                    <div className="cloud x1"></div>
                    <div className="cloud x1_5"></div>
                    <div className="cloud x2"></div>
                    <div className="cloud x3"></div>
                    <div className="cloud x4"></div>
                    <div className="cloud x5"></div>
                </div>
                <div className='c'>
                    <div className='_404'>404</div>
                  
                        <div className='_1'>请您正常操作噢</div>
                    
                         
                     </div>
                     </div>

                
        )
    }
}


export default Error;