"use client";
import React from "react";
import useSWR from "swr";
import { CircularProgress, Box, Typography } from "@mui/material";
import UserSchema from "../interfaces/UserSchema";
import styled from "styled-components";

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const getUserInfoFetcher = async () => {
  try {
    const token: string | null = localStorage.getItem("token");

    const res = await fetch("/api/user", {
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

    return data as UserSchema;
  } catch (err) {
    console.error(err);
  }
};

export default function ShowUserList() {
  const { data, error } = useSWR("/api/user", getUserInfoFetcher);

  if (error) return <div>Error loading user information.</div>;
  if (!data) {
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
  }

  return (
    <Box>
      <Typography
        variant="h5"
        component="h3"
        gutterBottom
        color="text-secondary"
        className="mt-10 text-center"
      >
        {data.name}
      </Typography>
      <InfoGrid>
        <Typography variant="body1">
          <strong>Phone Number:</strong> {data.phone_number}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {data.email}
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> {data.location}
        </Typography>
        <Typography variant="body1">
          <strong>GitHub:</strong>{" "}
          {data.github_link ? (
            <a
              href={data.github_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.github_link}
            </a>
          ) : (
            <span>N/A</span>
          )}
        </Typography>
        <Typography variant="body1">
          <strong>LinkedIn:</strong>{" "}
          {data.linkedin_link ? (
            <a
              href={data.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.linkedin_link}
            </a>
          ) : (
            <span>N/A</span>
          )}
        </Typography>
      </InfoGrid>
    </Box>
  );
}
