// Arquivo criado: 28/12/2022 às 18:55

import logo from '@/ordem_paranormal/logo.png'
import roleta from '@/ordem_paranormal/roleta.png'
import styles from '@/styles/layouts/ordem_paranormal/ver.module.scss'
import { useState } from 'react'
import ico from '../../../public/favicon.png'

export const VerOP = () => {

  // validar se esse personagem está como privado para n deixar outras pessoas conseguirem ver.
  // pegar as informações do personagem de duas formas. uma é caso elas venham pro props e a outra caso tenha q puxar do banco de dados.

  const [infos, setInfos] = useState([
    {
      nome: 'Vida',
      valor: 51,
      maximo: 51,
      id: '1',
      color: '#7C1D1B',
      inputs: [
        {
          nome: 'Lesão Grave',
          valor: true
        },
        {
          nome: 'Incosciente',
          valor: false
        },
        {
          nome: 'Morrendo',
          valor: false
        }
      ]
    },
    {
      nome: 'Sanidade',
      valor: 20,
      color: '#090D57',
      maximo: 51,
      id: '123',
      inputs: [
        {
          nome: 'Traumatizado',
          valor: false
        },
        {
          nome: 'Enlouquecido',
          valor: false
        }
      ]
    },
    {
      nome: 'Ocultismo',
      valor: 8,
      color: '#450B6F',
      maximo: 51,
      id: 'asd',
      inputs: []
    }
  ])

  const changeBarValue = (e) => {
    const value = e.target.value
    if (value > 51) {
      e.target.value = 51
    }
  }

  const saveBarValue = (item, e) => {
    const intValue = parseInt(e.target.value)
    if (intValue !== item.valor) {

      setInfos(infos.filter(info => {
        if (info.id === item.id) {
          info.valor = intValue
        }
        return info
      }))

      // salvar a alteração no banco de dados
    }
  }

  return (
    <>
      <div className={styles.logoContent}>
        <div style={{ backgroundImage: `url(${logo.src})` }}></div>
      </div>

      <div className={styles.titleContent}>
        <h2>{data.titulo}</h2>
      </div>

      <div className={styles.infosContent}>
        <div className={styles.infosContent__imgContent}>
          <div style={{ backgroundImage: `url(${roleta.src})` }}>
            <span className={styles.infosContent__imgContent_agi}>3</span>
            <span className={styles.infosContent__imgContent_for}>1</span>
            <span className={styles.infosContent__imgContent_int}>0</span>
            <span className={styles.infosContent__imgContent_pre}>3</span>
            <span className={styles.infosContent__imgContent_vig}>4</span>
          </div>
        </div>

        <div className={styles.infosContent__perfil}>
          <div className={styles.infosContent__perfil_img} style={{ backgroundImage: `url(${ico.src})` }}></div>
          <div>
            {
              infos.map((item, index) => (
                <div className={styles.infosContent__perfil__barras} key={index}>
                  <h4>{item.nome}</h4>
                  <div className={styles.infosContent__perfil__barras__barraSingle}>
                    <div
                      className={styles.infosContent__perfil__barras__barraSingle_inside}
                      style={{ backgroundColor: item.color, width: `${(item.valor / item.maximo) * 100}%` }}
                    >
                      <div className={styles.infosContent__perfil__barras__barraSingle_inside_value}>
                        <input
                          maxLength={2}
                          onFocus={(e) => e.target.select()}
                          onChange={changeBarValue}
                          onBlur={(e) => saveBarValue(item, e)}
                          type="text"
                          defaultValue={item.valor} /> / {item.maximo}
                      </div>
                    </div>
                  </div>
                  <div className={styles.infosContent__perfil__barras__options}>
                    {
                      item.inputs.map((val, index) => (
                        <label key={index}>
                          <input type="checkbox" defaultChecked={val.valor} />
                          <span>{val.nome}</span>
                        </label>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className={styles.fichaContent}>

      </div>

      <div className={styles.fichaContent}>

      </div>
    </>
  )

}

const data = {
  titulo: 'Perfil do Investigador'
}

export default VerOP
