import React, {useState, useEffect}from 'react'
import { createPath } from '../services/paths.js'
import { createTopic } from '../services/topics.js'
import LayoutDash from "../components/LayoutDash";



import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Divider,
    Select,
    Space
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {useContextInfo} from '../hooks/context'

 const CreatePath = (props) => {
    const [form] = Form.useForm()
    const {user}= useContextInfo()

    

    const submitForm=  async (path) =>{ 
        const {data}= await createPath(
            {
            title: path.title,
            description:path.description,
            shortDesc: path.shortDesc,
            isFav: path.isFav,
            progress: path.progress,
            level: path.level,
            category: path.category,
            userId: user._id
        }
        )

        const {_id}= data
        {path.topics? (
        await path.topics.map( topics=>{
            createTopic(
            {title:topics.title,
            objective: topics.objective,
            duration: topics.duration,
            content: topics.content,
            pathId:_id
            })
        })): ( Error ('Parameter is not a number!'))}

        form.resetFields()


        props.history.push(`/dash/${user._id}`)
        } 


    return (
        <LayoutDash>

        <div style={{width:'400px', marginLeft:'300px'}}>

            <Row>
        <Col span={24}>
        <h1>Add new path</h1> 
        <Divider />

        <Form form={form} layout="vertical" onFinish={submitForm} autoComplete="off">
            <Form.Item
            name="title"
            label="Title:"
            rules={[
            {
                required: true,
                message: 'Please input a title!',
            },
            ]}>
            <Input />
            </Form.Item>

            <Form.Item 
           
            placeholder="Write a short sentence in 50 words"
            name="Short description"
            label="Short description:"
            rules={[
            {
                required: true,
                message: 'Please input a short description!',
            }, 
            ]}>
              <Input.TextArea maxLength={50} />
            </Form.Item>

            <Form.Item 
            placeholder="Not required"
            name="description"
            label="Description:"
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item name="category" label="Category:"
            rules={[
            {
                required: true,
                message: 'Please input a category!',
            }, 
            ]}>
            
                <Select placeholder="Category">
                <Select.Option value="Web Dev">Web Development</Select.Option>
                <Select.Option value="Ux/Ui">Ux/Ui</Select.Option>
                <Select.Option value="Dev Ops">Dev Ops</Select.Option>
                <Select.Option value="Data Science">Data Science</Select.Option>
                <Select.Option value="Cyber Security">Cyber Security</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item name="level" label="Level:"
            rules={[
            {
                required: true,
                message: 'Please input a level!',
            }, 
            ]}>
            
                <Select placeholder="Level">
                    <Select.Option value="Beginner">Beginner</Select.Option>
                    <Select.Option value="Intermediate">Intermediate</Select.Option>
                    <Select.Option value="Advanced">Advanced</Select.Option>
                </Select>
            </Form.Item>


            <Form.List name="topics"
            rules={[
            {
                required: true,
                message: 'Please at least one topic!',
            }, 
            ]}>
    
        {(fields, { add, remove }) => (
            <>
                {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                    {...field}
                    name={[field.name, 'title']}
                    fieldKey={[field.fieldKey, 'title']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                    >
                    <Input placeholder="Title" />
                    </Form.Item>

                    <Form.Item
                    {...field}
                    name={[field.name, 'objective']}
                    fieldKey={[field.fieldKey, 'objective']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                    >
                    <Input.TextArea placeholder="Objective" />
                    </Form.Item>

                    <Form.Item
                    {...field}
                    name={[field.name, 'duration']}
                    fieldKey={[field.fieldKey, 'duration']}
                    rules={[{ required: true, message: 'Missing title' }]}
                    >
                    <Input placeholder="Duration" />
                    </Form.Item>


                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
            ))}

                <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Topic
                </Button>
                </Form.Item>
            </>
            )}
        </Form.List>

                <Button type="primary" block htmlType="submit">
                Create
                </Button>

            </Form>
            </Col>
        </Row>
        
        </div>
        </LayoutDash>

    )
}

export default CreatePath 