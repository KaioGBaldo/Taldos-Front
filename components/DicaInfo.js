// Arquivo criado: 28/12/2022 às 18:02
import styles from '@/styles/emblemas.module.scss'
import dayjs from 'dayjs'

export const DicaInfo = ({ h, t, r, d }) => {

  return (
    <div>
      <div className={styles.infoBack}>
        <h2 className={styles.infoText}>{h}</h2>
        <p className={styles.infoText} style={{ marginBottom: 10 }}>{t}</p>
        <span className={`${styles.infoText} ${styles.infoText__requisito}`}>Requisito:</span>
        <span className={`${styles.infoText} ${styles.infoTextSpan}`}> {r}</span>
        {
          d && <p className={styles.dataConquistado}>
            <span>Conquistado: </span>
            {dayjs(new Date(d._seconds * 1000)).format('DD/MM/YYYY')}
          </p>
        }
      </div>
    </div>
  )

}

export default DicaInfo
