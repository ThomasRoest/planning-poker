import React from "react";
import { ISession } from "../../types";
import Confetti from "react-confetti";
import { UserContext } from "../../userContext";
import { gql, useMutation } from "@apollo/client";
import {
  Flex,
  Box,
  List,
  ListItem,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  IconButton,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";

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

  if (typeof result === "number") {
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
                          <ArrowUpIcon
                            color="red.500"
                            ml={1}
                          />
                        ) : (
                          <ArrowDownIcon
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
                  <CheckCircleIcon color="green.500" />
                )}
                {user.owner && (
                  <IconButton
                    onClick={() =>
                      deleteUser({ variables: { id: participant.id } })
                    }
                    variant="outline"
                    aria-label="delete"
                    icon={<DeleteIcon />}
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
