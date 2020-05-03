import React from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/core";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const CREATE_SESSION = gql`
  mutation createSession($title: String) {
    insert_sessions(objects: { title: $title }) {
      affected_rows
      returning {
        id
        title
        uid
        created_at
      }
    }
  }
`;

export const NewSessionForm = () => {
  let history = useHistory();
  const [title, setTitle] = React.useState("");
  const [createSession, { error, loading }] = useMutation<any>(CREATE_SESSION, {
    onCompleted: (response) => onMutationCompleted(response),
  });

  const onMutationCompleted = (response: any) => {
    const uid = response.insert_sessions.returning[0].uid;
    history.push(`/session/${uid}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createSession({
      variables: { title },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {JSON.stringify(error)} </p>;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor="title">Session title</FormLabel>
        <Input
          id="title"
          placeholder="Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <Button type="submit" variantColor="teal" mt={4}>
          create new session
        </Button>
      </FormControl>
    </form>
  );
};
