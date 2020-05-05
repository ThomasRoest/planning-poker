import React from "react";
import { Heading } from "@chakra-ui/core";
import { ISession } from "../../types";
import Confetti from "react-confetti";

interface SessionProps {
  session: ISession;
}

export const VoteResults = ({ session }: SessionProps) => {
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

  return (
    <div>
      {!result && <p>place your bets</p>}
      {result && (
        <div>
          <Heading>Result</Heading>
          {consensus && (
            <Heading as="h2" color="green.500">
              Consensus!
              <Confetti />
            </Heading>
          )}
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
