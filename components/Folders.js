// Arquivo criado: 26/01/2023 às 17:40
import BackEnd from '@/lib/frontEnd/toBack'
import styles from '@/styles/Folders.module.scss'
import Tippy from '@tippyjs/react'
import { Emoji } from 'interfaces/emojis'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaFolder } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import 'tippy.js/dist/tippy.css'
import Loadings from '@/components/Loadings'

const Folders = ({
  action,
  setPastas,
  pastas
}) => {

  const [isLoading, setLoading] = useState(true)
  const state = useSelector(state => state.user)

  useEffect(() => {

    const getInfos = async () => {
      BackEnd('arquivos/get', {
        email: state.email
      }).then(data => {
        setPastas(data)
        setLoading(false)
      }).catch(() => {
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível carregar as informações. Tente novamente mais tarde!',
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(() => {
          setLoading(false)
        })
      })
    }

    if (state.email && state.token) getInfos()
  }, [setPastas, state.email, state.token])

  const sendPastaName = pasta => {
    sessionStorage.setItem('pasta', JSON.stringify(pasta))
  }

  const handleClick = (e, pasta) => {

    if (action) {
      e.preventDefault()

      action(pasta.uid_folder)
      return
    }

    sendPastaName(pasta)
  }

  return (
    <>
      {
        !isLoading
          ? <div>
            {
              pastas.length > 0
                ? <div className={`${styles.container} container`}>
                  {
                    pastas.map(pasta => {
                      const pastaNome = pasta.nome.length > 19 ? pasta.nome.slice(0, 19) + '...' : pasta.nome
                      return (
                        <Tippy content={<span className={styles.pastaSingle__tooltip}>{pasta.nome}</span>} key={pasta.uid_folder}>
                          <Link onClick={(e) => handleClick(e, pasta)} className={styles.pastaSingle} href={`arquivos/${pasta.uid_folder}`}>
                            <FaFolder />
                            <span>{pastaNome}</span>
                          </Link>
                        </Tippy>
                      )
                    })
                  }
                </div>
                : <div className='heigth-100 flex-center'>
                  <p className='text-center'>Você ainda não possui nenhuma pasta {Emoji.sad}</p>
                </div>
            }
          </div>
          : <div className='heigth-100 flex-center'><Loadings /></div>
      }
    </>

  )

}

export default Folders
