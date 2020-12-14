import React from 'react'
import { Button} from 'antd'

import LayoutDash from "../components/LayoutDash";
import { useContextInfo } from '../hooks/context.js'

const PreDonate = () => {
  const { user } = useContextInfo()
function onPressEnter(value) {
}

return (<div>
    <LayoutDash>
    <div style={{borderRadius:' 20px ', border: '	#DCDCDC dashed 1px'}}>
    <h1> Donations</h1>
    <h3>Please choose the amount you want to donate</h3>
    <h3>$USD</h3>
    <br/>
    <Button style={{padding:'5px 10px 10px 10px', margin: '10px', color: 'white', backgroundColor: '#DC143C'}} type="link" href="/donate100">$100</Button>
    <Button style={{padding:'5px 10px 10px 10px',margin: '10px', color: 'white', backgroundColor: '#DC143C'}} type="link" href="/donate200">$200</Button>
    <Button style={{padding:'5px 10px 10px 10px',margin: '10px', color: 'white', backgroundColor: '#DC143C'}} type="link" href="/donate300">$300</Button>
    <Button style={{padding:'5px 10px 10px 10px', margin: '10px', color: 'white', backgroundColor: '#DC143C'}} type="link" href="/donate400">$400</Button>
    </div>
    <br/>
    <div style={{marginTop:' 20px '}}>
    <h1> Why Donate?</h1>
    <h3>Please choose the amount you want to donate</h3>
    <p>Donating to charity is a major mood-booster. The knowledge that you’re helping others is hugely empowering and, in turn, can make you feel happier and more fulfilled. Research has identified a link between making a donation to charity and increased activity in the area of the brain that registers pleasure - proving that as the old adage goes, it really is far better to give than to receive.
    Our own research into why people give supports this. We asked 700 of our generous donors to tell us what motivates them to give regularly to charity; 42% agreed the enjoyment they receive from giving as a key influence. 
    What type of giver are you?</p>
    </div>
    </LayoutDash>
</div>
      
    
) 
}

export default PreDonate

