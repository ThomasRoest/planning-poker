import React from "react";
import { ISession } from "../../types";
import {
  List,
  ListItem,
  ListIcon,
  Box,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  IconButton,
} from "@chakra-ui/core";
import Confetti from "react-confetti";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { UserContext } from "../../userContext";

const DELETE_USER = gql`
  mutation createParticipant($id: Int!) {
    delete_participants_by_pk(id: $id) {
      id
    }
  }
`;

interface ParticipantProps {
  session: ISession;
}

export const ParticipantsList = ({ session }: ParticipantProps) => {
  const { user } = React.useContext(UserContext);
  const [deleteUser] = useMutation(DELETE_USER);

  const votes = session.participants
    .map((participant) => participant.vote)
    .filter((vote) => vote !== null);

  let result;
  let consensus;
  if (votes.length === session.participants.length && votes.length > 1) {
    const total = votes.reduce((acc: number, result: number) => {
      return acc + result;
    }, 0);
    result = Math.round(total / session.participants.length);
    consensus = votes.every((val, i, arr) => val === arr[0]);
  }

  if (result) {
    return (
      <Flex align="center" justifyContent="space-between" mt={5}>
        <Box>
          <List styleType="none">
            {session.participants.map((participant) => {
              const content = `${participant.name}: ${participant.vote}`;
              return <ListItem key={participant.id}>{content}</ListItem>;
            })}
          </List>
        </Box>
        <Box>
          {consensus && (
            <Heading as="h3" color="green.500" size="md">
              Consensus!
              <Confetti />
            </Heading>
          )}
          <Stat>
            <StatLabel>Average</StatLabel>
            <StatNumber>{result}</StatNumber>
          </Stat>
        </Box>
      </Flex>
    );
  } else {
    return (
      <List spacing={3} mt={4}>
        <Text fontSize="md">Participants</Text>
        {session.participants.map((participant) => {
          return (
            <ListItem
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderRadius="3px"
              padding=".5rem .5rem"
              key={participant.id}
              bg={participant.vote === null ? "white" : "green.100"}
            >
              {participant.name}

              <Flex align="center">
                {participant.vote !== null && (
                  <ListIcon icon="check-circle" color="green.500" />
                )}
                {user.owner && (
                  <IconButton
                    onClick={() =>
                      deleteUser({ variables: { id: participant.id } })
                    }
                    variant="outline"
                    aria-label="Send email"
                    icon="delete"
                  />
                )}
              </Flex>
            </ListItem>
          );
        })}
      </List>
    );
  }
};
