import React from 'react'
import { useContextInfo } from '../hooks/context.js'
import SuscribeExplore  from '../components/Suscribe/SuscribeExplore.js'
import LayoutDash from "../components/LayoutDash";
import UserSuscriptions from '../components/Suscribe/UserSuscriptions'

const Suscriptions = () => {
    const { user } = useContextInfo()

    return (
        <div>        
        <LayoutDash>
            <SuscribeExplore />
            <UserSuscriptions />
        </LayoutDash>
        </div>
    )
}
export default Suscriptions