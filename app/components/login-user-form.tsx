"use client";

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

export default function LoginUserForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <TextField
        label="email"
        name="email"
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="password"
        name="password"
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="mt-10"
      >
        Sign In
      </Button>
    </form>
  );
}
