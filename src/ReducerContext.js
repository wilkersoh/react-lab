import React, { useReducer, createContext, useState, useContext } from "react";

import Container from "./components/Container";
import { Button, Typography } from "@material-ui/core";

const FormContext = createContext();

const initialState = { todos: [], todoCount: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [...state.todos, { text: action.payload, completed: false }],
        /**
         * 可以 handle 很多個state 比useState 方便
         */
        todoCount: state.todoCount + 1,
      };
    case "toggle-todo":
      return {
        todos: state.todos.map((todo, id) =>
          id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
        todoCount: state.todoCount,
      };
    case "reset":
      const resetResult = state.todos.map((todo) => {
        return { ...todo, completed: false };
      });

      return { todos: resetResult, todoCount: state.todoCount };
    default:
      return state;
  }
}

export default function ReducerContext() {
  const [{ todos, todoCount }, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "add-todo", payload: text });
    setText("");
  };

  return (
    <Container>
      <FormContext.Provider value={{ textDispatch: dispatch }}>
        <form onSubmit={onFormSubmit}>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </form>
        <p>number of todos: {todoCount}</p>
        {todos.map((todo, idx) => {
          return (
            <p
              onClick={() => dispatch({ type: "toggle-todo", payload: idx })}
              key={idx}
              style={{ textDecoration: todo.completed ? "line-through" : "" }}>
              {todo.text}
            </p>
          );
        })}
        <ComponentA />
      </FormContext.Provider>
    </Container>
  );
}

const ComponentA = () => {
  const formCountext = useContext(FormContext);

  const onClickReset = () => {
    formCountext.textDispatch({ type: "reset" });
  };

  return (
    <>
      <Typography variant='h5' component={"h2"}>
        Component A, From other component to change reducer state,
        需要注意的事，useReducer with useContext 和redux還是有差別的，useContext
        data更新了，它會re-render全部 相關 context的component，而redux不會
      </Typography>
      <Button onClick={onClickReset} variant='contained'>
        Reset todo
      </Button>
    </>
  );
};
