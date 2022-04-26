import React, { useState, useEffect } from "react";
import "./App.css";
import { API } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { TextField, Button, Stack } from "@mui/material";
import {
  createTodo as createNoteMutation,
  deleteTodo as deleteNoteMutation,
} from "./graphql/mutations";
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from "./models";
import { TodoCard } from "./components/Todo/Todo";

const initialFormState = { name: "", description: "" };

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const data = async () => {
      const res = await DataStore.query(Todo);
      console.log(res);
      setNotes(res);
    };
    data();
  }, []);

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });
    setNotes([...notes, formData]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    const modelToDelete = await DataStore.query(Todo, id);
    DataStore.delete(modelToDelete);
  }

  return (
    <div className="App">
      <h1 style={{ color: "white" }}>DANILA TODO</h1>
      <Stack spacing={2} sx={{ width: "40%", margin: "0px auto" }}>
        <TextField
          id="outlined-basic"
          label="Note name"
          variant="outlined"
          color="secondary"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
        />
        <TextField
          id="outlined-basic"
          label="Note description"
          variant="outlined"
          multiline={true}
          rows={3}
          color="secondary"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
        />
        <Button variant="contained" onClick={createNote}>
          Create Note
        </Button>
      </Stack>
      <div
        style={{
          marginTop: 50,
          padding: "0px 20px",
          marginBottom: 30,
          display: "flex",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {notes ? (
          notes.map((note) => (
            <TodoCard
              key={note.id || note.name}
              heading={note.name}
              content={note.description}
              deleteTodo={() => deleteNote(note)}
            />
          ))
        ) : (
          <h1>You need to create a to-do first!</h1>
        )}
      </div>
      <div style={{ width: "35%", margin: "0 auto", marginBottom: "50px" }}>
        <AmplifySignOut />
      </div>
    </div>
  );
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
  },
});
