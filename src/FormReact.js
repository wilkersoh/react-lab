import React from "react";
import { useForm } from "react-hook-form";

import Container from "./components/Container";
import { Input, InputLabel, FormControl } from "@material-ui/core";

// use ref in form
export default function FormReact() {
  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <Container>
      <FormControl>
        <InputLabel htmlFor='my-input'>Email address</InputLabel>
        <Input id='my-input' aria-describedby='my-helper-text' />
      </FormControl>
    </Container>
  );
}
