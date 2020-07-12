import React from 'react';
import { ToastContainer } from 'react-toastify';

const FormInput = (props) => {
  const {
    state,
    handleInputChange,
    handleTodoSubmit,
    handleTodoClose
  } = props;

  let todos = state.todos;

  // Check if todos is empty
  if (todos === 'undifined') {
    return todos=false
  }

    return (
      <div>
        <form>
          <input
            autoComplete="off"
            type="text"
            id="input_field"
            name="task"
            value={state.task}
            placeholder="Input task"
            onChange={handleInputChange}
          />
          <button
            onClick={handleTodoSubmit}
            className="buttons"
            id="submit">
              Create Task
          </button>
          <ToastContainer />
        </form>

        <div>
          <div className="task_list">
            List of Tasks
          </div>

          <div className='tasks'>
            {!todos ? <h4 className="task_list">Create to ToDo Above</h4> :
              <div>
                {Object.keys(todos).map(
                key => <ul key={key}>
                  <div id="task">
                    {!todos[key]['done'] ?
                      <button type="submit" onClick={e=>handleTodoClose(e, key)} className="buttons" id="task_button">Open</button> :
                      <button type="submit" className="task_button_disabled" id="task_button">Closed</button>
                    }
                    {!todos[key]['done'] ?
                      <div id="task_text">{todos[key]['body']}</div> :
                      <div id="task_text_disabled">{todos[key]['body']}</div>
                    }
                  </div>
                </ul>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    );
}

export default FormInput;
