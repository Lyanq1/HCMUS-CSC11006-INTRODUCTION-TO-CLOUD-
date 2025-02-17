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
	const [currentEditItem, setCurrentEditItem] = useState("")
	const [isEditing, setIsEditing] = useState(false)
	const [updatedTitle, setUpdatedTitle] = useState("")
	const [updatedDescription, setUpdatedDescription] = useState("")
	const [updatedStatus, setUpdatedStatus] = useState("")

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
			getAllTasks()
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

	const handleEdit = (task) => {
		setCurrentEditItem(task)
		setUpdatedTitle(task.title)
		setUpdatedDescription(task.description)
		setUpdatedStatus(task.priority)
		setIsEditing(true)
	}


	const handleUpdateTask = async () => {
		try {
			setLoading(true)
			const data =  {
				title: updatedTitle,
				description: updatedDescription,
				priority: updatedStatus
			}
			const response = await toDoServices.updateTask(currentEditItem._id, data)
			console.log(response.data)
			message.success(`${currentEditItem.title} updated successfully`)
			setLoading(false)
			setIsEditing(false)
			getAllTasks()
		} catch (err)
		{
			console.log(err)
			setLoading(false)
			message.error('Failed to update task')
		}
	}

	const handleDeleteTask = async (task) => {
		try {
			const response = await toDoServices.deleteTask(task._id)
			console.log(response.data)
			message.success(`${task.title} deleted successfully`)
			getAllTasks()
		} catch (err) {
			console.log(err)
			message.error('Failed to delete task')

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
				<div className="task-container">
					{tasks.map( (task) => {
						return (
							<div key={task._id}  className="task-card">
								<div className="task-status">
								<h2>{task.title}</h2>
								<Tag color = {task.priority === "High" ? "red" : task.priority === "Medium" ? "orange": "green"}>
									{task.priority}
								</Tag>
								</div>
								<p className="description" >{task.description}</p>
								<Divider />

								<div className="task-footer">
									<Tag>{new Date(task.createdAt).toLocaleString() }</Tag>
									<div className="task-actions">
										<Tooltip title="Edit Task"> <EditOutlined onClick={() => handleEdit(task)} label="Edit"/> Edit</Tooltip>
										<Tooltip title="Delete Task"> <DeleteOutlined onClick={() => handleDeleteTask(task)} style={{color:'red'}} />Delete</Tooltip>
									</div>
								</div>
							</div>
					)})}
							<Modal confirmLoading={loading} title={`Update ${currentEditItem.title}`} open={isEditing} onOk={handleUpdateTask} onCancel={()=>setIsEditing(false)}>
								<Input style={{marginBottom:'1rem'}} placeholder='Updated Title' value={updatedTitle} onChange={(e)=>setUpdatedTitle(e.target.value)} />
								<Input.TextArea style={{marginBottom:'1rem'}} placeholder='Updated Description' value={updatedDescription} onChange={(e)=>setUpdatedDescription(e.target.value)} />
								<Select
							onChange={(value)=>setUpdatedStatus(value)}
							value={updatedStatus}
							options={[
								
								{
									
									label: 'Easy',
								},

								{
									label: 'Medium',
								},
								{
									label: 'High',
								}
								]}
							/>
     		 			</Modal>
				</div>
		</>
			
	)
}

export default Task