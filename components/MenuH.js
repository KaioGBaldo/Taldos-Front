// Arquivo criado: 27/12/2022 às 00:48
import SetConquista from '@/lib/frontEnd/setConquista'
import { signOut, useSession } from 'next-auth/react'
import styles from '@/styles/MenuH.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { push as Menu } from 'react-burger-menu'
import { FaArrowLeft, FaDollarSign, FaFolder, FaGlobeAmericas, FaHome, FaMedal, FaPen, FaSignature, FaSignOutAlt, FaUserFriends } from 'react-icons/fa'
import { GiGears } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { setUser } from 'reducers/userSlice'
import { apoiaseLink } from '../lib/frontEnd/vars'
import sass from '../styles/variables.module.scss'
import ActiveLink from './ActiveLink'
import Loadings from '@/components/Loadings'

export const MenuH = ({
  children,
  showPaginaInicial = true,
  invertColor = false,
  showVoltar = false,
  title = '',
  mesa = false
}) => {

  const { data: session } = useSession()
  const router = useRouter()
  const dispatch = useDispatch()
  const [logged, setLogged] = useState(false)

  // eu posso recuperar o valor da assinatura do usuário com o redux mas como eu não chamo o useSelector(redux) aqui e acabo
  // pegando a informação pego backEnd aqui no useEffect. decidi criar um hook para informar se o usuário tem assinatura ou não
  const [hasAssinatura, setHasAssinatura] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/restricted')
      const json = await res.json()

      if (json.ok) {
        if (session) {
          setLogged(true)
          dispatch(setUser({
            email: session.user.email,
            foto: session.user.image,
            nome: session.user.name,
            token: session.accessToken,
            assinatura: json.assinatura
          }))
          setHasAssinatura(json.assinatura)
        }
      } else {
        setLogged(false)
        router.isReady && router.push('/')
      }

    }
    fetchData()
  }, [dispatch, router, session])

  useEffect(() => {
    document.title = `Taldo Bar's - ${title}`
  }, [title])

  const handleSingOut = () => {
    document.cookie = 'end=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'int=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    signOut({ callbackUrl: '/login' })

  }

  return (
    <div className={`profile-div ${!invertColor ? 'other-nav' : ''}`}>
      <Menu>

        {
          showVoltar && <p
            className="menu-item pointer"
            onClick={() => router.back()}
          >
            <FaArrowLeft /> Voltar
          </p>
        }

        {
          showPaginaInicial && <ActiveLink className="menu-item" href="/h"><FaHome /> Início</ActiveLink>
        }

        <ActiveLink className="menu-item" href={'/h/rpgs'}><FaGlobeAmericas /> RPG&apos;s</ActiveLink>
        <ActiveLink className="menu-item" href={`/${mesa ? 'm' : 'h'}/anotacoes`}><FaPen /> Anotações</ActiveLink>
        <ActiveLink className="menu-item" href={`/${mesa ? 'm' : 'h'}/personagens`}><FaUserFriends />{mesa ? 'Fichas' : 'Personagens'}</ActiveLink>
        <ActiveLink className="menu-item" href={'/h/arquivos'}><FaFolder /> Arquivos</ActiveLink>
        <ActiveLink className="menu-item" href={'/h/emblemas'}><FaMedal /> Meus Emblemas</ActiveLink>
        <ActiveLink className="menu-item" href={`/${mesa ? 'm' : 'h'}/ajustes`}><GiGears /> Ajustes</ActiveLink>

        {
          hasAssinatura
            ? <a
              style={{ marginTop: 25, cursor: 'pointer' }}
              className='menu-item'
              href='/faturamento'
              target='_blank'
              rel='noreferrer'
            >
              <FaSignature /> Faturamento
            </a>
            : <ActiveLink
              className={`menu-item animate__animated animate__bounceIn ${styles.planoLink}`}
              href='/h/plano'
            >
              <FaSignature /> Taldo Plus
            </ActiveLink>
        }

        <a
          target="_blank"
          rel='noreferrer'
          className='menu-item'
          onClick={() => SetConquista(22, session.user)}
          href={apoiaseLink}
        >
          <FaDollarSign /> Nos Apoie
        </a>
        <p
          style={{ marginTop: 20, cursor: 'pointer' }}
          onClick={handleSingOut}
          className='menu-item'
        >
          <FaSignOutAlt /> Sair
        </p>
      </Menu>

      <div style={{ color: sass.corPrincipal, minHeight: '100vh' }}>
        {
          logged
            ? children
            : <div className="flex-center heigth-100">
              <Loadings size={15} />
            </div>
        }
      </div>
    </div>
  )

}

export default MenuH
