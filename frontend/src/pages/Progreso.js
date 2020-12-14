import React from 'react'
import {useState} from 'react'
import { Steps, Divider } from 'antd';

const { Step } = Steps;

const Progreso = () => {
    const[current, setcurrent] = ('Finished')

return <>
<Steps direction="vertical" size="small" current={2}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>,
</>
}
export default Progreso
