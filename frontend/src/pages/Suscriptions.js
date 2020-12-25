import React from 'react'
import { useContextInfo } from '../hooks/context.js'
import CategoriesIcons  from '../components/CategoriesIcons.js'
import LayoutDash from "../components/LayoutDash";
import UserSuscriptions from '../components/Suscribe/UserSuscriptions'

const Suscriptions = () => {
    const { user } = useContextInfo()

    return (
        <div>        
        <LayoutDash>          
            <UserSuscriptions />
        </LayoutDash>
        </div>
    )
}
export default Suscriptions