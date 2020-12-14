import React from 'react'
import { Row, Col, Card, Typography} from 'antd';
import {
    CodeTwoTone,
    RocketTwoTone,
    BulbTwoTone
  } from '@ant-design/icons';

const { Title } = Typography


const items = [
    {
        
        key: '1',
        icon: <i class="far fa-file-code"></i>,
        title: 'Somos Coders',
        content: 'todos los dias codiamos para poder mejorar nuestro servicio y producto mas y mas.',
    },
    {
        key: '2',
        icon: <i class="fas fa-code-branch"></i>,
        title: 'Somos Estudiantes',
        content: 'nos preparamos con nuevos temas y maneras de hacer las cosas cada dia',
    },
    {
        key: '3',
        icon: <i class="fas fa-user-secret"></i>,
        title: 'Somos Mentores',
        content: 'al igual que tu fuimos estudiantes y sabemos como puedes aprender mas rapido',
    },
]

const AppAbout = () => {
    return (
       <div className="block aboutBlock">
           <div >
            <div className="titleHolder" >
             <h2>About Us</h2>   
            </div>
            <div  style={{textAlign:'center'}}>
                <p>We believe in learning with a community to strenghten your knowledge </p>
            </div>
            <Row gutter={[16, 16]} style={{ display:'flex', flexWrap: 'nowrap'}}>
                <Card style={{width:'450px'}}>
                         <CodeTwoTone style={{ fontSize: '60px', color: '#08c' }}  />   
                        <Title>Tech lovers</Title>
                        <p>Every day we code to improve our skills and grow </p>
                </Card>
                <Card style={{width:'440px'}}>
                         <RocketTwoTone  style={{ fontSize: '60px', color: '#08c' }}  />   
                        <Title>Learners</Title>
                        <p>We love to learn and we understand obstacles are necesary to grow and improve</p>
                </Card>
                <Card style={{width:'450px'}}>
                         <BulbTwoTone  style={{ fontSize: '60px', color: '#08c' }}  />   
                        <Title>Teachers</Title>
                        <p>We share our knowledge with everyone around us so we can grow in community.</p>
                </Card>
            
            </Row>   
            </div>         
           </div>
    );
}

export default AppAbout;
