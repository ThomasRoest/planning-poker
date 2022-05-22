import React from "react";
import { LoadingCube } from "../LoadingCube";
import { UserContext } from "../../userContext";
import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
interface JoinSessionFormProps {
  sessionId: number;
  title: string;
}

export const CREATE_PARTICIPANT = gql`
  mutation createParticipant($name: String, $sessionId: Int, $owner: Boolean) {
    insert_participants(
      objects: [{ name: $name, session_id: $sessionId, owner: $owner }]
    ) {
      affected_rows
      returning {
        id
        name
        owner
      }
    }
  }
`;

export const JoinSessionForm = ({ sessionId, title }: JoinSessionFormProps) => {
  const [name, setName] = React.useState("");
  const { setUser } = React.useContext(UserContext);
  const toast = useToast();
  const [createParticipant, { error, loading }] =
    useMutation<any>(CREATE_PARTICIPANT);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data }: any = await createParticipant({
      variables: { name, sessionId, owner: false },
    });

    const participant = data.insert_participants.returning[0];
    setUser({ id: participant.id, name: participant.name });

    toast({
      title: "Joined session",
      status: "success",
      duration: 3000,
      position: "top-right",
    });
  };

  const borderColor = useColorModeValue("gray.300", "gray.600");

  if (loading)
    return (
      <Box width="50%">
        <LoadingCube />
      </Box>
    );
  
    if (error) return <p>Error : {JSON.stringify(error)} </p>;

  return (
    <Box
      border="1px"
      borderColor={borderColor}
      padding="5"
      borderRadius="3"
    >
      <Heading as="h1" color="gray.500" mb={2}>
            {title}
          </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Enter name to join this session</FormLabel>
          <Input
            id="name"
            placeholder="Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Button type="submit" mt={4} colorScheme="teal">
            Join session
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
