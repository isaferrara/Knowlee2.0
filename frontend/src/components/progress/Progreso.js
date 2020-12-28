import React from 'react'
import {useState, useEffect} from 'react'
import { Button } from 'antd';
import { useContextInfo } from '../../hooks/context.js'
import {  updateTopic} from '../../services/topics.js'

const Progreso = (props) => {
    const [changes, setChanges] = useState(true)
    const [status, setStatus] = useState(props.progress)

    useEffect(() => {
      setStatus( status)
    },[changes])


  async  function updateProgress(){
      const {data}= await updateTopic(props._id, {
        title: props.title,
        objective: props.objective,
        duration: props.duration,
        progress: !status, 
        content:props.content,
        paths:props.paths,
        })
        setStatus(!status)
        setChanges(!changes)
    }


return <>
    {!status ? <Button onClick={updateProgress}> Marked as complete</Button> : <Button onClick={updateProgress}> Marked as not completed</Button>}
</>
}
export default Progreso
