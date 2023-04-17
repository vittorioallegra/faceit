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
  TextCenter,
} from '../../components';
import { FetchStatus } from '../../enums';
import { ITournament } from '../../interfaces';
import {
  useCreateTournament,
  useDeleteTournament,
  useEditTournament,
  useFetchTournaments,
  useTournaments,
} from '../../store/tournaments/hooks';
import { Buttons, Header } from './components';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';

export const Home = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const { tournaments, status } = useTournaments();
  const fetchTournaments = useFetchTournaments();
  const createTournament = useCreateTournament();
  const editTournament = useEditTournament();
  const deleteTournament = useDeleteTournament();

  const loadTournaments = () => {
    fetchTournaments(search !== '' ? search : undefined);
  };
  const debouncedLoad = useDebouncedCallback(loadTournaments, 300);

  useEffect(() => {
    loadTournaments();
  }, []);

  const validateName = (name: string) => {
    return name.trim().length > 0 && /^[\w\d\s]*$/.test(name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    debouncedLoad();
  };

  const handleCreateTournament = () => {
    const name = window.prompt(t('pages.home.labels.create'));
    if (name && validateName(name)) {
      createTournament({ name });
    }
  };

  const handleEditTournament = (tournament: ITournament) => () => {
    const name = window.prompt(t('pages.home.labels.edit'), tournament.name);
    if (name && validateName(name)) {
      editTournament(tournament, name);
    }
  };

  const handleDeleteTournament = (tournament: ITournament) => () => {
    const result = window.confirm(t('pages.home.labels.delete', { name: tournament.name }));
    if (result) {
      deleteTournament(tournament);
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
      {status === FetchStatus.LOADING ? (
        <TextCenter>
          <p>{t('pages.home.loading')}</p>
        </TextCenter>
      ) : status === FetchStatus.FAILED ? (
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
          {tournaments.map((it) => (
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
                    {DateTime.fromISO(it.startDate).toFormat('dd/LL/yyyy, HH:mm:ss', {
                      locale: 'en-GB',
                    })}
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
