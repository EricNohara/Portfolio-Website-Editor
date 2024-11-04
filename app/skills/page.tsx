import UserSkillsList from "../components/user-skills-list";
import { Container, Typography } from "@mui/material";
import React from "react";

export default function DisplayAllSkillsPage() {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="mt-10 text-center"
      >
        User Skills
      </Typography>
      <UserSkillsList />
    </Container>
  );
}
