"use client";

import React, { useState } from "react";

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
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
      />
      <input
        type="text"
        name="github_link"
        placeholder="GitHub Link"
        onChange={handleChange}
      />
      <input
        type="text"
        name="linkedin_link"
        placeholder="LinkedIn Link"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Create User</button>
    </form>
  );
}
