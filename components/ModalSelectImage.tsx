// Arquivo criado: 26/01/2023 às 15:39
import styles from '@/styles/ModalSelectImage.module.scss'
import { Emoji } from 'interfaces/emojis'
import { useState } from 'react'
import { GoX } from 'react-icons/go'
import Files from './Files'
import Folders from './Folders'

interface Props {
  handleOpen: (open: boolean) => void
  handleSelectedImage: (image: string) => void
}

const ModalSelectImage = ({
  handleOpen,
  handleSelectedImage
}: Props) => {

  const [handleView, setHandleView] = useState(true)

  const closeModal = () => {
    handleOpen(false)
  }

  // hooks para manipular a area de files:
  const [arquivos, setArquivos] = useState([])
  const [isLoading, setLoading] = useState(true)

  // hooks para manipular a area de folders:
  const [pastas, setPastas] = useState([])

  return (
    <div
      onClick={closeModal}
      className={styles.container}
    >
      <div onClick={e => e.stopPropagation()} className={styles.modal}>
        <div className={styles.modal__header}>
          <h3>{Emoji.folder} Seus Arquivos:</h3>
          <GoX onClick={closeModal} />
        </div>
        <div className={styles.modal__body}>
          {
            handleView === true
              ? <Folders
                pastas={pastas}
                setPastas={setPastas}
                action={setHandleView}
              />
              : (
                <Files
                  arquivos={arquivos}
                  setArquivos={setArquivos}
                  isLoading={isLoading}
                  setLoading={setLoading}
                  idPasta={handleView}
                  action={handleSelectedImage}
                />
              )
          }
        </div>
      </div>
    </div>
  )

}

export default ModalSelectImage
