import React from 'react'
import { Row, Col } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

const AppFeature = () => {
    return (
        <div className="block featureBlock bgGray">
            <div className="container-fluid">
            <div className="titleHolder">
               <h2>Categories</h2> 
               <p>You can find all the knowledge you need.</p>
            </div>
            <Row gutter={[16, 16]}>
            <Col span={8}>
            <Card
                hoverable
       
                cover={<img alt="example"  style={{ height: '300px'}} src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" />}
            >
                <Meta title="web development" />
            </Card>
            </Col>
            <Col span={8}>
            <Card
                hoverable
       
                cover={<img alt="example" style={{ height: '300px'}} src="https://images.unsplash.com/photo-1559028012-481c04fa702d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1535&q=80" />}
            >
                <Meta title="Ux/Ui design" />
            </Card>
            </Col>
            <Col span={8}>
            <Card
                hoverable
       
                cover={<img alt="example" style={{ height: '300px'}} src="https://images.unsplash.com/photo-1586772002345-339f8042a777?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3000&q=80" />}
            >
                <Meta title="DevOps" />
            </Card>
            </Col>
            <Col span={8}>
            <Card
                hoverable
       
                cover={<img alt="example" style={{ height: '300px'}} src="https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" />}
            >
                <Meta title="Cyber Security" />
            </Card>
            </Col>
            <Col span={8}>
            <Card
                hoverable
       
                cover={<img alt="example" style={{ height: '300px'}} src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80" />}
            >
                <Meta title="Data Science" />
            </Card>
            </Col>
            <Col span={8}>
            <Card
                hoverable
       
                cover={<img alt="example" style={{ height: '300px'}} src="https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80" />}
            >
                <Meta title="Machine Learning" />
            </Card>
            </Col>
            </Row>
           
            </div>
        </div>
    );
}

export default AppFeature;
