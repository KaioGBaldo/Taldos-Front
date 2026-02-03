// Arquivo criado: 30/01/2023 às 21:50

import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from '@/api/auth/[...nextauth].js'
import { unstable_getServerSession } from 'next-auth/next'
import User from 'classes/User'
import { ILogado } from '@/interfaces/logado'
import IOp from '@/interfaces/op'

type Data = {
  ok?: boolean
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {

    const logado: ILogado | null = await unstable_getServerSession(req, res, NextAuth)

    if (logado) {

      const user = new User(logado.user.email)
      const data: IOp = req.body

      const handleError = (error: string) => {
        return res.status(200).json({ error })
      }

      if (data.nome === '') return handleError('Nome não pode ser vazio')
      if (data.origem === '') return handleError('Origem não pode ser vazio')
      if (data.classe === '') return handleError('Classe não pode ser vazio')
      if (data.nex === '' || parseInt(data.nex) < 0 || parseInt(data.nex) > 99) return handleError('Nex inválido')
      if (data.pericias.length === 0) return handleError('Informe pelo menos uma perícia')

      if (data.Agi === '') data.Agi = '0'
      if (data.For === '') data.For = '0'
      if (data.Int === '') data.Int = '0'
      if (data.Pre === '') data.Pre = '0'
      if (data.Vig === '') data.Vig = '0'

      if (parseInt(data.Agi) < 0 || parseInt(data.Agi) > 6) return handleError('Agi inválido')
      if (parseInt(data.For) < 0 || parseInt(data.For) > 6) return handleError('For inválido')
      if (parseInt(data.Int) < 0 || parseInt(data.Int) > 6) return handleError('Int inválido')
      if (parseInt(data.Pre) < 0 || parseInt(data.Pre) > 6) return handleError('Pre inválido')
      if (parseInt(data.Vig) < 0 || parseInt(data.Vig) > 6) return handleError('Vig inválido')

      return await user.setPersonagem(data).then(() => {
        return res.status(200).json({ ok: true })
      }).catch(() => {
        return res.status(200).json({
          error: 'Erro ao cadastrar o personagem'
        })
      })
    }

    return res.status(200).json({ error: 'Unauthorized' })

  }

}
