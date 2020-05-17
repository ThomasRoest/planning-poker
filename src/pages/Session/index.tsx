import React from "react";
import {
  Box,
  Button,
  Heading,
  Badge,
  Flex,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/core";
import { gql } from "apollo-boost";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { useParams } from "react-router";
import { JoinSessionForm } from "../../components/JoinSessionForm";
import { VoteForm } from "../../components/VoteForm";
import { ParticipantsList } from "../../components/ParticipantsList";
import { boxShadow } from "./styles";
import { UserContext } from "../../userContext";
import copy from "copy-to-clipboard";

export const boxStyles = {
  maxWidth: "650px",
  m: "auto",
  mt: 5,
  bg: "white",
  boxShadow: boxShadow,
  borderRadius: "3px",
  p: 4,
};

export const RESET_VOTES = gql`
  mutation reset_votes($sessionId: Int) {
    update_participants(
      where: { session_id: { _eq: $sessionId } }
      _set: { vote: null }
    ) {
      affected_rows
      returning {
        id
        vote
      }
    }
  }
`;

export const GET_SESSION = gql`
  query getSession($uid: uuid) {
    sessions(where: { uid: { _eq: $uid } }) {
      id
      title
      created_at
      uid
      participants {
        id
        name
        vote
      }
    }
  }
`;

export const SUBSCRIBE_SESSION = gql`
  subscription subscribeSession($uid: uuid) {
    sessions(where: { uid: { _eq: $uid } }) {
      id
      title
      created_at
      uid
      participants {
        id
        name
        vote
        owner
      }
    }
  }
`;

export const SessionPage = () => {
  const { uid } = useParams();
  const { user } = React.useContext(UserContext);
  const { loading, error, data } = useSubscription(SUBSCRIBE_SESSION, {
    variables: { uid },
  });
  const [resetVotes] = useMutation<any>(RESET_VOTES);

  const toast = useToast();

  if (loading) return <Box width="50%">Loading..</Box>;
  if (error) return <p>Error :( {JSON.stringify(error)} </p>;

  const session = data.sessions[0];

  const copyToClipboard = () => {
    const url = window.location.href;
    copy(url);
    toast({
      title: "Copied to clipboard",
      status: "info",
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <div>
      {!user && (
        <Box {...boxStyles}>
          <Heading as="h1" color="gray.500" mb={2}>
            {session.title}
          </Heading>
          <JoinSessionForm sessionId={session.id} />
        </Box>
      )}
      {user && (
        <>
          <Box {...boxStyles}>
            <Flex justifyContent="space-between" align="center" mb=".5rem">
              <div>
                <Heading as="h1" color="gray.500" mb={3} display="inline">
                  {session.title}
                </Heading>
              </div>
              <Tooltip label="Share url" aria-label="share">
                <IconButton
                  aria-label="Copy"
                  icon="copy"
                  onClick={copyToClipboard}
                />
              </Tooltip>
            </Flex>
            <Flex alignItems="center" mb={4}>
              <Badge bg="teal.100">{user.name}</Badge>
            </Flex>
            <Button
              mb={4}
              onClick={() =>
                resetVotes({ variables: { sessionId: session.id } })
              }
            >
              Reset
            </Button>
            <VoteForm userId={user.id} />
            <ParticipantsList session={session} />
          </Box>
        </>
      )}
    </div>
  );
};
