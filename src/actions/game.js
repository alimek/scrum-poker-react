import store from '../stores/store';
import PokerAPI from '../services/PokerAPI';
import AppStore from '../stores/AppStore';
import { createServer } from '../actions/socket';

import {
  SET_ACTIVE_TASK,
  SET_ACTIVE_TASK_STATUS,
  GAME_CREATED,
} from './types';

export const createGame = name => async (dispatch) => {
  const newGame = await PokerAPI.post('/games', { name });

  dispatch({ type: GAME_CREATED, newGame });
  return newGame;
};

export const getGame = id => PokerAPI.get(`/games/${id}`)
  .then((game) => {
    AppStore.game.fromResponse(game);
    AppStore.io = createServer();

    if (AppStore.game.tasks.length > 0) {
      const task = game.tasks.find((curVal) => curVal.id === game.current_task_id);
      store.dispatch({ type: SET_ACTIVE_TASK, task });

      task.votes.forEach((taskPlayer) => {
        const player = AppStore.game.getPlayerByGUID(taskPlayer.player.guid);
        player.isReady.set(true);
        if (task.status === 'flipped') {
          player.pickedCard.set(taskPlayer.value);
        } else {
          player.pickedCard.set(null);
        }
      });
    }
    return game;
  });

export const startGame = () => PokerAPI.patch(`/games/${AppStore.game.id.get()}/start`);

export const onGameStarted = () => {
  AppStore.game.status.set('started');
  store.dispatch({ type: SET_ACTIVE_TASK, task: AppStore.game.tasks[0] });
  AppStore.game.resetPlayersCards();
};

export const flip = () => {
  const activeTask = store.getState().activeTask;

  PokerAPI.patch(`/games/${AppStore.game.id.get()}/tasks/${activeTask.id}/flip`);
};

export const onFlip = (message) => {
  const activeTask = store.getState().activeTask;

  store.dispatch({ type: SET_ACTIVE_TASK_STATUS, status: message.status });
  AppStore.game.resetPlayersCards();
  AppStore.game.setPickedCards(message.votes, activeTask.status);
};