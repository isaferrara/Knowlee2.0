import React, { useState } from 'react';
import { Button, Modal, Typography } from 'antd';

const {Title, Text, Link, Paragraph} = Typography;

const AppWorks = () => {


    return (
            <div  style={{height:'190px', paddingTop: '25px', backgroundColor:'#1D3747', width:'100%'}}>
                <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <h2 style={{ color: '#ffffff', fontSize:'20px'}}>Learn to learn</h2>
                    <h2 style={{ color: '#ffffff', fontWeight:'300'}}>Our mission is to help you create new ways to study and learn in a structured and precise way </h2>
                    <Link to='/login'>
                    <Button style={{ backgroundColor: '#A18932', color:'white', height:'40px', borderRadius:'5px', fontSize:'20px'}} >
                        Start learning
                    </Button> 
                    </Link>
                
                </div>

            </div>
     
    );
  }

export default AppWorks;

