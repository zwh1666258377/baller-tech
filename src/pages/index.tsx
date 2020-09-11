import React from 'react';
import { isBrowser } from 'umi';
import {Button, Typography} from 'antd'
const {Text,Title} = Typography

export default () => {
  if (isBrowser()) {
    fetch('http://localhost:7001/1.1').then(r => {
      return r.json()
    }).then(console.log)
  }
  return  <button onClick={()=>{
    alert(111)
  }}>3123123</button>
}