import React, {useState, useEffect}from 'react'
import { getAllPaths, updatePath, getSinglePath} from '../services/paths.js'
import { Typography, Button, Modal, Form,  Card, Divider, Skeleton, Progress} from 'antd'
import { Link } from 'react-router-dom'
import { useContextInfo } from '../hooks/context.js'
import { Input } from 'antd';
import CreatePath from './CreatePath.js'
import { getAllUsers } from '../services/auth.js'

//AQUÍ SE ENCUENTRAN TODOS LOS USUARIOS DISPONIBLES PARA SUSCRIBIRTE
export const SuscribeExplore = () => {
    const [fav, setFav]= useState(null)
    const { user } = useContextInfo()

    return (
        <div>

        </div>
    )
}
