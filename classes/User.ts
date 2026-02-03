import IMemoria from '@/interfaces/memoria'
import IOp from '@/interfaces/op'
import { withAssinatura, withoutAssinatura } from '@/lib/backEnd/assinaturaInfos'
import admin from '@/lib/backEnd/firebase'
import { firestore } from 'firebase-admin'

interface ICount {
  data(): {
    count: number
  }
}

interface IUsuario {
  current_period_end?: number
  memoria?: number
  phone?: string
  customer_id?: string
}

export default class User {

  private _email: string

  constructor(email: string) {
    this._email = email
  }

  async contarRpgs() {
    // Função para contar quantos Rpgs o usuário tem

    try {
      const val = await admin.firestore().collection('rpgs').where('user', '==', this._email).count().get()
        .then((val: ICount) => val.data().count)

      return val
    } catch {
      return 0
    }
  }

  async memoria(): Promise<IMemoria> {
    try {
      return await this.getUserInfos().then(async doc => {

        const assinatura = await this.hasAssinatura()

        if (assinatura) {
          return {
            total: withAssinatura.maxMemoria,
            used: doc.memoria || 0
          }
        }

        return {
          total: withoutAssinatura.maxMemoria,
          used: doc.memoria || 0
        }

      }).catch(() => {
        throw new Error('Erro ao buscar informações do usuário')
      })
    } catch {
      throw new Error('Erro ao buscar informações do usuário')
    }
  }

  async setMemoria(value: number) {
    try {
      return await admin.firestore().collection('usuarios').doc(this._email).set({
        memoria: firestore.FieldValue.increment(value)
      }, { merge: true })
    } catch {
      throw new Error('Erro ao atualizar a memória')
    }
  }

  async setPersonagem(value: IOp) {
    try {
      return await admin.firestore().collection('usuarios').doc(this._email).collection('personagens').add(value)
    } catch {
      throw new Error('Erro ao criar o personagem')
    }
  }

  async hasAssinatura() {
    try {
      return await this.getUserInfos().then(doc => {

        const now = parseInt(Date.now().toString().substring(0, 10))

        if (doc.current_period_end && doc.current_period_end > now) {
          return true
        }

        return false
      })
    } catch {
      return false
    }
  }

  private async getUserInfos() {
    try {
      return await admin.firestore().collection('usuarios').doc(this._email).get().then(doc => {
        return doc.data() as IUsuario
      })
    } catch {
      return {} as IUsuario
    }
  }
}
