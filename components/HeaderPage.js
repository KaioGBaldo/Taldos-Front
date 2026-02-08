import scrollTo from '@/lib/frontEnd/scrollTo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsDiscord } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { apoiaseLink, chatAjudaDiscordLink } from '../lib/frontEnd/vars'
import ico from '../public/favicon.png'
import sass from '../styles/variables.module.scss'

export const HeaderPage = ({
  padrao
}) => {

  const navigate = useRouter()

  const state = useSelector(state => state.login.isLogged)

  if (padrao !== 'link') {
    return (
      <header className='header-principal'>
        <div className='part1-header-principal animate__animated animate__lightSpeedInLeft'>
          <div style={{ backgroundImage: `url(${ico.src})` }} className='icon-header' ></div>
          <p to="scroll" onClick={() => scrollTo('players')} >{d.players}</p>
          <p to="scroll" onClick={() => scrollTo('players')} >{d.mestres}</p>
          <h1>|</h1>
          <a target='_blank' rel="noreferrer" href={apoiaseLink}>{d.apoiase}</a>
          <a target='_blank' rel="noreferrer" href={chatAjudaDiscordLink}>{d.ajuda}</a>
        </div>
        {
          state
            ? <div className='part2-header-principal animate__animated animate__backInRight'>
              <Link href="/h" className='discord-login'><FaHome size={30} /></Link>
              <Link style={{ borderColor: sass.corPrincipal, borderWidth: 1 }} className='button' href="/h">{d.meuPerfil}</Link>
            </div>
            : <div className='part2-header-principal animate__animated animate__backInRight'>
              <span className='discord-login' onClick={() => navigate.push('/login')}><BsDiscord size={30} /></span>
              <Link style={{ borderColor: sass.corPrincipal, borderWidth: 1 }} className='button' href="/login">{d.login}</Link>
            </div>
        }
      </header>

    )
  } else {
    return (
      <header className='header-principal'>
        <div className='part1-header-principal animate__animated animate__lightSpeedInLeft'>
          <div style={{ backgroundImage: `url(${ico.src})` }} className='icon-header' ></div>
          <Link href="/?i=players">{d.players}</Link>
          <Link href="/?i=mestres">{d.mestres}</Link>
          <h1>|</h1>
          <a target='_blank' rel="noreferrer" href={apoiaseLink}>{d.apoiase}</a>
          <a target='_blank' rel="noreferrer" href={chatAjudaDiscordLink}>{d.ajuda}</a>
        </div>
        <div className='part2-header-principal animate__animated animate__backInRight'>
          {
            !state
              ? <span className='discord-login' onClick={() => navigate.push('/login')}><BsDiscord size={30} /></span>
              : <Link href="/h" className='discord-login'><FaHome size={30} /></Link>
          }
          <span
            onClick={() => { navigate.back() }}
            style={{ borderColor: sass.corPrincipal, borderWidth: 1, cursor: 'pointer' }}
            className='button'
          >
            {d.voltarMessage}
          </span>
        </div>
      </header>
    )
  }

}

const d = {
  players: 'Players',
  mestres: 'Mestres',
  apoiase: 'Apoia-se',
  ajuda: 'Ajuda',
  meuPerfil: 'Meu Perfil',
  voltarMessage: 'Voltar',
  login: 'Login'
}

export default HeaderPage
