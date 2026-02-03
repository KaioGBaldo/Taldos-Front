import sass from '@/styles/variables.module.scss'
import { useRouter } from 'next/router'

// active link component criado pelo next.js. E eu adaptei.
const ActiveLink = ({ children, href, className }) => {
  const router = useRouter()

  const style = {
    color: router.asPath === href ? sass.corPrincipal : '',
    display: 'block'
  }

  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a className={className} href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink
