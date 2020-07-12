import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { axiosApiConnect } from './api/request';
import FormInput from './components/views/InputForm';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      todos: {},
      task: ""
    }
  }

  // Initially Load todos and add to state
  componentDidMount() {
    axiosApiConnect.get('/todo')
      .then(res => {
        const todos = res.data;
        this.setState({ todos })
      })
  }

  // Update DOM with changes to state
  componentDidUpdate() {
    axiosApiConnect.get('/todo')
      .then(res => {
        const todos = res.data;
        this.setState({ todos })
      })
  }

  // Get ToDo input value
  handleInputChange =  (event) => {
    this.setState({task: event.target.value});
  }

  // Handle the creation
  // of a ToDo
  handleTodoSubmit = (event) => {
    event.preventDefault();

    axiosApiConnect.post('/todo', {
      body: this.state.task,
      done: false
      })
      .then(res => {
          if (res.status === 201) {
            toast.success('Todo created');
            this.setState({task: ''});
          }
      })
      .catch(error => {
        if (error.response.status === 400) {
          toast.error('Empty input, Todo not created');
        }
      })
  }

  // Handle the closing
  // of a todo
  handleTodoClose = (event, data) => {
    event.preventDefault();

    axiosApiConnect.put(`/todo/${data}`, {
      'done': true
    })
    .then(res => {
      if (res.status === 200){
        toast.success('Todo marked as complete');
      }
    })
  }

  render() {
    return (
      <div className="container">
          <FormInput
            state={this.state}
            handleInputChange={this.handleInputChange}
            handleTodoSubmit={this.handleTodoSubmit}
            handleTodoClose={this.handleTodoClose}
          />
      </div>
    )
  }
}

export default App;
