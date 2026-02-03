// Arquivo criado: 22/12/2022 às 15:33
import styles from '@/styles/ButtonDefault.module.scss'

export const ButtonDefault = ({
  children,
  type,
  onClick,
  sx = {},
  className = ''
}) => {

  return (
    <button
      onClick={onClick}
      style={sx}
      className={`${className} ${styles.button} ${type && styles[`button_${type}`]}`}
    >
      {children}
    </button>
  )
}

export default ButtonDefault
