import React, { useReducer } from "react";

import TextField from "@material-ui/core/TextField";
import Container from "./components/Container";
import { Button, Box } from "@material-ui/core";

/**
  用 useReducer的思考方式 和state有點不同了
  比較整齊 過後也比較好maintian
  我們開發時 反而注重call dispatch後 它會處理什麼發生什麼事情
  然後 這些行為 都在 reducer 裡的 switch裡面確定
*/
const initialState = {
  firstname: "",
  password: "",
  error: "",
  isLoading: false,
  isLoggedIn: false,
};
const loginReducer = (state, action) => {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "login":
      return {
        ...state,
        isLoading: true,
      };
    case "success":
      return {
        ...state,
        isLoggedIn: true,
        firstname: "",
        password: "",
      };
    case "error":
      return {
        ...state,
        error: "Please enter again",
        isLoading: false,
        firstname: "",
        password: "",
      };
    default:
      return state;
  }
};

const loginUser = async ({ firstname, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (firstname === "laoyeche" && password === "password") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
};

export default function ReducerBenefit() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  console.log("state :>> ", state);
  const { firstname, password, error, isLoading, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });

    try {
      await loginUser({ firstname, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  const onInputChange = (e) => {
    dispatch({
      type: "field",
      field: e.target.name,
      value: e.target.value,
    });
  };

  if (isLoggedIn) {
    return (
      <Container>
        <Box>Hi {firstname}</Box>
      </Container>
    );
  }

  return (
    <Container>
      <form onSubmit={onSubmit} autoComplete='off'>
        {error && (
          <Box mb={2} color='red'>
            {error}
          </Box>
        )}
        <TextField
          required
          type='text'
          label='First Name'
          name='firstname'
          variant='outlined'
          size='small'
          value={firstname}
          onChange={onInputChange}
        />
        <TextField
          required
          name='password'
          type='password'
          label='Password'
          variant='outlined'
          size='small'
          value={password}
          onChange={onInputChange}
        />
        <Button type='submit' variant='outlined' color='secondary'>
          Submit
        </Button>
      </form>
    </Container>
  );
}
