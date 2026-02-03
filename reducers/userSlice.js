import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    foto: null,
    nome: '',
    new: false,
    notificationToken: '',
    som: false,
    token: null,
    assinatura: false
  },
  reducers: {
    setUser(state, action) {
      // object.assign() pega um objeto e adiciona as propriedades de outro objeto ou substitui as propriedades do primeiro objeto
      // No caso, o state é o objeto que vai receber as propriedades do action.payload
      // logo, o objetivo é apenas atualizar as propriedades ja existentes e não criar novas
      Object.assign(state, action.payload)
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
