import React from "react";
import { Box, Button, Heading, Badge, Flex } from "@chakra-ui/core";
import { gql } from "apollo-boost";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { useParams } from "react-router";
import { JoinSessionForm } from "../../components/JoinSessionForm";
import { VoteForm } from "../../components/VoteForm";
import { ParticipantsList } from "../../components/ParticipantsList";
import { boxShadow } from "./styles";
import { UserContext } from "../../userContext";

const boxStyles = {
  w: "50%",
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
  const [resetVotes, loadingState] = useMutation<any>(RESET_VOTES);

  if (loading) return <Box width="50%">Loading..</Box>;
  if (error) return <p>Error :( {JSON.stringify(error)} </p>;

  const session = data.sessions[0];

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
            <Heading as="h1" color="gray.500" mb={3}>
              {session.title}
            </Heading>
            <Flex alignItems="center" mb={4}>
              user:
              <Badge bg="teal.100" ml={2}>
                {user.name}
              </Badge>
            </Flex>
            <Button
              mb={4}
              onClick={() =>
                resetVotes({ variables: { sessionId: session.id } })
              }
            >
              reset
            </Button>
            <VoteForm userId={user.id} />
            <ParticipantsList
              participants={session.participants}
              session={session}
            />
          </Box>
        </>
      )}
    </div>
  );
};
