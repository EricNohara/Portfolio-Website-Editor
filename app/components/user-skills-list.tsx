"use client";
import React from "react";
import useSWR, { mutate } from "swr";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const getSkillsFetcher = async () => {
  try {
    const token: string | null = localStorage.getItem("token");

    const res = await fetch("/api/skill", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(`Error: ${data.message}`);
    }

    return data.skills;
  } catch (err) {
    console.error(err);
  }
};

const deleteSkillFetcher = async (skillName: string) => {
  try {
    const token: string | null = localStorage.getItem("token");

    const res = await fetch(`/api/skill/${skillName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(`Error: ${data.message}`);
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export default function UserSkillsList() {
  const { data: skills, error } = useSWR("/api/skill", getSkillsFetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!skills)
    return (
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );

  const handleDeleteSkill = async (skillName: string) => {
    try {
      await deleteSkillFetcher(skillName);
      mutate("/api/skill"); // used to update the fetched data by useSWR
    } catch (err) {
      console.error("Failed to delete skill:", err);
    }
  };

  return (
    <List>
      {skills.map((skill: string, index: number) => (
        <ListItem key={index}>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <ListItemText>{skill}</ListItemText>
            <ListItemButton onClick={() => handleDeleteSkill(skill)}>
              <DeleteIcon />
            </ListItemButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
