import React, {useState} from 'react'
import { Skeleton, Upload, Button,Form} from 'antd'
import axios from 'axios'
import { UploadOutlined} from '@ant-design/icons';

const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/djjro5m0g/image/upload' 

export const ImgContent = (props) => {
    const [contenty, setContent] = useState(props)
    const [img, setImg] = useState(null)
    const [loading, setLoading] = useState(null)

    async function handleUploadFile(file){

        setLoading(true)
        const data = new FormData()
    
        data.append('file', file)
        data.append('upload_preset', 'project-final-')
    
        const {data: {secure_url}} = await axios.post(cloudinaryAPI, data)
    
        setImg(secure_url)
        setLoading(false)
        };
    
    return (
        <div>
        {contenty?
        (<div>
                    <Form.Item name="upload" valuePropName="fileList" style={{ marginLeft:'30px' }} >
                        <Upload name="image"  showUploadList={false} listType="picture" beforeUpload={handleUploadFile}>
                        <Button icon={<UploadOutlined />}> Upload image</Button>
                        </Upload>
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
export default ImgContent