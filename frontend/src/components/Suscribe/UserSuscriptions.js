import React, {useState, useEffect}from 'react'
import { Typography, Button, Modal, Form,  Card, Divider, Skeleton, Collapse, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../../hooks/context.js'
import {getSingleSuscriber} from '../../services/suscriptions'
import { getAllUsers, getSingleUser } from '../../services/auth.js'
import { getAllSuscribers } from '../../services/suscriptions.js'
import { updateFn } from '../../services/auth.js'
import { getSinglePath } from '../../services/paths.js'
const { Panel } = Collapse;


const UserSuscriptions = () => {
    const [path, setPath]= useState([])
    const [info, setInfo]= useState(null)
    const { user } = useContextInfo()
    const [changes, setChanges] = useState(false);


    useEffect(() => {

        async function getPaths() {


            const {data} = await getSingleUser(user._id)
            const subs= data.suscriptions
            const mySubs=subs.map(suscriptions => suscriptions)
            setInfo(mySubs)
    
        }
        getPaths()
           
        }, [changes])


        async function showPath(path){
            for (const element of path){
                const {data} = await getSinglePath(element)
                
                setPath([...path, data])
                console.log([...path, data])
            }

            
console.log(path, 'paths' )
        }

    return (
        <div>
        <Divider>Your subscriptions</Divider>
        {info ? 
        (<div>
        {info.map(subs=> 

         <Collapse accordion onChange={()=> showPath(subs.paths)}>
         <Panel showArrow={false} header={<><p>{subs.username}</p> {subs.image} <p>{subs.suscribers.length} suscribers</p> </> } > 
    
         {path? <> {path.map(info=> 
         <>
         <p>{info.title}</p> 
         {info.topics? <p>{info.topics.length}</p>:  <p>No topics available</p>}
          </>
         )} </> : <p>No paths </p>}
        </Panel>    


  
        </Collapse>
         )}
        </div>):(<div>  
        <Skeleton/>
        </div>
        )}
        </div>
    )
}

export default UserSuscriptions