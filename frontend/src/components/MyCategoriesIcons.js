import React from 'react'
import { Typography, Button,  Card, Divider, Skeleton, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context.js'



 const CategoriesIcons = () => {
    const { user } = useContextInfo()

    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Link to={`/my-paths/${user._id}`} >
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}>All my <br/> Paths</Button>
        </Link>
        <Link to={`/cyber-security/${user._id}`} >
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}>Cyber <br/> Security</Button>
        </Link>

        <Link to={`/data-science/${user._id}`} >
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}>Data <br/>Science</Button>
        </Link>

        <Link to={`/dev-ops/${user._id}`}  >
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}> Dev Ops</Button>
        </Link>

       <Link to={`/ux-ui/${user._id}`} >
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}>Ux/ Ui</Button>  
        </Link>

        <Link to={`/web-dev/${user._id}`} >
            <Button style={{width:'120px', height:'120px', color:'white', background: 'red', margin:'5px', border:'none', borderRadius:'13px'}}>Web <br/>Development</Button>   
        </Link>

        </div>
    )
}
export default CategoriesIcons