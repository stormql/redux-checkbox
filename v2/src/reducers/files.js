import {
  INVALIDATE_DATADIR,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from "../actions";

function files(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_DATADIR:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.files,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

export function filesByDatadir(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_DATADIR:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.datadir]: files(state[action.datadir], action)
      });
    default:
      return state;
  }
}
