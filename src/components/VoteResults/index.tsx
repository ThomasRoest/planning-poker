import React from "react";
import { Heading } from "@chakra-ui/core";
import { ISession } from "../../types";

interface SessionProps {
  session: ISession;
}

export const VoteResults = ({ session }: SessionProps) => {
  const votes = session.participants
    .map((participant) => participant.vote)
    .filter((vote) => vote !== null);

  let result;
  if (votes.length === session.participants.length) {
    const total = votes.reduce((acc: number, result: number) => {
      return acc + result;
    }, 0);
    result = Math.round(total / session.participants.length);
  }

  return (
    <div>
      {!result && <p>place your bets</p>}
      {result && (
        <div>
          <Heading>Result</Heading>
          {session.participants.map((participant) => {
            return (
              <li
                key={participant.id}
              >{`${participant.name}: ${participant.vote}`}</li>
            );
          })}
          <Heading>average: {result}</Heading>
        </div>
      )}
    </div>
  );
};
