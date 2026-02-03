import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogged: false
  },
  reducers: {
    toggleLogar(state, action) {
      state.isLogged = action.payload
    }
  }
})

export const { toggleLogar } = loginSlice.actions
export default loginSlice.reducer
