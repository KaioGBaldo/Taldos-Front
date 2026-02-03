// Arquivo criado: 23/12/2022 às 23:32
import MenuH from '@/components/MenuH'
import SetConquista from '@/lib/frontEnd/setConquista'
import { apoiaseLink, pallete } from '@/lib/frontEnd/vars'
import styles from '@/styles/h.module.scss'
import sass from '@/styles/variables.module.scss'
import Link from 'next/link'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export const H = () => {

  const state = useSelector(state => state.user)

  const handleConquista = id => {
    SetConquista(id, state)
  }

  // coloquei aqui só para a page funcionar. dps eu deleto
  const criarRpg = false

  return (
    <MenuH title='Início' showPaginaInicial={false} >
      <div>
        <div className={styles.homeplayer}>
          <div style={{ backgroundColor: sass.corPrincipal }} className={styles.barTopProfile}>
            <div className={styles.wrapImgAndP}>
              {(state.foto == null) ? <div className={`${styles.imgUser} animate__animated animate__rotateIn`}></div> : <div style={{ backgroundImage: `url(${state.foto})` }} className={`${styles.imgUser} ${styles.imgReal} animate__animated animate__rotateIn`}></div>}
              <div onClick={() => SetConquista(22, state)}><a target="_blank" rel='noreferrer' href={apoiaseLink} className={`${styles.pBarTop} animate__animated animate__jackInTheBox`}>{data.apoiaseMsg}</a></div>
            </div>
            <Link href="/h/emblemas" className={`${styles.pBarTop} animate__animated animate__heartBeat`}>{data.conquistasMsg}</Link>
          </div>

          <section className={`${styles.profileFlex} container `}>
            <div style={{ borderColor: sass.corPrincipal }} className={styles.sidesProfile}>
              <div style={{ borderColor: sass.corPrincipal }} className={`${styles.boxSideProfile} animate__animated animate__fadeInUp`}>
                <h3>{data.tituloLeft}</h3>
                <h3>{data.complementoTituloLeft}</h3>
                <div style={{ height: 2, backgroundColor: sass.corPrincipal, marginLeft: 60, marginRight: 60 }}></div>
                <p className='pre-line'>{data.chamadaComConquista.frase} <Link href="/emblemas">{data.chamadaComConquista.conquista}</Link> !!!</p>

                <div className={styles.missionProfileBox}>
                  {
                    data.tutorial.objetivos.map((item, index) => (
                      <div key={index} className={styles.singleMission}>
                        <div className={styles.boxNumberMission}>
                          <p>
                            {
                              criarRpg === true
                                ? <FaCheck color={pallete.success} />
                                : index + 1
                            }
                          </p>
                          {
                            !item.ultimo ? <div className={styles.lineHeigth}></div> : ''
                          }
                        </div>
                        <h2 className={(criarRpg === true) ? styles.strike : ''}>{item.titulo}</h2>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className={`${styles.sidesProfile} animate__animated animate__fadeInUp`}>
              <h2 style={{ borderColor: sass.corPrincipal }} className={`${styles.titleSidesProfile} animate__animated`}>Aprenda com o Taldo</h2>

              <div onClick={() => handleConquista(1)} style={{ borderColor: sass.corPrincipal }} className={`${styles.tutorials} flex-center`}><p>Tutorial Iniciante</p></div>
              <div onClick={() => handleConquista(3)} style={{ borderColor: sass.corPrincipal }} className={`${styles.tutorials} flex-center`}><p>Tutorial Avançado</p></div>

              <div className={`${styles.youToo} flex-center`}>
                <h1 style={{ borderColor: sass.corPrincipal }}>{data.criar.titulo}</h1>
                <Link href="/h/criar-rpg"><h2 style={{ borderColor: sass.corPrincipal }}>{data.criar.chamada}</h2></Link>
              </div>
            </div>
          </section>

        </div>
      </div>
      {/* <audio loop={true} id="audio"><source src={audio}></source></audio> */}
      {/* <Dado /> */}
    </MenuH>
  )

}

const data = {
  apoiaseMsg: 'Seja um apoiador',
  conquistasMsg: 'Meus Emblemas',
  tituloLeft: 'Bem vindo ao Taldo Bars !',
  complementoTituloLeft: 'Sinta-se à vontade, você sempre faz falta por aqui !!',
  chamadaComConquista: {
    frase: 'Complete todas as tarefas restantes e ganhe um \n emblema de ',
    conquista: 'Pequeno Explorador'
  },
  tutorial: {
    id: 1,
    objetivos: [
      {
        titulo: 'Crie uma mesa de RPG'
      },
      {
        titulo: 'Convide seus amigos para sua mesa'
      },
      {
        titulo: 'Crie um mapa'
      },
      {
        titulo: 'Crie uma Ficha como Mestre',
        ultimo: true
      }
    ]
  },
  criar: {
    titulo: 'Crie você também',
    chamada: 'Crie aqui sua nova mesa'
  }
}

export default H
