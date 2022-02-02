export interface ITournamentParticipants {
  readonly current: number;
  readonly max: number;
}

export interface ITournament {
  readonly id: string;
  readonly name: string;
  readonly organizer: string;
  readonly game: string[];
  readonly participants: ITournamentParticipants;
  readonly startDate: string;
}
