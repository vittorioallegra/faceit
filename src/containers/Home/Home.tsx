import React from 'react';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import { useDebouncedCallback } from 'use-debounce';
import { Button, Container, FlexContainer, FlexItem, H4, H6, Input, Paper } from '../../components';
import { IApplicationStore, ITournament } from '../../interfaces';
import { tournamentActions } from '../../store';
import theme from '../../theme';
import './home.css';

interface IActionProps {
  getTournaments: typeof tournamentActions.loadTournamentsRequested;
  createTournament: typeof tournamentActions.createTournamentRequested;
  editTournament: typeof tournamentActions.editTournamentRequested;
  deleteTournament: typeof tournamentActions.deleteTournamentRequested;
}

interface IStoreProps {
  tournaments: ITournament[];
  isLoading: boolean;
  hasError: boolean;
}

type IProps = IActionProps & IStoreProps;

const Home: React.FC<IProps> = props => {
  const [search, setSearch] = React.useState('');
  const [actionRequested, setActionRequested] = React.useState(false);

  const loadTournaments = () => {
    props.getTournaments(search !== '' ? search : undefined);
  };
  const debouncedLoad = useDebouncedCallback(loadTournaments, 300);

  React.useEffect(() => {
    loadTournaments();
  }, []);

  React.useEffect(() => {
    if (actionRequested && !props.isLoading && !props.hasError) {
      setActionRequested(false);
      loadTournaments();
    }
  }, [props.isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    debouncedLoad();
  };

  const handleCreateTournament = () => {
    const name = window.prompt('Tournament Name:');
    if (name) {
      setActionRequested(true);
      props.createTournament({
        name
      });
    }
  };

  const handleEditTournament = (tournament: ITournament) => () => {
    const name = window.prompt('New Tournament Name:', tournament.name);
    if (name) {
      setActionRequested(true);
      props.editTournament({
        ...tournament,
        name
      });
    }
  };

  const handleDeleteTournament = (tournament: ITournament) => () => {
    const result = window.confirm('Do you really want to delete this tournament?');
    if (result) {
      setActionRequested(true);
      props.deleteTournament(tournament);
    }
  };

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <div style={{ display: 'flex', marginBottom: theme.spacing(4) }}>
        <Input placeholder="Search tournament ..." value={search} onChange={handleInputChange} />
        <div className="grow" />
        <Button onClick={handleCreateTournament}>CREATE TOURNAMENT</Button>
      </div>
      {props.isLoading ? (
        <div className="text-center">
          <p>Loading tournaments ...</p>
        </div>
      ) : props.hasError ? (
        <div className="text-center">
          <p>Something went wrong.</p>
          <Button onClick={loadTournaments}>RETRY</Button>
        </div>
      ) : props.tournaments.length === 0 ? (
        <div className="text-center">
          <p>No tournaments found.</p>
        </div>
      ) : (
        <FlexContainer>
          {props.tournaments.map(it => (
            <FlexItem key={it.id}>
              <Paper>
                <H6>{it.name}</H6>
                <div className="grow">
                  <div>Organizer: {it.organizer}</div>
                  <div>Game: {it.game}</div>
                  <div>
                    Participants: {it.participants.current}/{it.participants.max}
                  </div>
                  <div>
                    Start: {DateTime.fromISO(it.startDate).toFormat('dd/LL/yyyy, HH:mm:ss', { locale: 'en-GB' })}
                  </div>
                </div>
                <div style={{ marginTop: theme.spacing(2) }}>
                  <Button style={{ marginRight: theme.spacing(2) }} onClick={handleEditTournament(it)}>
                    EDIT
                  </Button>
                  <Button onClick={handleDeleteTournament(it)}>DELETE</Button>
                </div>
              </Paper>
            </FlexItem>
          ))}
        </FlexContainer>
      )}
    </Container>
  );
};

const actions: IActionProps = {
  getTournaments: tournamentActions.loadTournamentsRequested,
  createTournament: tournamentActions.createTournamentRequested,
  editTournament: tournamentActions.editTournamentRequested,
  deleteTournament: tournamentActions.deleteTournamentRequested
};

const mapStateToProps = (state: IApplicationStore): IStoreProps => ({
  tournaments: state.tournament.tournaments,
  isLoading: state.tournament.isLoading,
  hasError: state.tournament.hasError
});

export default connect(mapStateToProps, actions)(Home);
