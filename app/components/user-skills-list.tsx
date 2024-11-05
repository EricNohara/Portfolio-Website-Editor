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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const ListItemGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 80% 10% 10%;
  border-bottom: 2px solid black;
  border-radius: 2px;
  align-items: center;
`;

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

    if (!res.ok) alert(`Error: ${data.message}`);
  } catch (err) {
    console.error(err);
  }
};

export default function UserSkillsList() {
  const { data: skills, error } = useSWR("/api/skill", getSkillsFetcher);
  const router = useRouter();

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

  const handleDelete = async (skillName: string) => {
    try {
      await deleteSkillFetcher(skillName);
      mutate("/api/skill"); // used to update the fetched data by useSWR
    } catch (err) {
      console.error("Failed to delete skill:", err);
    }
  };

  const handleEdit = (skill: string) => {
    router.push(`/skills/editSkill/${skill}`); // Redirect to edit route
  };

  return (
    <List>
      {skills.map((skill: string, index: number) => (
        <ListItem key={index} disablePadding>
          <ListItemGrid>
            <ListItemText>{skill}</ListItemText>
            <ListItemButton
              sx={{ justifySelf: "center" }}
              onClick={() => handleEdit(skill)}
            >
              <EditRoundedIcon sx={{ color: "blue" }} />
            </ListItemButton>
            <ListItemButton
              sx={{ justifySelf: "center" }}
              onClick={() => handleDelete(skill)}
            >
              <DeleteIcon sx={{ color: "red" }} />
            </ListItemButton>
          </ListItemGrid>
        </ListItem>
      ))}
    </List>
  );
}
