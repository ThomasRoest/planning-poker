import React from "react";
import { VoteOptionsGrid } from "./styles";
import { Button, Box, Icon } from "@chakra-ui/core";
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

const SET_PRIORITY = gql`
  mutation createPriority($id: Int, $priority: String) {
    update_participants(
      where: { id: { _eq: $id } }
      _set: { priority: $priority }
    ) {
      affected_rows
      returning {
        id
        vote
      }
    }
  }
`;

type Priority = "HIGH" | "LOW" | null;

export const VoteForm = ({ userId, participants }: VoteFormProps) => {
  const [createVote] = useMutation<any>(CREATE_VOTE);
  const [setPriority] = useMutation<any>(SET_PRIORITY);
  const [activeVote, setActiveVote] = React.useState<number | null>(null);
  const [activePriority, setActivePriority] = React.useState<Priority>(null);

  React.useEffect(() => {
    const voteIsCleared = (participant: IParticipant) =>
      participant.vote === null;
    const reset: boolean = participants.every(voteIsCleared);
    if (reset) {
      setActiveVote(null);
      setActivePriority(null);
    }
  }, [participants]);

  const submit = (vote: number) => {
    setActiveVote(vote);
    createVote({
      variables: { id: userId, vote },
    });
  };

  const handleSetPriority = (priority: Priority) => {
    setActivePriority(priority);
    setPriority({
      variables: { id: userId, priority: priority },
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
      <Box mt={5}>
        <Box as="span" mr={5}>
          Ticket priority
        </Box>
        <Button
          size="sm"
          mr={3}
          onClick={() => handleSetPriority("LOW")}
          variantColor={activePriority === "LOW" ? "teal" : "gray"}
        >
          low
          <Icon
            name="arrow-down"
            size="16px"
            color={activePriority === "LOW" ? "white" : "green.500"}
            ml={2}
          />
        </Button>
        <Button
          size="sm"
          onClick={() => handleSetPriority("HIGH")}
          variantColor={activePriority === "HIGH" ? "teal" : "gray"}
        >
          high
          <Icon
            name="arrow-up"
            size="16px"
            color={activePriority === "HIGH" ? "white" : "red.500"}
            ml={2}
          />
        </Button>
      </Box>
    </Box>
  );
};
