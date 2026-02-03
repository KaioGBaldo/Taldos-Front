// Arquivo criado: 27/01/2023 às 23:56
import styles from '@/styles/Ajustes.module.scss'
import MenuH from '@/components/MenuH'
import { Emoji } from '@/interfaces/emojis'
import { useSelector } from 'react-redux'
import IUser from '@/interfaces/user'
import ProgressBar from '@/components/ProgressBar'
import ButtonDefault from '@/components/ButtonDefault'
import linkPlano from '@/lib/frontEnd/LinkPlano'
import sass from '@/styles/variables.module.scss'
import { FaCheck } from 'react-icons/fa'
import showNotification from '@/lib/frontEnd/showNotification'
import { useEffect, useState } from 'react'
import BackEnd from '@/lib/frontEnd/toBack'
import Swal from 'sweetalert2'
import IMemoria from '@/interfaces/memoria'

const Ajustes = () => {

  const state = useSelector((state: { user: IUser }) => state.user)
  const inUserColor = sass.corPrincipal

  const [memoria, setMemoria] = useState<IMemoria>({
    total: 0,
    used: 0
  })

  useEffect(() => {

    const getConquistas = async () => {
      BackEnd('getMemoria').then((data: { memoria: IMemoria }) => {
        setMemoria({
          total: data.memoria.total,
          used: data.memoria.used
        })
      }).catch(() => {
        Swal.fire('Ops...', 'Ocorreu um erro ao tentar carregar os dados', 'error')
      })
    }

    if (state.email && state.token) getConquistas()

  }, [state.email, state.token])

  return (
    <MenuH
      title='Ajustes'
      invertColor
    >
      <div className='top-bar-dashboard'>
        <h2>Ajustes</h2>
      </div>

      <div className={styles.container}>
        <div className={styles.container_single}>

          <div className={styles.container__espaco}>
            <h2>Seu espaço no bar {Emoji.eyes}</h2>
            <div className={styles.container__espaco_progressBar}>
              <ProgressBar
                max={memoria.total}
                value={memoria.used}
              />
            </div>

            <p>
              {
                (memoria.used < 10 ** 6)
                  ? `${(memoria.used / 10 ** 3).toFixed(0)} KB `
                  : `${(memoria.used / 10 ** 6).toFixed(1)} MB `
              }

              Utilizados / {
                (memoria.total < 10 ** 9)
                  ? `${(memoria.total / 10 ** 6)} MB `
                  : `${(memoria.total / 10 ** 9).toFixed(1)} GB `
              }
            </p>

            {
              !state.assinatura && (
                <div className={styles.container__espaco_button}>
                  <ButtonDefault
                    onClick={() => linkPlano(state.email)}
                    type={1}>
                    Comprar mais espaço {Emoji.rocket}
                  </ButtonDefault>
                </div>
              )
            }
          </div>

          <div className={styles.container__colors}>
            <h2>Escolha as cores do seu bar</h2>
            <div className={styles.container__colors__content}>
              {
                [
                  sass.corPrincipal,
                  'blue',
                  'purple',
                  'lightPink'
                ].map(color => (
                  <div
                    key={color}
                    style={{ backgroundColor: color }}
                    className={styles.container__colors__content__single}
                    onClick={() => showNotification('info', `Em breve ${Emoji.inProgress}`)}
                  >
                    {
                      color === inUserColor && <FaCheck />
                    }
                  </div>
                ))
              }
            </div>
          </div>

        </div>

        <div className={styles.container_single}>
          <div className={styles.container__mensagens}>
            <h2>Seja bem vindo(a) as suas configurações <br /> {state.nome}.</h2>
          </div>

          <div className={styles.container_tipeAccount}>
            <ButtonDefault
              onClick={() => {
                if (state.assinatura) {
                  showNotification('success', 'Você já é um usuário do plano Taldo Plus')
                } else {
                  linkPlano(state.email)
                }
              }}
              type={2}
            >
              {state.assinatura ? 'Taldo Plus' : 'Taldo Free'} {Emoji.sunGlasses}
            </ButtonDefault>
          </div>

          <div className={styles.container__agradecimentos}>
            <p>
              Nós agradecemos imensamente a você por utilizar nossos serviços {Emoji.congration}.
              <br />
              Esperamos que você esteja gostando de tudo que temos a oferecer. {Emoji.heart}
            </p>
          </div>
        </div>
      </div>
    </MenuH>
  )

}

export default Ajustes
