import {
  GAME_RETRIEVED,
  GAME_CREATED,
} from '../actions/types';

const initialState = {
  isLoaded: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GAME_RETRIEVED:
    case GAME_CREATED:
      return {
        ...state,
        isLoaded: true,
      };
    default:
      return state;
  }
};
