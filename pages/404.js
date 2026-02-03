// Arquivo criado: 27/12/2022 às 01:49

import bg from '@/assets/bgregister.jpg'
import avatar from '@/assets/user-not.png'
import HeaderPage from '@/components/HeaderPage'
import ButtonDefault from '@/components/ButtonDefault'
import styles from '@/styles/404.module.scss'
import sass from '@/styles/variables.module.scss'
import { useRouter } from 'next/router'

export const Error = () => {

  const router = useRouter()

  return (
    <div style={{ color: sass.corPrincipal, overflowX: 'hidden', backgroundImage: `url(${bg.src})` }} className={styles.containerNot}>
      <HeaderPage padrao="link" />
      <div className={`${styles.errorPrincipal} Container`}>
        <div className={styles.containerError}>
          <div className={styles.avatarError} style={{ backgroundImage: `url(${avatar.src})` }} ></div>
          <h2>{data.title}</h2>
          <p className='pre-line'>{data.description}</p>
          <br />
          <ButtonDefault type={2} onClick={() => router.replace('/h')}>Voltar para o Bar</ButtonDefault>
        </div>
      </div>
    </div>
  )

}

const data = {
  title: 'Oops!!',
  description: 'Parece que esse lado do Bar ainda não foi criado, \n vá para um local seguro :D'
}

export default Error
