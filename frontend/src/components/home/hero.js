import React from 'react';
import { Carousel, Button, Typography } from 'antd';
import { Link } from 'react-router-dom'

const {Title, Text, Paragraph} = Typography;

const items = [
    {
        key: '1',
        title: 'Learning paths',
        content: 'Boost your skills. Stay sharp. Get ahead.',
    },
    {
        key: '1',
        title: 'Share your knowledge',
        content: 'Create & help others grow.',
    },
    {
        key: '1',
        title: 'Network',
        content: 'Meet people. Form a community.',
    },
]

const AppHero = () => {


    return (

        <div className="heroBlock">
        <Title style={{ fontSize: '80px', color: '#ffffff', fontFamily:'roboto', marginBottom: '0px', paddingTop:'230px', marginLeft:'760px' }}>Knowlee</Title>

        <Carousel autoplay >
        {items.map(item => {
            return (
             <div key={item.key} className="container-fluid" style={{marginLeft: '840px', marginTop: '0'}}>
             <div className="content" style={{marginLeft: '830px', paddingBottom: '400px'}}>
             <div className="btnHolder" style={{marginBottom: '200px'}}>
             <p style={{ fontSize: '30px', color: '#ffffff', fontFamily:'sans-serif', fontWeight:'bold', paddingTop:'50px', marginBottom:'0px' }}>{item.title}</p>
              <p style={{ fontSize: '25px', color: '#ffffff', fontFamily:'sans-serif', fontWeight:'lighter'  }}>{item.content}</p>
             <div style={{ fontSize: '20px', color: 'white', backgroundColor:'#DC143C', height:'40px', border:'none', borderRadius:'10px',paddin:'5px'}} >
              <Link style={{ fontSize: '20px', color: 'white'}}to='/login'  >Start learning</Link>
            </div>
              </div>
             </div>
             </div>
            );
        })}        
       </Carousel>
      </div>
    );
}

export default AppHero;