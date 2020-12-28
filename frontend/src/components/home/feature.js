import React from 'react'
import {
    CodeOutlined,
    AlertOutlined,
    FormatPainterOutlined,
    LaptopOutlined,
    CalculatorOutlined
  } from '@ant-design/icons';



const AppFeature = () => {
    return (
        <div>
        <div style={{ backgroundColor:'#f7f7f5', padding:'100px 0 20px 0'}}> 
        <h2 style={{textAlign:'center', fontSize:'30px'}}>Categories</h2>
        </div>
        <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'space-evenly', width:'100%', backgroundColor:'#f7f7f5', padding:'0 0 100px 0'}}>

        <div style={{display:'flex', alignItems:'center',  justifyContent:'space-evenly', marginLeft:'100px'}}>
  
        <div className='categoryDash' style={{backgroundColor:'white', display:'flex', flexDirection:'column', border:'6px solid #1D3747'}} >
           
        <AlertOutlined style={{fontSize:'60px', color:'#1D3747'}}/>
            <h2 style={{textAlign:'center', color:'#1D3747', lineHeight:'15px', marginTop:'15px'}}>Cyber <br/> Security</h2>
        </div>

        <div className='categoryDash' style={{backgroundColor:'white', display:'flex', flexDirection:'column', border:'6px solid #1D3747'}} >
           
        <CalculatorOutlined style={{fontSize:'60px', color:'#1D3747'}}/>
            <h2 style={{textAlign:'center', color:'white', lineHeight:'15px', marginTop:'15px',  color:'#1D3747'}}>Data <br/> Science</h2>
        </div>

        <div className='categoryDash' style={{backgroundColor:'white', display:'flex', flexDirection:'column', border:'6px solid #1D3747'}} >
           
           <LaptopOutlined style={{fontSize:'60px', color:'#1D3747'}}/>
               <h2 style={{textAlign:'center', color:'white', lineHeight:'15px', marginTop:'15px',  color:'#1D3747'}}>DevOps</h2>
           </div>
   

           <div className='categoryDash' style={{backgroundColor:'white', display:'flex', flexDirection:'column', border:'6px solid #1D3747'}} >
           
           <FormatPainterOutlined style={{fontSize:'60px', color:'#1D3747'}}/>
               <h2 style={{textAlign:'center', color:'white', lineHeight:'15px', marginTop:'15px',  color:'#1D3747'}}>Ux/Ui</h2>
           </div>
   
           <div className='categoryDash' style={{backgroundColor:'white', display:'flex', flexDirection:'column', border:'6px solid #1D3747'}} >
           
           <CodeOutlined style={{fontSize:'60px', color:'#1D3747'}}/>
               <h2 style={{textAlign:'center', color:'white', lineHeight:'15px', marginTop:'15px',  color:'#1D3747'}}>Web <br/> Development</h2>
           </div>
   
        </div>
        </div>
        </div>
    );
}

export default AppFeature;
