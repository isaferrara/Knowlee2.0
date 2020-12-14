import React from 'react'
import ReactPlayer from 'react-player/youtube'

const Multimedia = () => {

    let urlY='https://www.youtube.com/watch?v=lWQ69WX7-hA'

    return (<div>
        <h1>Video</h1>
    <ReactPlayer url={urlY} />
    </div>  
    )}


export default Multimedia;
