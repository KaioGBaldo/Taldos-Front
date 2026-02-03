// Arquivo criado: 28/12/2022 às 18:43

import VerFichas from '@/components/VerFichas'
import BackEnd from '@/lib/frontEnd/toBack'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export const Personagens = () => {

  const [fichas, setFichas] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [modos, setModos] = useState()
  const state = useSelector(state => state.user)
  const router = useRouter()

  useEffect(() => {

    const getFichas = async () => {
      BackEnd('fichas/get', {
        email: state.email
      }).then(data => {
        setFichas(data)
        setLoading(false)
      }).catch(() => {
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível carregar as fichas',
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(() => {
          setLoading(false)
        })
      })
    }

    if (state.email && state.token) getFichas()
  }, [state.email, state.token])

  useEffect(() => {
    BackEnd('getModosJogo').then(data => {
      // o swal só aceita objeto como inputOptions. então pego o arr vindo do back e transformo em objeto
      setModos(Object.fromEntries(data.map(modo => [modo.id, modo.nome])))
    })
  }, [])

  const novoPersonagem = () => {
    Swal.fire({
      title: 'Tipo de Ficha',
      input: 'select',
      inputOptions: modos,
      showCancelButton: true,
      inputValidator: (value) => {
        if (value.length === 0) {
          return 'Informe o tipo de ficha'
        }
      },
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (modoId) => {
        router.isReady && router.push(`/h/personagens/cadastrar/${modoId}`)
      }
    })
  }

  return (
    <VerFichas
      PageTitle='Meus Personagens'
      fichas={fichas}
      loading={isLoading}
      actionPlus={novoPersonagem}
    />
  )

}

export default Personagens
