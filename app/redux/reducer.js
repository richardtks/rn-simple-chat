import { combineReducers } from 'redux'
import { types } from './action'
/**
    Message list structure:
    messagelist:[{
        username,
        messages: [{
            username,
            message,
            createdtime,
        }],
    }]
*/
const roomInitState = {
  byTargetUser: {},
  allTargetUsers: []
}

const roomReducer = (state = roomInitState, action ) => {
  const { type, payload } = action
  switch(type) {
    case types.ADD_ROOM:
      return ({
        byTargetUser: {
          ...state.byTargetUser,
          [payload.name]: {
            name: payload.name,
            lastmessage: payload.lastmessage,
            lastsent: payload.lastsent
          },
        },
        allTargetUsers: [...state.allTargetUsers, payload.name]
      })
    default:
      return state
  }
}

const chatReducer = (state = {}, action) => {
  const { type, payload } = action
  switch(type){
    case types.SEND_MESSAGE_REQUEST:
      return ({
        ...state,
        onRequest: true,
      })
    case types.SEND_MESSAGE_SUCCESS:
      return ({
        ...state,
        [payload.targetUser]: [...payload.messageList],
        onRequest: false,
      })
    case types.SEND_MESSAGE_FAILURE:
      return ({
        ...state,
        errorMessage: payload,
        onRequest: false,
      })
    default:
      return state
  }
}

export const reducer = combineReducers({
  room: roomReducer,
  chat: chatReducer,
})
