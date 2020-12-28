import React from 'react';
import {  Button } from 'antd';
import { Link } from 'react-router-dom'



const AppHero = () => {

    const headHome={
        position: 'relative',
        bottom: '0',
        left: '0',
        right: '0',
        width: '100%',
        height: '600px',  
        backgroundColor:'#F7F9FF',
    }


    return (
        <div style= {{ backgroundColor:'#f7f9ff', height:'700px', paddingBottom:'400px'}}>   

        <div style= {{ backgroundColor:'#f7f9ff'}}>
            <img style={{ position:'absolute', marginLeft:'680px', width:'900px', height:'auto'}}  src='../../dash.png'/>
           <div style= {{position:'absolute', marginTop:'250px', marginLeft:'250px', display:'flex', alignItems:'center', flexDirection:'column'}}>
            <h1 style= {{ color:'black', fontSize:'70px', fontFamily:'Futura', marginBottom:'0'}}>Knowlee</h1>
            <h2 style= {{ color:'black',   fontWeight:'200'}}>Create learning paths and roadmaps. <br/>Share, network and learn </h2>
            <Link to='/login'><Button style= {{ backgroundColor:'#e05872', color:'white', borderRadius:'7px', width:'200px', height:'50px', fontSize:'18px'}}> Start learning </Button></Link>
            </div>
            </div>

      </div>
    );
}

export default AppHero;