import React, { Fragment, useState } from 'react';
import './assets/css/global-styles.css';

export default function () {
  // Associated data.
  const initialTodos = [
    {
      id: 1,
      text: 'Netepan dhuha',
      done: false,
    },
    {
      id: 2,
      text: 'Meser cabe ka warung',
      done: false,
    },
    {
      id: 3,
      text: 'Icalan tahu buleud',
      done: false,
    },
    {
      id: 4,
      text: 'Ngaos ka madrasah',
      done: false,
    },
    {
      id: 5,
      text: 'Ngadamel peer sakola',
      done: false,
    },
  ];
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');
  const [isToggledAll, setIsToggledAll] = useState(false);

  // Type for single todo.
  type Todo = Readonly<{
    id: number;
    text: string;
    done: boolean;
  }>;

  // Override the done property of Todo.
  type NewTodo = Todo & { id: number; readonly done: false };
  // type CompletedTodo = Todo & { readonly done: true };

  const addTodo = function (): void {
    const createdTodo = createTodo();
    const updatedTodos = updateTodos(createdTodo);
    const sortedTodos = sortTodos(updatedTodos);
    setTodos(sortedTodos);
  };

  // Takes id of selected todo and filter out todos
  // of selected todo.
  const removeTodo = function (id: Todo['id']): void {
    const filteredTodos = filterTodos(id);
    setTodos(filteredTodos);
  };

  // Takes a single todo object and update its "done" property
  // with the opposite bolean value and "setTodos"
  // with a new array of todo objects containing updated todo.
  const toggleTodo = function (todo: Todo): void {
    const updatedTodo = updateTodo(todo);
    const updatedTodos = updateTodos(updatedTodo);
    const sortedTodos = sortTodos(updatedTodos);
    setTodos(sortedTodos);
  };

  // Takes array of todo objects and "setTodos"
  // with new todo objects where "done" is all true.
  const toggleTodos = function (todos: Todo[]): void {
    const toggledAll = toggleAll(todos);
    setTodos(toggledAll);
    setIsToggledAll(!isToggledAll);
  };

  // Helper functions to filter and sort todos.
  const filterTodos = (id: Todo['id']): Todo[] => todos.filter(todo => todo.id !== id);
  const sortTodos = (todos: Todo[]): Todo[] => todos.sort((a, b) => a.id - b.id);

  const createTodo = function (): NewTodo {
    const ids = todos.map(todo => todo.id);
    const id = Math.max(...ids) + 1;

    return {
      id,
      text: newTodoText,
      done: false,
    };
  };

  // Takes a single todo object and returns
  // a new todo object containing the opposite
  // boolean value for the "done" property.
  const updateTodo = function (todo: Todo): Todo {
    return {
      id: todo.id,
      text: todo.text,
      done: !todo.done,
    };
  };

  // Takes a single updated todo object and returns
  // a new array of todo objects.
  const updateTodos = function (updatedTodo: Todo): Todo[] {
    const filteredTodos = filterTodos(updatedTodo.id);
    const joinedTodos = [...filteredTodos, updatedTodo];
    return joinedTodos;
  };

  // Takes an array of todo items and returns
  // a new array where "done" is all true.
  const toggleAll = function (todos: readonly Todo[]): Todo[] {
    const toggledAll = todos.map(todo => {
      const done = isToggledAll ? true : false;
      return { ...todo, done: !done };
    });
    return toggledAll;
  };

  const handleSubmit = function (event: any) {
    event.preventDefault();
    setNewTodoText('');
  };

  const handleChange = function (event: any) {
    setNewTodoText(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div>
            <form onSubmit={event => handleSubmit(event)}>
              <input type="text" value={newTodoText} onChange={event => handleChange(event)} />
              <button onClick={() => addTodo()}>Tambih</button>
            </form>
            <br />
            {todos.map(todo => (
              <Fragment key={todo.id}>
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                  checked={todo.done}
                  onChange={() => toggleTodo(todo)}
                />
                <label htmlFor={`${todo.id}`}>{todo.text}</label>
                <button onClick={() => removeTodo(todo.id)}>
                  <span role="img" aria-label="Remove">
                    ❌
                  </span>
                </button>
                <br />
              </Fragment>
            ))}
            <button onClick={() => toggleTodos(todos)}>
              {isToggledAll ? 'Hapus tanda sadayana' : 'Tandaan sadayana'}
            </button>
          </div>
        </div>
        <div className="col-6">
          <pre>
            <code>{JSON.stringify(todos, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
