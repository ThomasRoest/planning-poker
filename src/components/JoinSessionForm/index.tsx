import React from "react";
import { LoadingCube } from "../LoadingCube";
import { UserContext } from "../../userContext";
import { gql, useMutation } from "@apollo/client";
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
interface JoinSessionFormProps {
  sessionId: number;
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

export const JoinSessionForm = ({ sessionId }: JoinSessionFormProps) => {
  const [name, setName] = React.useState("");
  const { setUser } = React.useContext(UserContext);
  const toast = useToast();
  const [createParticipant, { error, loading }] = useMutation<any>(
    CREATE_PARTICIPANT
  );

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

  if (loading)
    return (
      <Box width="50%">
        <LoadingCube />
      </Box>
    );
  if (error) return <p>Error :( {JSON.stringify(error)} </p>;

  return (
    <>
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
    </>
  );
};
