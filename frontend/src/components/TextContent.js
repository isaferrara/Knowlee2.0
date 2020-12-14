import React, {useState} from 'react'
import { Skeleton, Button, Form, Input, } from 'antd'


export const TextContent = (props) => {
    const { TextArea } = Input;
    const [form] = Form.useForm()
    const [contenty, setContent] = useState(props)

    return (
        <div>
        {contenty?
            (<div>
                <Form.Item name='text' rules={[{ required: true, message: 'Please input your knowledge!' }]}>
                <TextArea  rows={8}  placeholder="Write something" bordered={false} style={{ backgroundColor:'white' }} />
                </Form.Item>
            
           {/* SUBMIT BUTTON */}
            <div>
                <Form.Item style={{ marginTop: '10px'}} >
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
export default TextContent