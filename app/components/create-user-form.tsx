"use client";

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

export default function CreateUserForm() {
  const [userData, setUserData] = useState({
    name: "",
    phone_number: "",
    email: "",
    location: "",
    github_link: "",
    linkedin_link: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: Response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <TextField
        label="Email"
        name="email"
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
      />
      <TextField
        label="Password"
        name="password"
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
        type="password"
      />
      <TextField
        label="Full Name"
        name="name"
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
      />
      <TextField
        label="Phone number"
        name="phone_number"
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
      />
      <TextField
        label="Address"
        name="location"
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="GitHub Link"
        name="github_link"
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="LinkedIn Link"
        name="linkedin_link"
        onChange={handleChange}
        fullWidth
        margin="dense"
        className="mb-5"
      />
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
  );
}
