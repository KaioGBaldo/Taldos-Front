// Arquivo criado: 27/12/2022 às 00:48
import Loadings from '@/components/Loadings'
import SetConquista from '@/lib/frontEnd/setConquista'
import { getAuthUser, logoutUser } from '@/lib/frontEnd/auth'
import { apoiaseLink } from '@/lib/frontEnd/vars'
import { toggleLogar } from '@/reducers/loginSlice'
import { setUser } from '@/reducers/userSlice'
import styles from '@/styles/MenuH.module.scss'
import sass from '../styles/variables.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { push as Menu } from 'react-burger-menu'
import { FaArrowLeft, FaDollarSign, FaFolder, FaGlobeAmericas, FaHome, FaMedal, FaPen, FaSignature, FaSignOutAlt, FaUserFriends } from 'react-icons/fa'
import { GiGears } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import ActiveLink from './ActiveLink'

export const MenuH = ({
  children,
  showPaginaInicial = true,
  invertColor = false,
  showVoltar = false,
  title = '',
  mesa = false
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const [logged, setLogged] = useState(false)
  const [hasAssinatura, setHasAssinatura] = useState(false)

  useEffect(() => {
    const authUser = getAuthUser()

    if (authUser) {
      dispatch(setUser(authUser))
      dispatch(toggleLogar(true))
      setLogged(true)
      setHasAssinatura(!!authUser.assinatura)
    } else {
      setLogged(false)
      router.isReady && router.push('/login')
    }
  }, [dispatch, router])

  useEffect(() => {
    document.title = `Taldo Bar's - ${title}`
  }, [title])

  const handleSingOut = () => {
    logoutUser()
    dispatch(toggleLogar(false))
    dispatch(setUser({
      email: '',
      foto: null,
      nome: '',
      token: null,
      assinatura: false
    }))

    router.push('/login')
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
          onClick={() => SetConquista(22, userState)}
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
