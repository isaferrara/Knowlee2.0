import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player/youtube'

//ants
import { Typography, Skeleton, Divider, Card, Upload, Button, Modal,Form, Input, Space} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

//services

//components

import LayoutDash from "../components/LayoutDash";


export const Newsfeed = () => {

        
            return (
                <div style={{display:'flex', justifyContent:'center', width:'100%',  height:'100%', alignContent:'center'}}>
                    <LayoutDash>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', marginLeft :'170px'}}>

    
                    <div style={{width:'80vh'}}> 

                <h1>Today's News</h1>
                    <div style={{display:'flex', justifyContent:'left', flexDirection:'column'}}>
                    <ReactPlayer url={'https://www.youtube.com/watch?v=Pw8U9l8acPA'}/> 
                    <br/> 
                    <div>
                    <p>Standards in web development sometimes change faster than they can be implemented. To stay one step ahead, it is important to focus on trends, techniques, and approaches that are gaining popularity.
                        We have analyzed tendencies across industries to create this ultimate list of web development trends in 2020. As a bonus, you’ll read about the top web technology stacks worth your attention in the coming year. No matter what your current interests are — marketplace development, startup innovations, or IoT inventions — you should be aware of these trends.

                    </p>
                    </div>
                    
                </div>
                    <Divider></Divider>
        
                    </div>
                    </div>
                </LayoutDash>
                </div>
            )
        }
        export default Newsfeed