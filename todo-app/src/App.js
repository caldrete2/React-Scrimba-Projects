import React from 'react'
import TodoItem from './TodoItem'
import './App.css'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todoList: [],
			todo: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleCheck(id) {
        this.setState(pState => {
            const updatedTodos = pState.todoList.map(e => {
                if (e.id === id) {
                    e.completed = !e.completed
                }
                return e
            })
            return {
                todoList: updatedTodos
            }
        })
    }

	handleChange(event) {
		const{value, name} = event.target
		this.setState({ [name]: value })
	}

	handleSubmit(event) {
		event.preventDefault()
		const{todo, todoList} = this.state
		let obj = {}
		obj.id = todoList.length + 1
		obj.text = todo
		obj.completed = false
		
		const list = todoList.concat(obj)
		this.setState({
			todoList: list,
			todo: ''
		})
	}
    
    render() {
		const{todoList} = this.state
        const todoItems = todoList.map((elem, i) => {
			return (
				<TodoItem 
					key={i}
					item={elem}
					handleCheck={this.handleCheck}
				/>
			)
		})

        return (
            <div className='todo-list'>
          		{todoItems} 
				<div>
					<input 
						type='text'
						name='todo'
						value={this.state.todo}
						onChange={this.handleChange}
					/>
					<button onClick={this.handleSubmit}>Add</button>
				</div>
            </div>
        )    
    }
}

export default App
