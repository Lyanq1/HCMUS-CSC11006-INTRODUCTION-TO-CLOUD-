import "./Task.css"
import { useState } from 'react'
import { Button, Divider } from '@mui/material'
import {Modal, Input, message} from 'antd';

const Task = () => {


	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [isAddingTask, setIsAddingTask] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleSubmitTask = async () => {
		setLoading(true)
		try {
			const data = {
				title,
				description,
				isCompleted: false,
			}
			console.log(data)
			// const response = await ToDoServices.createToDo(data)
			//console.log(response.data)
			setLoading(false)
			message.success('Task added successfully')
			setIsAddingTask(false)
		}
		catch(err) {
			console.log(err)
			setLoading(false)
			message.error('Failed to add task')
		}
	}
	return (
		<>
			<section className="wrapper">
				<div className="header">
				<h2>Your tasks</h2>
					<input type="text" placeholder="Enter your task"
								 style={{width: '50%'}}/>
					<div>
						<Button onClick={() => setIsAddingTask(true)} type = 'primary' variant ="contained" color="success" > Add new task</Button>
					</div>
				</div>
				<Divider />

				 {/* Adding modal when click on button above */}
				 <Modal confirmLoading={loading} title= "Add new task" open={isAddingTask} onOk={handleSubmitTask} onCancel={() => setIsAddingTask(false)}> 
						 <Input 
									 style={{marginBottom: '1rem'}} 
									 placeholder="Title" 
									 value={title} 
									 onChange={e => setTitle(e.target.value)} />
						 <Input.TextArea  placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
					  </Modal>

			</section>
				
		</>
			
	)
}

export default Task