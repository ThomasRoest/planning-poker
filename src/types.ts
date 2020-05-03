export interface IParticipant {
  id: number;
  name: string;
  vote: number;
}

export interface ISession {
  id: number;
  title: number;
  created_at: Date;
  uid: string;
  participants: IParticipant[];
}
