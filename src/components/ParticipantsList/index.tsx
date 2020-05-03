import React from "react";
import { IParticipant } from "../../types";
import { List, ListItem, ListIcon } from "@chakra-ui/core";

interface ParticipantProps {
  participants: IParticipant[];
}

export const ParticipantsList = ({ participants }: ParticipantProps) => {
  return (
    <List spacing={3} mt={4}>
      {participants.map((participant) => {
        return (
          <ListItem
            p={1}
            key={participant.id}
            bg={participant.vote ? "green.100" : "white"}
          >
            {participant.name}
            {participant.vote && (
              <ListIcon icon="check-circle" color="green.500" />
            )}
          </ListItem>
        );
      })}
    </List>
  );
};
