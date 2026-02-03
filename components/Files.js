// Arquivo criado: 26/01/2023 às 18:41
import BackEnd from '@/lib/frontEnd/toBack'
import styles from '@/styles/Files.module.scss'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Swal from 'sweetalert2'
import { FaImage } from 'react-icons/fa'
import Loadings from '@/components/Loadings'
import { Emoji } from 'interfaces/emojis'

const Files = ({
  arquivos = [],
  setArquivos,
  isLoading = true,
  setLoading,
  action,
  idPasta
}) => {

  const state = useSelector(state => state.user)
  const router = useRouter()

  useEffect(() => {

    const getInfos = async () => {
      BackEnd('arquivos/getFile', {
        email: state.email,
        uid_folder: idPasta || router.query.pasta
      }).then(data => {
        setArquivos(data)
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
  }, [idPasta, router.query.pasta, setArquivos, setLoading, state.email, state.token])

  const handleActionFile = arquivo => {
    action(arquivo)
  }

  return (
    <>
      {
        !isLoading
          ? <div>
            {
              arquivos.length > 0
                ? <div className={`${styles.container} container`}>
                  {
                    arquivos.map((arquivo, index) => {
                      const arquivoNome = arquivo.nome.length > 21 ? arquivo.nome.slice(0, 21) + '...' : arquivo.nome
                      return (
                        <Tippy content={<span className={styles.arquivoSingle__tooltip}>{arquivo.nome}</span>} key={index}>
                          <div onClick={() => handleActionFile(arquivo)} className={styles.arquivoSingle}>
                            <div style={{ backgroundImage: `url(${arquivo.link})` }} className={styles.arquivoSingle__img}></div>
                            <div className={styles.arquivoSingle__contentInfos}>
                              <FaImage size={18} />
                              <span>{arquivoNome}</span>
                            </div>
                          </div>
                        </Tippy>
                      )
                    })
                  }
                </div>
                : <div className='heigth-100 flex-center'>
                  <p className='text-center'>Este pasta ainda não possui arquivos {Emoji.sad}</p>
                </div>
            }
          </div>
          : <div className='heigth-100 flex-center'><Loadings /></div>
      }
    </>
  )

}

export default Files
