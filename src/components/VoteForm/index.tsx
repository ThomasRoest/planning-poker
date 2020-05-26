import React from "react";
import { VoteOptionsGrid } from "./styles";
import { Button, Box } from "@chakra-ui/core";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { IParticipant } from "../../types";

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
  const [activeVote, setActiveVote] = React.useState<number | null>(null);

  React.useEffect(() => {
    const voteIsCleared = (participant: IParticipant) =>
      participant.vote === null;
    const reset: boolean = participants.every(voteIsCleared);
    if (reset) {
      setActiveVote(null);
    }
  }, [participants]);

  const submit = (vote: number) => {
    setActiveVote(vote);
    createVote({
      variables: { id: userId, vote },
    });
  };

  const options = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];

  return (
    <Box>
      <VoteOptionsGrid>
        {options.map((option) => {
          return (
            <Button
              key={option}
              size="sm"
              variantColor={activeVote === option ? "teal" : "gray"}
              onClick={() => submit(option)}
            >
              {option} points
            </Button>
          );
        })}
      </VoteOptionsGrid>
    </Box>
  );
};
