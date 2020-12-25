import React from 'react'
import { Typography, Button,  Card, Divider, Skeleton, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context.js'


 const CategoriesIcons = () => {
    const { user } = useContextInfo()

    return (
        <div>
        <Divider style={{color:'#A6A6A4', fontSize:'20px', marginBottom:'0'}}>Categories</Divider>
            <div style={{display:'flex', alignItems:'center',  justifyContent:'space-evenly', marginTop:'40px'}}>
        <div className='parent border-all'>
        <Link to={`/my-paths/${user._id}`} className='my-category all-my-paths' >
           All my <br/> Paths
        </Link>
        </div>
        <div className='parent border-sec' >
        <Link to={`/cyber-security/${user._id}`} className='my-category cyber-sec '  >
           Cyber <br/> Security
        </Link>
        </div>

        <div className='parent border-data' >
        <Link to={`/data-science/${user._id}`} className='my-category data' >
            Data <br/>Science
        </Link>
        </div>

        <div className='parent border-ops' >
        <Link to={`/dev-ops/${user._id}`} className=' my-category dev-ops' >
             Dev Ops
        </Link>
        </div>

        <div className='parent border-ux' >
       <Link to={`/ux-ui/${user._id}`} className='my-category ux-ui' >
            Ux/ Ui
        </Link>
        </div>

        <div className='parent border-dev' >
        <Link to={`/web-dev/${user._id}`} className='my-category web-dev'>
            Web <br/>Development
        </Link>
        </div>
        </div>
        </div>
    )
}
export default CategoriesIcons