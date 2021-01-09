import React, { Fragment, useState } from 'react';

const App = function () {
  // Associated data.
  const initialTodos = [
    {
      id: 1,
      text: 'Do laundry',
      done: false,
      // place: 'home',
    },
    {
      id: 2,
      text: 'Email boss',
      done: false,
      // place: 'work',
    },
    {
      id: 3,
      text: 'Go to gym',
      done: false,
      // place: { custom: 'Gym' },
    },
    {
      id: 4,
      text: 'Buy milk',
      done: false,
      // place: { custom: 'Supermarket' },
    },
    { id: 5, text: 'Read a book', done: false },
  ];
  const [todos, setTodos] = useState(initialTodos);

  type Place = 'home' | 'work' | { custom: string };

  type Todo = Readonly<{
    id: number;
    text: string;
    done: boolean;
    // place is optional
    // place?: Place;
  }>;

  // Override the done property of Todo
  type CompletedTodo = Todo & {
    readonly done: true;
  };

  // Takes a Place and returns a string
  // that can be used for the place label UI
  const placeToString = function (place: Place): string {
    if (place === 'home') {
      return '🏡Home';
    } else if (place === 'work') {
      return '🏢 Work';
    } else {
      // place is guaranteed to be { custom: string }
      return '📍' + place.custom;
    }
  };

  // Takes an array of todo items and returns
  // a new array where "done" is all true
  const completeTodos = function (todos: readonly Todo[]): CompletedTodo[] {
    return todos.map(todo => ({
      ...todo,
      done: true,
    }));
  };

  // Takes a single todo object and returns
  // a new todo object containing the opposite
  // boolean value for the "done" proprty.
  const updateTodo = function (todo: Todo): Todo {
    return {
      id: todo.id,
      text: todo.text,
      done: !todo.done,
    };
  };

  const updateTodos = function (todo: Todo, updatedTodo: Todo): Todo[] {
    return [
      ...todos.slice(0, todo.id - 1),
      updatedTodo,
      ...todos.slice(todo.id),
    ];
  };

  const toggleTodo = function (todo: Todo): void {
    const updatedTodo = updateTodo(todo);
    const updatedTodos = updateTodos(todo, updatedTodo);
    setTodos(updatedTodos);
  };

  const toggleTodos = function (todos: Todo[]): void {
    const completedTodos = completeTodos(todos);
    setTodos(completedTodos);
  };

  return (
    <div>
      {todos.map(todo => (
        <Fragment key={todo.id}>
          <input
            type="checkbox"
            id={`${todo.id}`}
            checked={todo.done}
            onChange={() => toggleTodo(todo)}
          />
          <label htmlFor={`${todo.id}`}>{todo.text}</label>
          <br />
        </Fragment>
      ))}
      <button onClick={() => toggleTodos(todos)}>Mark all as completed</button>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
};

export default App;
