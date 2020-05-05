import React from "react";
import {
  Button,
  FormControl,
  Input,
  FormLabel,
  Heading,
} from "@chakra-ui/core";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { GET_SESSION } from "../../pages/Session";
import { useParams } from "react-router";

interface JoinSessionFormProps {
  sessionId: number;
  setUserId: (value: number) => void;
}

const CREATE_PARTICIPANT = gql`
  mutation createParticipant($name: String, $sessionId: Int) {
    insert_participants(objects: [{ name: $name, session_id: $sessionId }]) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const JoinSessionForm = ({
  sessionId,
  setUserId,
}: JoinSessionFormProps) => {
  const [name, setName] = React.useState("");
  let { uid } = useParams();
  const [createParticipant, { error, loading }] = useMutation<any>(
    CREATE_PARTICIPANT,
    {
      onCompleted: (data) => onMutationCompleted(data),
      refetchQueries: [
        {
          query: GET_SESSION,
          variables: { uid },
        },
      ],
    }
  );

  const onMutationCompleted = ({ insert_participants }: any) => {
    setUserId(insert_participants.returning[0].id);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createParticipant({
      variables: { name, sessionId },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {JSON.stringify(error)} </p>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Button type="submit" mt={4} variantColor="teal">
            Join session
          </Button>
        </FormControl>
      </form>
    </>
  );
};
