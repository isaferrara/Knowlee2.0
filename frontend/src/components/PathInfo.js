import React, {useState, useEffect} from 'react'
import { getSinglePath, getAllPaths} from '../services/paths.js'
import { Typography , Skeleton, Button} from 'antd'
import { useContextInfo } from '../hooks/context.js'


const { Title } = Typography

export const PathInfo = (props) => {
    const [pathsy, setPaths] = useState(null)
    const [myPath, setMyPath] = useState(null)
    const { user } = useContextInfo()

    useEffect(() => {
        async function getPaths() {
            const {data} = await getSinglePath(props._id)
            setPaths(data) 
            const {data: userPath} = await getAllPaths()
            //id de path en que estamos es igual a la del usuario 
            let a = userPath.filter(id => id.users[0]===user._id)


            // agarramos solo las id de paths iguales a las de usuario 
            let userId= a.map(id=>id.users[0])
   
            for(let i=0; i<userId.length; i++){
            }

            let myPath= userId.filter(id=> id===data._id)
            setMyPath(myPath)

        }
        getPaths()
        }, [])

    function changeSett(){
        props.setForms()
    }

    
    return (
        <div>
         <div style={{position:'absolute', marginBottom:'130px', marginLeft:'690px'}}>
        {myPath? <Button type="ghost"  onClick={changeSett} style={{marginTop:'20px'}} >Edit</Button>: <></> }
        </div>
        {pathsy? (<div>

            <h2 style={{textDecoration:'underline'}}>{pathsy.title}</h2>
        <div style={{textAlign:'left', margingRight:'200px', width:'600px', wordWrap: 'break-word'}}> 
            <p style={{lineHeight:'10px', margin:'0'}}><b>About</b></p> <p style={{fontWeight:'lighter', marginBottom:'20px'}}><br/>{pathsy.description}</p>
            <p style={{lineHeight:'7px', fontSize:'15px'}}> <b>Category:</b>{'   '}{pathsy.category}</p>
            <p style={{lineHeight:'7px', fontSize:'15px'}}> <b>Level: </b>{'   '}{pathsy.level}</p>
            <small> Created by {pathsy.users[0].username}</small>
        </div> 


        <br />
        </div>
        ):(
            <Skeleton active />
        )}

        </div>
    )
}

export default PathInfo
