import React from "react";
import { Box, Button } from "@chakra-ui/core";
import { gql } from "apollo-boost";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import { useHistory, useParams } from "react-router";
import { JoinSessionForm } from "../../components/JoinSessionForm";
import { VoteForm } from "../../components/VoteForm";
import { ParticipantsList } from "../../components/ParticipantsList";
import { VoteResults } from "../../components/VoteResults";

export interface Participant {
  id: number;
  name: string;
  vote: number;
}

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
  const [userId, setUserId] = React.useState<number | null>(null);
  const { loading, error, data } = useSubscription(SUBSCRIBE_SESSION, {
    variables: { uid },
  });
  const [resetVotes, state] = useMutation<any>(RESET_VOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {JSON.stringify(error)} </p>;

  const session = data.sessions[0];

  return (
    <div>
      {!userId && (
        <Box
          w="50%"
          m="auto"
          mt={5}
          border="1px solid lightgrey"
          borderRadius="3px"
          p={4}
        >
          <h3>Session: {session.title}</h3>
          <h3>Session ID: {session.id}</h3>

          <JoinSessionForm sessionId={session.id} setUserId={setUserId} />
        </Box>
      )}

      {userId && (
        <>
          <Box
            w="50%"
            m="auto"
            mt={5}
            border="1px solid lightgrey"
            borderRadius="3px"
            p={4}
          >
            <h3>Session: {session.title}</h3>
            <h3>Session ID: {session.id}</h3>
            <h3>user: {userId}</h3>
            <Button
              mb={4}
              onClick={() =>
                resetVotes({ variables: { sessionId: session.id } })
              }
            >
              reset
            </Button>
            <VoteForm userId={userId} />
            <ParticipantsList participants={session.participants} />
          </Box>
          <Box
            w="50%"
            m="auto"
            mt={5}
            border="1px solid lightgrey"
            borderRadius="3px"
            p={4}
          >
            <VoteResults session={session} />
          </Box>
        </>
      )}
    </div>
  );
};
