import "./Task.css"
import { useEffect, useState } from 'react'
import { Button, Divider } from '@mui/material'
import {Modal, Input, message, Tag, Select, Tooltip, Empty} from 'antd';
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
	const [currentPriority, setCurrentPriority] = useState("All")
	const [lowPriorityTasks, setLowPriorityTasks] = useState([])
	const [mediumPriorityTasks, setMediumPriorityTasks] = useState([])
	const [highPriorityTasks, setHighPriorityTasks] = useState([])
	const [currentTask, setcurrentTask] = useState([])
	const [filteredTask, setFilteredTask] = useState([])
	const [searchQuery, setSearchQuery] = useState("");

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

	useEffect(() => {
			const lowPriorityTasks = tasks.filter(task => task.priority === "Low")
			const mediumPriorityTasks = tasks.filter(task => task.priority === "Medium")
			const highPriorityTasks = tasks.filter(task => task.priority === "High")
			setLowPriorityTasks(lowPriorityTasks)
			setMediumPriorityTasks(mediumPriorityTasks)
			setHighPriorityTasks(highPriorityTasks)
			if (currentTask === "Low") {
				setcurrentTask(lowPriorityTasks)
			}
			else if (currentTask === "Medium") {
				setcurrentTask(mediumPriorityTasks)
			}
			else if (currentTask === "High") {
				setcurrentTask(highPriorityTasks)
			}
			else {
				setcurrentTask(tasks)
			}
	}, [tasks])

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
	
	const handlePriority = (value) => {
		setCurrentPriority(value)
		
		if (value === "All") {
			setcurrentTask(tasks)
		}
		else if (value === "Low") {
			setcurrentTask(lowPriorityTasks)
		}
		else if (value === "Medium") {
			setcurrentTask(mediumPriorityTasks)
		}
		else if (value === "High") {
			setcurrentTask(highPriorityTasks)
		}
	}

	const handleSearch = (e) => {
		let query = e.target.value
		setSearchQuery(query)
		let filteredList = tasks.filter((item) => item.title.toLowerCase().match(query.toLowerCase()));
		if (filteredList.length > 0 && query) {
			setFilteredTask(filteredList)
		} else {
			setFilteredTask([])
		}

	}
	return (
		<>
			<section className="wrapper">
				<div className="header">
				<h2>Your tasks</h2>
					<div className="task-input">
						<Input type="text" placeholder="Search your task" 
									onChange={handleSearch}
									style={{width: '50%'}}/>
							<Button onClick={() => setIsAddingTask(true)} type = 'primary' variant ="contained" color="success" > Add new task</Button>
							<Select
								value={currentPriority}
								style={{ width: 180 }}
								onChange={handlePriority}
								options = {[
									{label: "All", value: "All"},
									{label: "Low", value: "Low"},
									{label: "Medium", value: "Medium"},
									{label: "High", value: "High"}
								]}
							/>
					
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
							<Select value={priority} style={{ width: "100%" }} onChange={(value) => setPriority(value)}

								// {/* <Option value="All">All</Option>
								// <Option value="Low">Low</Option>
								// <Option value="Medium">Medium</Option>
								// <Option value="High">High</Option> */}
								options={[
									  // Default option to show all tasks
													{ label: "Low", value: "Low" },
													{ label: "Medium", value: "Medium" },
													{ label: "High", value: "High" }
								]}
							/>  
						
					</Modal>

			

			{/* Display all cards of above input task */}
				<div className="task-container">
					{ filteredTask.length > 0 || searchQuery ? filteredTask.map( (task) => {
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
					)}) : currentTask.length > 0  ? currentTask.map( (task) => {
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
					)}) : 
							<Empty/>
					}
					</div>



							<Modal confirmLoading={loading} title={`Update ${currentEditItem.title}`} open={isEditing} onOk={handleUpdateTask} onCancel={()=>setIsEditing(false)}>
								<Input style={{marginBottom:'1rem'}} placeholder='Updated Title' value={updatedTitle} onChange={(e)=>setUpdatedTitle(e.target.value)} />
								<Input.TextArea style={{marginBottom:'1rem'}} placeholder='Updated Description' value={updatedDescription} onChange={(e)=>setUpdatedDescription(e.target.value)} />
								<Select
									onChange={(value)=>setUpdatedStatus(value)}
									value={updatedStatus}
								>
								<Option value="Low">Low</Option>
								<Option value="Medium">Medium</Option>
    						<Option value="High">High</Option>
							</Select>
     		 			</Modal>
				
				</section>
		</>
			
	)
}

export default Task