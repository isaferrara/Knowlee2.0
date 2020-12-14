import React, {useState} from 'react'
import {  Skeleton, Button,Form, Input} from 'antd'
import ReactPlayer from 'react-player/youtube'


export const LinkContent = (props) => {

    const [contenty, setContent] = useState(props)

    return (
        <div>
        {contenty?
        (<div>
                    <Form.Item name="link" rules={[{ required: true, message: 'Please write a link' }]}>
                    <Input placeholder="Video link (youtube)" bordered={false} style={{ backgroundColor:'white' }} value={<ReactPlayer /> } />
                    </Form.Item>

            {/* SUBMIT BUTTON */}

                <div>
                    <Form.Item style={{ marginTop: '10px'}}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                    </Form.Item>
                </div>

            </div>
            ):(
                <Skeleton active />
            )}
        </div>
    )
}
export default LinkContent