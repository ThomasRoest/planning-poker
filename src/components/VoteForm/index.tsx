import React from "react";
import { VoteOptionsGrid } from "./styles";
import { Button } from "@chakra-ui/core";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { GET_SESSION } from "../../pages/Session";
import { useParams } from "react-router";

interface VoteFormProps {
  userId: number;
}

const CREATE_VOTE = gql`
  mutation createVote($id: Int, $vote: Int) {
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
  const [vote, setVote] = React.useState(0);
  const { uid } = useParams();
  const [createVote, { error, loading }] = useMutation<any>(CREATE_VOTE, {
    refetchQueries: [
      {
        query: GET_SESSION,
        variables: { uid },
      },
    ],
  });

  const submit = (vote: number) => {
    setVote(vote);
    createVote({
      variables: { id: userId, vote },
    });
  };

  return (
    <div>
      <VoteOptionsGrid>
        <Button size="sm" variantColor="gray" onClick={() => submit(0)}>
          0 points
        </Button>
        <Button size="sm" variantColor="gray" onClick={() => submit(1)}>
          1 points
        </Button>
        <Button size="sm" variantColor="gray" onClick={() => submit(2)}>
          2
        </Button>
        <Button size="sm" variantColor="gray" onClick={() => submit(3)}>
          3
        </Button>
        <Button size="sm" variantColor="gray" onClick={() => submit(4)}>
          4 points
        </Button>
        <Button size="sm" variantColor="gray" onClick={() => submit(5)}>
          5 points
        </Button>
        <Button size="sm" variantColor="gray" onClick={() => submit(6)}>
          6
        </Button>
        <Button size="sm" variantColor="gray" onClick={() => submit(7)}>
          7
        </Button>
      </VoteOptionsGrid>
    </div>
  );
};
