import showNotification from '@/lib/frontEnd/showNotification'
import BackEnd from '@/lib/frontEnd/toBack'

interface UserState {
  token: string | null
  email: string
}

const SetConquista = (id_conquista: string, userState: UserState) => {

  if (userState.token !== null && userState.email.length > 0) {
    BackEnd('emblemas/set', { id_conquista, email: userState.email }).then(r => {
      if (r.message) {
        showNotification('success', 'Conquista desbloqueada!', 6000)
      }
    })
  }
}

export default SetConquista
