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
  IconButton,
  Icon,
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
              const content = (
                <Box w="180px" display="flex" justifyContent="space-between">
                  <span>{participant.name}</span>
                  <Box minW="45px">
                    {participant.vote}
                    {participant.priority && (
                      <span>
                        {participant.priority === "HIGH" ? (
                          <Icon
                            name="arrow-up"
                            size="16px"
                            color="red.500"
                            ml={1}
                          />
                        ) : (
                          <Icon
                            name="arrow-down"
                            size="16px"
                            color="green.500"
                            ml={1}
                          />
                        )}
                      </span>
                    )}
                  </Box>
                </Box>
              );
              return (
                <ListItem
                  display="flex"
                  mb={1}
                  minWidth="120px"
                  justifyContent="space-between"
                  key={participant.id}
                >
                  {content}
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box>
          {consensus && (
            <Heading as="h3" color="green.500" size="md">
              Consensus!
              <Confetti numberOfPieces={100} />
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
        <hr />
        {session.participants.map((participant) => {
          return (
            <ListItem
              mb={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderRadius="3px"
              padding=".5rem .5rem"
              key={participant.id}
              bg={participant.vote === null ? "white" : "green.100"}
            >
              <span>{participant.name}</span>

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
