'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_STORY = [];
  let STATE_COPY = { ...state };

  for (const action of actions) {
    const STATE_OPERATION = { ...STATE_COPY };

    switch (action.type) {
      case 'addProperties':
        addProperties(STATE_OPERATION, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(STATE_OPERATION, action.keysToRemove);
        break;

      case 'clear':
        clear(STATE_OPERATION);
        break;

      default:
        throw new Error('Смерть');
    }

    STATE_COPY = STATE_OPERATION;
    STATE_STORY.push(STATE_COPY);
  }

  return STATE_STORY;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
