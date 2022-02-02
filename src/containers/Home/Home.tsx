import React from 'react';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import { Button, Container, FlexContainer, FlexItem, H4, H6, Input, Paper } from '../../components';
import { IApplicationStore, ITournament } from '../../interfaces';
import { tournamentActions } from '../../store';
import theme from '../../theme';

interface IActionProps {
  getTournaments: typeof tournamentActions.loadTournamentsRequested;
}

interface IStoreProps {
  tournaments: ITournament[];
  isLoading: boolean;
  hasError: boolean;
}

type IProps = IActionProps & IStoreProps;

const Home: React.FC<IProps> = props => {
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    props.getTournaments();
  }, []);

  const reloadTournaments = () => {
    props.getTournaments(search !== '' ? search : undefined);
  };

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <div style={{ marginBottom: theme.spacing(4) }}>
        <Input placeholder="Search tournament ..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {props.isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <p>Loading tournaments ...</p>
        </div>
      ) : props.hasError ? (
        <div style={{ textAlign: 'center' }}>
          <p>Something went wrong.</p>
          <Button onClick={reloadTournaments}>RETRY</Button>
        </div>
      ) : (
        <FlexContainer>
          {props.tournaments.map(it => (
            <FlexItem>
              <Paper>
                <H6>{it.name}</H6>
                <div>Organizer: {it.organizer}</div>
                <div>Game: {it.game}</div>
                <div>
                  Participants: {it.participants.current}/{it.participants.max}
                </div>
                <div>Start: {DateTime.fromISO(it.startDate).toFormat('dd/LL/yyyy, HH:mm:ss', { locale: 'en-GB' })}</div>
              </Paper>
            </FlexItem>
          ))}
        </FlexContainer>
      )}
    </Container>
  );
};

const actions: IActionProps = {
  getTournaments: tournamentActions.loadTournamentsRequested
};

const mapStateToProps = (state: IApplicationStore): IStoreProps => ({
  tournaments: state.tournament.tournaments,
  isLoading: state.tournament.isLoading,
  hasError: state.tournament.hasError
});

export default connect(mapStateToProps, actions)(Home);
