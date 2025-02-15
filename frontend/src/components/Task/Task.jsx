import "./Task.css"
import { useEffect, useState } from 'react'
import { Button, Divider } from '@mui/material'
import {Modal, Input, message, Tag, Select, Tooltip} from 'antd';
import toDoServices from "../../services/toDoServices";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const { Option } = Select;
const Task = () => {


	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [priority, setPriority] = useState("Low")
	const [isAddingTask, setIsAddingTask] = useState(false)
	const [loading, setLoading] = useState(false)
	const [tasks, setTasks] = useState([])

	//get all tasks
	useEffect(() => {
		
		const getAllTasks = async () => {
			try {
				const response = await toDoServices.getTask()
				console.log(response.data)
				setTasks(response.data)
			}
			catch(err) {
					console.log(err)
					message.error('Failed to fetch tasks')
			
				}
		}
		getAllTasks()
	}, [])

	const handleSubmitTask = async () => {
		setLoading(true)
		try {
			//take createAt from the server
			const data = {
				title,
				description,
				priority,
				createdAt: new Date()
			}
			
			const response = await toDoServices.createTask(data)
			console.log(response.data)
			//update the state
			setTasks([...tasks, response.data])
			setLoading(false)
			message.success('Task added successfully')
			setIsAddingTask(false)
			setTitle('');
			setDescription('');
			setPriority('Low');
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
					<div className="task-input">
						<input type="text" placeholder="Search your task"
									style={{width: '50%'}}/>
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
							<Select value={priority} style={{ width: "100%" }} onChange={(value) => setPriority(value)}>
								<Option value="Low">Low</Option>
								<Option value="Medium">Medium</Option>
								<Option value="High">High</Option>
							</Select>  
						
					</Modal>

			</section>

			{/* Display all cards of above input task */}
				<div>
					{tasks.map( (task) => {
						return (
							<div key={task._id}  className="task-card">
								<h2>{task.title}</h2>
								<p>{task.description}</p>
								<Tag color = {task.priority === "High" ? "red" : task.priority === "Medium" ? "orange": "green"}>
									{task.priority}
								</Tag>
								<Tag>{new Date(task.createdAt).toLocaleString() }</Tag>
								<div className="task-actions">
									<Tooltip title="Edit Task"><></> Edit</Tooltip>
									<Tooltip title="Delete Task">Delete</Tooltip>
								</div>
							</div>
					)})}

				</div>
		</>
			
	)
}

export default Task