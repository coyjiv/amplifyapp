import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

export const TodoCard = ({ heading, content, deleteTodo }) => {
  return (
    <Card
      sx={{
        width: 275,
        height: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        background: `linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)
        `,
      }}
    >
      <CardContent sx={{ height: "100px", paddingBottom: 0 }}>
        <Typography
          sx={{ fontSize: 18, color: "white" }}
          color="text.secondary"
          gutterBottom
        >
          {heading}
        </Typography>

        <p
          variant="body2"
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "120px",
            overflowY: "auto",
            padding: "4px",
            wordBreak: "break-word",
          }}
        >
          {content}
        </p>
      </CardContent>
      <CardActions>
        <Button
          sx={{ marginBottom: "10px" }}
          variant="contained"
          onClick={deleteTodo}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
