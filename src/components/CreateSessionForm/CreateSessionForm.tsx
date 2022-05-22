import React from "react";
import { useHistory } from "react-router-dom";
import { LoadingCube } from "../LoadingCube";
import { CREATE_PARTICIPANT } from "../JoinSessionForm";
import { UserContext } from "../../userContext";
import { gql, useMutation } from "@apollo/client";
import {
  useToast,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

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

export const CreateSessionForm = () => {
  const history = useHistory();
  const toast = useToast();
  const { setUser } = React.useContext(UserContext);
  const [title, setTitle] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [createSession, { error, loading }] = useMutation<any>(CREATE_SESSION);
  const [createParticipant] = useMutation<any>(CREATE_PARTICIPANT);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const session = await createSession({
      variables: { title },
    });
    const result = await createParticipant({
      variables: {
        name: username,
        sessionId: session.data.insert_sessions.returning[0].id,
        owner: true,
      },
    });

    const { id, name, owner } = result.data.insert_participants.returning[0];
    setUser({ id, name, owner });

    history.push(`/session/${session.data.insert_sessions.returning[0].uid}`);

    toast({
      title: "Session created",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const borderColor = useColorModeValue("gray.300", "gray.600");

  if (loading)
    return (
      <Box>
        <LoadingCube />
        creating new session..
      </Box>
    );
  if (error) return <p>Error :( {JSON.stringify(error)} </p>;

  return (
    <Box
      border="1px"
      borderColor={borderColor}
      padding="5"
      borderRadius="3"
    >
      <Heading size="lg" mb={4}>
        Create new session
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="title">Session title</FormLabel>
          <Input
            id="title"
            placeholder="Title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            placeholder="Username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>
          create new session
        </Button>
      </form>
    </Box>
  );
};
