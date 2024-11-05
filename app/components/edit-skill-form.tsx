import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

export default function EditSkillForm(params: { skillName: string }) {
  const [skill, setSkill] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token: string | null = localStorage.getItem("token");

      const res = await fetch(`/api/skill/${params.skillName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skill: skill }),
      });

      const data = await res.json();

      if (!res.ok) alert(`Error: ${data.message}`);
      else alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <TextField
        label="Skill"
        name="skill"
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
    </form>
  );
}
