import React from "react";
import { VoteOptionsGrid } from "./styles";
import { Button, Box, Heading } from "@chakra-ui/core";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { IParticipant } from "../../types";
import { UserContext } from "../../userContext";

interface VoteFormProps {
  userId: number;
  participants: IParticipant[];
}

const CREATE_VOTE = gql`
  mutation createVote($id: Int, $vote: Float) {
    update_participants(where: { id: { _eq: $id } }, _set: { vote: $vote }) {
      affected_rows
      returning {
        id
        vote
      }
    }
  }
`;

export const VoteForm = ({ userId, participants }: VoteFormProps) => {
  const [createVote] = useMutation<any>(CREATE_VOTE);
  const { user } = React.useContext(UserContext);

  const submit = (vote: number) => {
    createVote({
      variables: { id: userId, vote },
    });
  };

  const options = [0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20];

  const userParticipant = participants.find(
    (participant) => participant.id === user.id
  );

  return (
    <Box>
      <VoteOptionsGrid>
        {options.map((option) => {
          if (userParticipant && userParticipant.vote === option) {
            return (
              <Button
                key={option}
                size="sm"
                variantColor="teal"
                onClick={() => submit(option)}
              >
                {option} points
              </Button>
            );
          } else {
            return (
              <Button
                key={option}
                size="sm"
                variantColor="gray"
                onClick={() => submit(option)}
              >
                {option} points
              </Button>
            );
          }
        })}
      </VoteOptionsGrid>
    </Box>
  );
};
