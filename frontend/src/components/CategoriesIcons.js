import React from 'react'
import { Button, Divider} from 'antd'
import { Link } from 'react-router-dom'

 const CategoriesIcons = () => {



    return (
        <div>
            <Divider style={{color:'#A6A6A4', fontSize:'20px', marginBottom:'0', marginTop:'30px', marginTop:'50px'}}>Categories</Divider>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', justifyContent:'space-around', marginTop:'40px'}}>
        <Link to="/cyber-security" className='category cyber-sec'>
            Cyber <br/> Security
        </Link>

        <Link to="/data-science" className='category data'>
            Data <br/>Science
        </Link>

        <Link to="/dev-ops" className=' category dev-ops'>
             Dev Ops
        </Link>

       <Link to="/ux-ui" className='category ux-ui'>
            Ux/ Ui
        </Link>

        <Link to="/web-dev" className='category web-dev'>
           Web <br/>Development
        </Link>
        </div>
        </div>
    )
}
export default CategoriesIcons