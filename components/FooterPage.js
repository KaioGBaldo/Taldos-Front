// Arquivo criado: 22/12/2022 às 14:44
import Image from 'next/image'
import Link from 'next/link'
import { FaDiscord, FaTiktok, FaTwitter } from 'react-icons/fa'
import { chatAjudaDiscordLink, formularioContatoLink, forumDiscordLink, grupoDiscordLink, tiktokLink, twitterLink } from '../lib/frontEnd/vars'
import ico from '../public/favicon.png'
import styles from '@/styles/footer.module.scss'
import ButtonDefault from '@/components/ButtonDefault'
import scrollTo from '@/lib/frontEnd/scrollTo'

export const FooterPage = () => {

  return (
    <div>
      <div className={styles.footer}>
        <div className={styles.footer__img}>
          <Image width={ico.width} height={ico.height} className={styles.footer__img__single} src={ico.src} alt="Icone" />
        </div>
        <div className={styles.footer__linksContainer} >
          {
            data.uls.map((info, index) => (
              <div key={index}>
                <h3>{info.title}</h3>
                <ul>
                  {
                    info.links.map(link => (
                      <li key={link.name}>
                        {
                          link.action === ''
                            ? <Link target={link.target} rel="noreferrer" href={link.href}>{link.name}</Link>
                            : <p onClick={link.action}>{link.name}</p>
                        }
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
        <div className={styles.footer__socialContainer}>
          <div className={styles.footer__socialContainer__icones}>
            <a target="_blank" rel="noreferrer" href={twitterLink}><FaTwitter name='twitter' /></a>
            <a target="_blank" rel="noreferrer" href={grupoDiscordLink}><FaDiscord name='discord' /></a>
            <a target="_blank" rel="noreferrer" href={tiktokLink}><FaTiktok /></a>
          </div>
          <div className={styles.footer__socialContainer__button}>
            <a target="_blank" rel="noreferrer" href={formularioContatoLink}>
              <ButtonDefault type="1">
                Contato
              </ButtonDefault>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer__end}>
        <p>{data.final.frase}</p>
      </div>
    </div>
  )

}

const data = {
  uls: [
    {
      title: 'Inicio',
      links: [
        { name: 'Home', href: '/', target: '_self', action: '' }
      ]
    },
    {
      title: 'Sobre-nós',
      links: [
        {
          name: 'Conheça a equipe',
          href: '/',
          action: () => {
            scrollTo('sobre-donos-section')
          }
        },
        {
          name: 'Como começamos',
          href: '/',
          action: () => {
            scrollTo('sobre-donos-section')
          }
        }
      ]
    },
    {
      title: 'Suporte',
      links: [
        { name: 'FAQ', href: forumDiscordLink, target: '_blank', action: '' },
        { name: 'Chat', href: chatAjudaDiscordLink, target: '_blank', action: '' }
      ]
    }
  ],
  final: {
    frase: '© 2023 - Todos os direitos reservados'
  }
}

export default FooterPage
