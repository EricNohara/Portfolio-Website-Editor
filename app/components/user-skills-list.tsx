"use client";
import React, { useState } from "react";
import useSWR from "swr";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const fetcher = async (url: string) => {
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

export default function UserSkillsList() {
  const { data: skills, error } = useSWR("/api/skill", fetcher);

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
            <ListItemButton>
              <DeleteIcon />
            </ListItemButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
