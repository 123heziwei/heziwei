 // 引入createStore方法
import { createStore } from 'redux' 
// 创建数据存储仓库

import reducer from './reducer'
const store = createStore(reducer)
//暴露出去          
export default store              