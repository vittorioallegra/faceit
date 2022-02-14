import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { useDebouncedCallback } from 'use-debounce';
import {
  Button,
  Container,
  FlexContainer,
  FlexGrow,
  FlexItem,
  H4,
  H6,
  Input,
  Paper,
  TextCenter
} from '../../components';
import { IApplicationStore, ITournament } from '../../interfaces';
import { tournamentActions } from '../../store';
import { Buttons, Header } from './Fragments';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = React.useState('');
  const [actionRequested, setActionRequested] = React.useState(false);
  const dispatch = useDispatch();
  const tournaments = useSelector((state: IApplicationStore) => state.tournament.tournaments);
  const isLoading = useSelector((state: IApplicationStore) => state.tournament.isLoading);
  const hasError = useSelector((state: IApplicationStore) => state.tournament.hasError);

  const loadTournaments = () => {
    dispatch(tournamentActions.loadTournamentsRequested(search !== '' ? search : undefined));
  };
  const debouncedLoad = useDebouncedCallback(loadTournaments, 300);

  React.useEffect(() => {
    loadTournaments();
  }, []);

  React.useEffect(() => {
    if (actionRequested && !isLoading && !hasError) {
      setActionRequested(false);
      loadTournaments();
    }
  }, [isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    debouncedLoad();
  };

  const handleCreateTournament = () => {
    const name = window.prompt(t('pages.home.labels.create'));
    if (name) {
      setActionRequested(true);
      dispatch(
        tournamentActions.createTournamentRequested({
          name
        })
      );
    }
  };

  const handleEditTournament = (tournament: ITournament) => () => {
    const name = window.prompt(t('pages.home.labels.edit'), tournament.name);
    if (name) {
      setActionRequested(true);
      dispatch(
        tournamentActions.editTournamentRequested({
          ...tournament,
          name
        })
      );
    }
  };

  const handleDeleteTournament = (tournament: ITournament) => () => {
    const result = window.confirm(t('pages.home.labels.delete', { name: tournament.name }));
    if (result) {
      setActionRequested(true);
      dispatch(tournamentActions.deleteTournamentRequested(tournament));
    }
  };

  return (
    <Container>
      <H4>{t('pages.home.title')}</H4>
      <Header>
        <Input placeholder={t('pages.home.labels.search')} value={search} onChange={handleInputChange} />
        <FlexGrow />
        <Button onClick={handleCreateTournament}>{t('pages.home.buttons.create')}</Button>
      </Header>
      {isLoading ? (
        <TextCenter>
          <p>{t('pages.home.loading')}</p>
        </TextCenter>
      ) : hasError ? (
        <TextCenter>
          <p>{t('pages.home.error')}</p>
          <Button onClick={loadTournaments}>{t('pages.home.buttons.retry')}</Button>
        </TextCenter>
      ) : tournaments.length === 0 ? (
        <TextCenter>
          <p>{t('pages.home.noResults')}</p>
        </TextCenter>
      ) : (
        <FlexContainer>
          {tournaments.map(it => (
            <FlexItem key={it.id}>
              <Paper>
                <H6>{it.name}</H6>
                <FlexGrow>
                  <div>
                    {t('pages.home.fields.organizer')}: {it.organizer}
                  </div>
                  <div>
                    {t('pages.home.fields.game')}: {it.game}
                  </div>
                  <div>
                    {t('pages.home.fields.participants')}: {it.participants.current}/{it.participants.max}
                  </div>
                  <div>
                    {t('pages.home.fields.startDate')}:{' '}
                    {DateTime.fromISO(it.startDate).toFormat('dd/LL/yyyy, HH:mm:ss', { locale: 'en-GB' })}
                  </div>
                </FlexGrow>
                <Buttons>
                  <Button onClick={handleEditTournament(it)}>{t('pages.home.buttons.edit')}</Button>
                  <Button onClick={handleDeleteTournament(it)}>{t('pages.home.buttons.delete')}</Button>
                </Buttons>
              </Paper>
            </FlexItem>
          ))}
        </FlexContainer>
      )}
    </Container>
  );
};
