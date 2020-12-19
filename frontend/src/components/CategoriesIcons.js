import React from 'react'
import { Typography, Button,  Card, Divider, Skeleton, Progress} from 'antd'
import { Link } from 'react-router-dom'

 const CategoriesIcons = () => {



    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Link to="/cyber-security">
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}>Cyber <br/> Security</Button>
        </Link>

        <Link to="/data-science">
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}>Data <br/>Science</Button>
        </Link>

        <Link to="/dev-ops">
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}> Dev Ops</Button>
        </Link>

       <Link to="/ux-ui">
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}>Ux/ Ui</Button>  
        </Link>

        <Link to="/web-dev">
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}>Web <br/>Development</Button>   
        </Link>

        </div>
    )
}
export default CategoriesIcons