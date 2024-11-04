import { Container, Typography } from "@mui/material";
import CreateSkillForm from "../../components/create-skill-form";
import React from "react";

export default function AddSkillPage() {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="mt-10 text-center"
      >
        Add Skill
      </Typography>
      <CreateSkillForm />
    </Container>
  );
}
