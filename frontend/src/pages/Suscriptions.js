import React from 'react'
import { SuscribeExplore } from '../components/Suscribe/SuscribeExplore'
import { useContextInfo } from '../hooks/context.js'


const Suscriptions = () => {
    const { user } = useContextInfo()

    return (
        <div>        

            <SuscribeExplore/>

        </div>
    )
}
export default Suscriptions