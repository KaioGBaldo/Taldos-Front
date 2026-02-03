// Arquivo criado: 28/01/2023 às 11:25
import styles from '@/styles/ProgressBar.module.scss'

interface Props{
  value: number
  max: number,
  color?: string,
  showValue?: boolean
}

const ProgressBar = ({
  value,
  max,
  color = '#333',
  showValue = false
}: Props) => {

  const percent = (value * 100) / max

  return (
    <div className={styles.container}>

      <div className={styles.progress} style={{ backgroundColor: color, width: `${percent}%` }} ></div>

      <div
        className={styles.values}
      >
        {
          showValue && <span>{value} / {max}</span>
        }
      </div>
    </div>
  )

}

export default ProgressBar
