// Arquivo criado: 28/01/2023 às 13:13

import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from '@/api/auth/[...nextauth].js'
import { unstable_getServerSession } from 'next-auth/next'
import User from 'classes/User'
import { ILogado } from '@/interfaces/logado'
import IMemoria from '@/interfaces/memoria'

type Data = {
  memoria?: IMemoria
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

      return await user.memoria().then((memoria: IMemoria) => {
        return res.status(200).json({ memoria })
      }).catch(() => {
        return res.status(200).json({
          error: 'Erro ao buscar informações do usuário'
        })
      })
    }

    return res.status(200).json({ error: 'Unauthorized' })

  }
}
