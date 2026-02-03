// Arquivo criado: 30/01/2023 às 17:46
import styles from '@/styles/Plano.module.scss'
import MenuH from '@/components/MenuH'
import logo from '../../public/favicon.png'
import ButtonDefault from '@/components/ButtonDefault'
import { FaCheckCircle } from 'react-icons/fa'
import linkPlano from '@/lib/frontEnd/LinkPlano'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import IUser from '@/interfaces/user'

const Plano = () => {

  const state = useSelector((state: { user: IUser}) => state.user)

  const handleAssinatura = () => {

    if (state.assinatura) {
      return Swal.fire(
        'Já é assinante!',
        'Você já possui uma assinatura ativa, para alterar seu plano acesse seu faturamento.',
        'success'
      )
    }

    if (state.email) {
      return linkPlano(state.email)
    }

    return Swal.fire(
      'Ops...',
      'Ocorreu um erro ao tentar iniciar a avaliação gratuita, reinicie a página e tente novamente.',
      'error'
    )
  }

  return (
    <MenuH
      title='Planos'
    >

      <div className={styles.container}>
        <div className={`${styles.topRed} animate__animated animate__slideInDown`}></div>
        <div className={styles.planos}>
          <div className={`animate__animated animate__zoomInDown ${styles.planoSingle}`}>

            <div style={{ backgroundImage: `url(${logo.src})` }} className={styles.planoSingle_imgPlano}></div>
            <div className={styles.planoSingle_header}>
              <h2>Taldo plus</h2>
              <span>Assinatura do Taldo Bar&lsquo;s</span>
            </div>

            <div className={styles.planoSingle_valor}>
              <h1>R$ {data.valor}</h1><span>por mês</span>
            </div>

            <div className={styles.planoSingle_button}>
              <ButtonDefault type={1} onClick={handleAssinatura}>
                Iniciar Avaliação Gratuita
              </ButtonDefault>
            </div>

            <div className={styles.planoSingle_vantagens}>
              <h3>Vantagens:</h3>
              <ul>
                {data.vantagensPlano.map(item => (
                  <li key={item}><FaCheckCircle /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MenuH>
  )

}

export default Plano

const data = {
  valor: '18,90',
  vantagensPlano: [
    'Sem Anúncios',
    "RPG's Ilimitados",
    'Suba arquivos de até 10MB'
  ]
}
