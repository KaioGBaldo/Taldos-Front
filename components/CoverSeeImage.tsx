// Arquivo criado: 13/01/2023 às 17:49
import styles from '@/styles/CoverSeeImage.module.scss'
import { FaDownload } from 'react-icons/fa'
import { GoX } from 'react-icons/go'
import Swal from 'sweetalert2'
import 'tippy.js/dist/tippy.css'

interface Props {
  image: string
  nome: string
  handle: (data: { isVisible: boolean }) => void
}

const CoverSeeImage = ({
  image = '',
  nome = '',
  handle
}: Props) => {

  const shortName = (): string => {
    const len = 41
    if (nome.length > len) {
      return nome.slice(0, len) + '...'
    }
    return nome
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.nome}>{nome !== '' ? shortName() : 'Imagem'}</h1>
        <div className={styles.header__icons}>
          <FaDownload onClick={() => Swal.fire('Em Breve...', 'Futuramente adicionaremos essa funcionalidade!', 'info')} title='Fazer download' />
          <GoX title='Fechar' onClick={() => handle({ isVisible: false })} size={20} />
        </div>
      </div>
      <div className={`${styles.containerImg} heigth-100`}>
        {/* <Image
          title='Imagem'
          src={image}
          width={1000}
          height={1000}
          quality={100}
          alt="imagem"
          className={styles.imagem}
        /> */}

        <div
          className={styles.imagem}
          title='Imagem'
          style={{
            backgroundImage: `url(${image})`,
            width: 1000,
            height: 1000
          }}
        ></div>
      </div>
    </div>
  )

}

export default CoverSeeImage
