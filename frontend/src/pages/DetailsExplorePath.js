import React, {useState, useEffect} from 'react'
import { getSinglePath } from '../services/paths.js'
import {  Typography, Skeleton, Divider, Form} from 'antd'
import { Link } from 'react-router-dom'
import LayoutDash from "../components/LayoutDash";


const { Title } = Typography
const DetailsExplorePath = ({ match: { params: { id } }, history }) => {
    const [pathsy, setPaths] = useState(null)
    const [changes] = useState(false)

    useEffect(() => {
    async function getPaths() {
        const {data} = await getSinglePath(id)
        setPaths(data) 
    }
    getPaths()
    }, [changes])


    return (
        //solo ver no editar
    <LayoutDash>
        <div>
        <div style={{ display:'flex', padding: '1rem 3rem', backgroundColor:'white', borderRadius:'10px'}}>

        {pathsy? (<div >
            <h2 style={{textDecoration:'underline'}}>{pathsy.title}</h2>
        <div style={{textAlign:'left', margingRight:'200px'}}> 

            <p style={{lineHeight:'16px', marginBottom:'15px'}}><b>About</b><br/>{pathsy.description}</p>
            <p style={{lineHeight:'7px'}}> <b>Category:</b>{'   '}{pathsy.category}</p>
            <p style={{lineHeight:'7px'}}> <b>Level: </b>{'   '}{pathsy.level}</p>
            <small> Created by {pathsy.users[0].username}</small>
        </div>


    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} >

    <Divider>Topics</Divider>
    <br />

    {pathsy.topics.map((topic, i) => 
        <Link to={`/topicdetails/${topic._id}`}> 
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', backgroundColor:'#f7f7f5', borderRadius:'15px', marginBottom:'10px', width:'900px'}}>  
        <div style={{display:'flex', flexDirection:'column', textAlign:'left', marginLeft: '40px', padding: '10px'}}>
        <p style={{marginBottom:'1px', marginTop:'5px', color:'gray'}} > 
            {topic.title}</p>{'   '}
        <small style={{marginBottom:'10px', marginTop:'5px', color:'gray', lineHeight:'10px'}}>
        <b>Objective:</b> {'   '}
            {topic.objective}</small>
         <small style={{marginBottom:'10px', paddingLeft:'0px', color:'gray', lineHeight:'10px'}}>
        <b>Duration:</b>{'   '}
        {topic.duration}</small>

            </div>
        </div>

    </Link>
    )}
    </div>
    </div>
    ) : (
          <Skeleton active />
        )}

    </div>
    </div>
    </LayoutDash> 

    )
}
export default DetailsExplorePath;