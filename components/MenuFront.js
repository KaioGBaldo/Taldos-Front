// Arquivo criado: 23/12/2022 às 00:57
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { push as Menu } from 'react-burger-menu'
import { FaDiscord, FaDollarSign, FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa'
import { GiBandit } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import sass from '../styles/variables.module.scss'

export const MenuFront = ({
  children
}) => {

  const { login } = useSelector(state => state)
  const route = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  // é necessário deixar o link caso o usuário queira abrir em outra aba. porém
  // é necessário fechar o drawer antes de adicionar o param no link para o scroll da home funcionar.
  const handleLinkWithParams = (a, end) => {
    a.preventDefault()
    setIsOpen(false)
    setTimeout(() => {
      route.push(`/?i=${end}`)
    }, 100)
  }

  return (
    <div>
      <Menu
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        isOpen={isOpen}
      >
        {
          login.isLogged
            ? <Link className="menu-item" href="/h" > <FaHome /> Meu Perfil</Link>
            : <Link className="menu-item" href="/login" ><FaSignInAlt /> Login</Link>
        }
        <Link onClick={(a) => handleLinkWithParams(a, 'players')} className="menu-item" href="/?i=players"><FaUserAlt /> Players</Link>
        <Link onClick={(a) => handleLinkWithParams(a, 'mestres')} className="menu-item" href="/?i=mestres"><GiBandit /> Mestres</Link>
        <a className='menu-item' href="https://apoia.se/taldobars"><FaDollarSign /> Nos Apoie</a>
        {
          login.isLogged
            ? ''
            : <span className='menu-item' onClick={() => signIn('discord', { callbackUrl: '/h' })}><FaDiscord /> Discord</span>
        }

      </Menu>
      <div style={{ color: sass.corPrincipal }}>
        {children}
      </div>
    </div>
  )

}

export default MenuFront
