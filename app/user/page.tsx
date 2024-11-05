import ShowUserList from "../components/show-user-list";
import React from "react";
import { Container, Typography } from "@mui/material";

export default function UserPage() {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="mt-10 text-center"
      >
        User Info
      </Typography>
      <ShowUserList />
    </Container>
  );
}
