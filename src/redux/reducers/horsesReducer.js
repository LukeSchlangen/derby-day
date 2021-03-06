import { HORSES_ACTIONS } from '../actions/horsesActions';
import { firebaseAuth } from '../../fire';

const horseIsSelected = horse => horse.player;
const determineIfAllSelected = horseList => horseList.every(horseIsSelected);

const findMatch = (horse) => {
  const currentUserEmail = firebaseAuth.currentUser && firebaseAuth.currentUser.email;
  return horse.player && horse.player.email === currentUserEmail;
};
const horseUserMatch = (horses) => {
  const matchingHorse = horses.find(findMatch);
  return matchingHorse && matchingHorse.id;
};


const horses = (state = {
  list: [],
  allHorsesSelected: false,
  selectedHorseId: '',
}, action) => {
  switch (action.type) {
    case HORSES_ACTIONS.SET_HORSES:
      return {
        list: action.horses || state.list,
        allHorsesSelected: determineIfAllSelected(action.horses || state.list),
        selectedHorseId: horseUserMatch(action.horses || state.list),
      };
    case HORSES_ACTIONS.SET_SELECTED_HORSE:
      return { ...state };
    case HORSES_ACTIONS.UNSET_SELECTED_HORSE:
      return { ...state, selectedHorseId: '' };
    default:
      return state;
  }
};

export default horses;
