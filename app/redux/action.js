import sendMessage from '../api/firebase/sendMessage'

export const types = {
  CREATE_TEMP_ROOM: 'ROOM_TEMP_NEW',
  ADD_ROOM: 'ROOM_NEW',
  SEND_MESSAGE_REQUEST: 'SEND_MESSAGE_REQUEST',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
  SEND_MESSAGE_FAILURE: 'SEND_MESSAGE_FAILURE',
  SEND_MESSAGE: 'MESSAGE_NEW'
}

export const actionCreators = {
  CREATE_TEMP_ROOM: (targetUser) => ({
    type: types.CREATE_TEMP_ROOM,
    payload: { targetUser },
  }),
  REVERT_TEMP_ROOM: (targetUser) => ({
    type: types.REVERT_TEMP_ROOM,
    payload: { targetUser },
  }),
  ADD_ROOM: (room) => ({
    type: types.ADD_ROOM,
    payload: room,
  }),
  SEND_MESSAGE: (message) => async (dispatch) => {
    try{
      dispatch({ type: types.SEND_MESSAGE_REQUEST })
      await sendMessage(message)

      dispatch({ type: types.SEND_MESSAGE_SUCCESS, payload: message })
      
    } catch (error){
      dispatch({
        type: types.SEND_MESSAGE_FAILURE,
        payload: error.message
      })
    }

  },
  SEND_MESSAGE_REQUEST: () => ({
    type: types.SEND_MESSAGE_REQUEST,
  }),
  SEND_MESSAGE_SUCCESS: (message) => ({
    type: types.SEND_MESSAGE_SUCCESS,
    payload: message
  }),
  SEND_MESSAGE_FAILURE: (error) => ({
    type: types.SEND_MESSAGE_FAILURE,
    payload: error
  })
}
