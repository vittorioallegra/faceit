import { ICreateTournament, ITournament } from '../../interfaces';
import { createTournament, deleteTournament, editTournament, fetchTournaments } from './actions';
import { selectTournaments } from './selectors';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useTournaments = () => useSelector(selectTournaments);

export const useFetchTournaments = () => {
  const dispatch = useDispatch();

  return (search?: string) => dispatch(fetchTournaments(search));
};

export const useCreateTournament = () => {
  const dispatch = useDispatch();

  return (tournament: ICreateTournament) => dispatch(createTournament(tournament));
};

export const useEditTournament = () => {
  const dispatch = useDispatch();

  return (tournament: ITournament, name: string) => dispatch(editTournament(tournament, name));
};

export const useDeleteTournament = () => {
  const dispatch = useDispatch();
  const { tournaments } = useTournaments();

  return (tournament: ITournament) => dispatch(deleteTournament(tournament, tournaments.indexOf(tournament)));
};
