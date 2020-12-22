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
        {pathsy? (<div>
            <Title level={2}>{pathsy.title}</Title>
        <div style={{textAlign:'left'}}> 
            <p><b>Short Description:</b>{pathsy.shortDesc}</p>
            <p><b>Description:</b>{pathsy.description}</p>
            <p> <b>Category:</b>{pathsy.category}</p>
            <p> <b>Level:</b>{pathsy.level}</p>
        </div>
        
        {myPath? <Button type="ghost" block onClick={changeSett}  >Edit Project</Button>: <></> }
        
        <br />
        </div>
        ):(
            <Skeleton active />
        )}

        </div>
    )
}

export default PathInfo
