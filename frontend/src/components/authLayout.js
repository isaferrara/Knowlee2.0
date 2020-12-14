import React from 'react'
import { Layout } from 'antd';
const {  Content } = Layout;


 const authLayout = ({children}) => {
    return (
        <div>
         <Layout className="layout">
        <Content style={{ padding: '250px' }}>
      <div style={{ padding: '24px', background: '#fff'}}>{children}</div>
    </Content>
    </Layout>
        </div>
    )
}

export default authLayout