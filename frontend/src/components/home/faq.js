import React from 'react'
import { Collapse, Button } from 'antd';

const { Panel } = Collapse;

const Appfaq = () => {
    return (
        <div className="block faqBlock" style={{display:'flex'}}>
          <div className="container-fluid">
          <div className="titleHolder">
              <h2>FAQ</h2>
              <p>Learn more about us</p>
          </div>
          <div style={{width:'600px'}}>
          <Collapse defaultActiveKey={['1']}>
          <Panel header="What's Knowlee?" key="1" style={{fontSize:'20px'}}>
            <p>Knowlee is a the best community where you learn, create and work the best technology careers </p>
            </Panel>
            <Panel header="What does Knowlee mean?" key="2" style={{fontSize:'20px'}}>
            <p>Knowlee = Knowledge + Free </p>
            </Panel>
            <Panel header="Can I still make money from it?" key="3" style={{fontSize:'20px'}}>
            <p> Sure! We encourage our users to show their appreciation by giving voluntary donations </p>
            </Panel>
            <Panel header="What can I learn?" key="4" style={{fontSize:'20px'}}>
            <p> Whatever you want! We have all kinds: from backend (code on the server) to frontend (code on the client) through many other areas</p>
            </Panel>
            <Panel header="What are the categories?" key="5" style={{fontSize:'20px'}}>
            <p>Web Development, Ux/Ui Design, Cyber Security, Data Analysis, Dev Ops and Data Science </p>
            </Panel>
            <Panel header="Direct support from teacher" key="6" style={{fontSize:'20px'}}>
            <p>When you give our teachers donation you will be able to contact them however they don't have the obligation to answer </p>
            </Panel>
            <Panel header="I want to start now!" key="7" style={{fontSize:'20px'}}>
            <p>R//: Escribenos un e-mail y con gusto te contactaremos!, muchas gracias </p>
            </Panel>
        </Collapse>
        </div>
        <div className="quickSupport">
            <h2>Need more help </h2>
            <Button type="primary"><i size="large" class="fas fa-envelope"></i> Write us</Button>
        </div>
          </div>            
        </div>
    );
}

export default Appfaq;
