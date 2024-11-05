"use client";

import { Container, Typography } from "@mui/material";
import React from "react";
import EditSkillForm from "../../../components/edit-skill-form";
import { useParams } from "next/navigation";

export default function DisplayAllSkillsPage() {
  const params = useParams();
  const skillName: string = params.skillName as string;

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="mt-10 text-center"
      >
        Edit Skill
      </Typography>
      <EditSkillForm skillName={skillName} />
    </Container>
  );
}
