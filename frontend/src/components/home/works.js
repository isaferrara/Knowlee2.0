import React from 'react';
import { Button,  Typography } from 'antd';
import {
    CodeOutlined,
    AlertOutlined,
    FormatPainterOutlined,
    LaptopOutlined,
    CalculatorOutlined
  } from '@ant-design/icons';
const {Link} = Typography;

const AppWorks = () => {


    return (
            <div  style={{height:'290px', padding: '25px', backgroundColor:'#1D3747', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{ display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <h2 style={{  color: 'white',  fontWeight:'300', width:'400px', padding:'70px 30px 40px 30px',
                        }}>Our mission is to create a community of technology lovers that are willing to share their knowledge and experience. </h2>
                </div>
                <div>
                <h2 style={{textAlign:'center', color:'white', fontSize:'30px'}}>Categories</h2>
                    <div style={{display:'flex', width:'1000px', alignItems:'center', flexWrap:'wrap',  justifyContent:'space-evenly', marginLeft:'10px'}}>
                   
                    <div className='categoryDash' style={{backgroundColor:'white', display:'flex', flexDirection:'column', border:'3px solid #1D3747'}} >
                    <AlertOutlined style={{fontSize:'60px', color:'#1D3747'}}/>
                        <h2 style={{textAlign:'center', color:'#1D3747', lineHeight:'15px', marginTop:'15px'}}>Cyber <br/> Security</h2>
                    </div>

                    <div className='categoryDash' style={{backgroundColor:'white', display:'flex', flexDirection:'column', border:'3px solid #1D3747'}} >      
                    <CalculatorOutlined style={{fontSize:'60px', color:'#1D3747'}}/>
                        <h2 style={{textAlign:'center', color:'white', lineHeight:'15px', marginTop:'15px',  color:'#1D3747'}}>Data <br/> Science</h2>
                    </div>

                    <div className='categoryDash' style={{backgroundColor:'white', display:'flex', flexDirection:'column', border:'3px solid #1D3747'}} >           
                        <LaptopOutlined style={{fontSize:'60px', color:'#1D3747'}}/>
                            <h2 style={{textAlign:'center', color:'white', lineHeight:'15px', marginTop:'15px',  color:'#1D3747'}}>DevOps</h2>
                    </div>


                        <div className='categoryDash' style={{backgroundColor:'white', display:'flex', flexDirection:'column', border:'3px solid #1D3747'}} >                      
                        <FormatPainterOutlined style={{fontSize:'60px', color:'#1D3747'}}/>
                            <h2 style={{textAlign:'center', color:'white', lineHeight:'15px', marginTop:'15px',  color:'#1D3747'}}>Ux/Ui</h2>
                        </div>

                        <div className='categoryDash' style={{backgroundColor:'white', display:'flex', flexDirection:'column', border:'3px solid #1D3747'}} >                 
                        <CodeOutlined style={{fontSize:'60px', color:'#1D3747'}}/>
                            <h2 style={{textAlign:'center', color:'white', lineHeight:'15px', marginTop:'15px',  color:'#1D3747'}}>Web <br/> Development</h2>
                        </div>

                    </div>
                    </div>
                </div>
     
    );
  }

export default AppWorks;

