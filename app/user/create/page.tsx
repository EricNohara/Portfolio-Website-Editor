import CreateUserForm from "../../components/create-user-form";
import { Typography, Container } from "@mui/material";
import React from "react";

export default function CreateUserPage() {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="mt-10 text-center"
      >
        Create New User
      </Typography>
      <CreateUserForm />
    </Container>
  );
}
