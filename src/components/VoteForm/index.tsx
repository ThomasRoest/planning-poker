import React from "react";
import { VoteOptionsGrid } from "./styles";
import { IParticipant } from "../../types";
import { gql, useMutation } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons";

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
              colorScheme={activeVote === option ? "teal" : "gray"}
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
          rightIcon={
            <ArrowDownIcon
              color={activePriority === "LOW" ? "white" : "green.500"}
            />
          }
          colorScheme={activePriority === "LOW" ? "teal" : "gray"}
          variant="solid"
          mr={2}
          onClick={() => handleSetPriority("LOW")}
        >
          low
        </Button>
        <Button
          size="sm"
          rightIcon={
            <ArrowUpIcon
              color={activePriority === "HIGH" ? "white" : "red.500"}
            />
          }
          colorScheme={activePriority === "HIGH" ? "teal" : "gray"}
          variant="solid"
          onClick={() => handleSetPriority("HIGH")}
        >
          high
        </Button>
      </Box>
    </Box>
  );
};
