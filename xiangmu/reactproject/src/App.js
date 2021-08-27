/* eslint-disable react/jsx-no-undef */

import './App.css';
import React from 'react'
import Home from './page/Home'
import Login from './page/Login'
import Register from './page/Register'
import Detail  from './page/Detail '
import Error from './page/Error'

import { BrowserRouter, Route,Switch} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     flag:1
    }
  }

    render(){
      return(
        <div>
        <BrowserRouter>
          <Switch>
               <Route exact path='/' component={Home}></Route>
               <Route path='/login' component={Login}></Route>
               <Route path='/register' component={Register}></Route>
               
               {/* 详情页 */}
               <Route path='/detail/:touristRouteId' component={Detail}></Route>
               {/* 如果都没有匹配路径就跳去404页面 */}
               <Route component={Error}></Route>
          </Switch>
        </BrowserRouter>
        </div>
      )
    }

    
}

export default App;

    
    
