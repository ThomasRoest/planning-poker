import React from "react";
import { VoteOptionsGrid } from "./styles";
import { Button } from "@chakra-ui/core";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

interface VoteFormProps {
  userId: number;
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

export const VoteForm = ({ userId }: VoteFormProps) => {
  const [createVote, { error, loading }] = useMutation<any>(CREATE_VOTE);

  const submit = (vote: number) => {
    createVote({
      variables: { id: userId, vote },
    });
  };

  const options = [0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20];

  return (
    <div>
      <VoteOptionsGrid>
        {options.map((option) => {
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
        })}
      </VoteOptionsGrid>
    </div>
  );
};
