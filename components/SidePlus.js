// Arquivo criado: 30/12/2022 às 20:57
import styles from '@/styles/SidePlus.module.scss'
import { FaPlus } from 'react-icons/fa'

const SidePlus = ({
  action = () => {}
}) => {

  return (
    <div
      onClick={action}
      className={styles.container}
    >
      <FaPlus />
    </div>
  )

}

export default SidePlus
