// Arquivo criado: 30/12/2022 às 22:10

import SidePlus from '@/components/SidePlus'
import MenuH from '@/components/MenuH'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import ico from '../public/favicon.png'
import Loadings from '@/components/Loadings'

const VerFichas = ({
  fichas = [],
  loading = true,
  PageTitle = '',
  actionPlus = () => { }
}) => {

  const state = useSelector(state => state.user)

  return (
    <MenuH title={PageTitle} invertColor >
      <div className='top-bar-dashboard'>
        <h2>Meus Personagens</h2>
      </div>
      {
        !loading
          ? <div>
            {
              fichas.length > 0
                ? <div className='container fichas flex-center'>
                  {
                    fichas.map((val, index) => {
                      const NomePerson = val.nome !== '' ? val.nome.slice(0, 18) : 'Sem nome'
                      const desc = val.descricao !== '' ? val.descricao.slice(0, 18) : 'Sem descrição'
                      const url = encodeURI(state.email)
                      return (
                        <Link href={`personagens/${url}?i=${val.id}`} key={index} className='ficha-single flex'>
                          <div style={val.img == null ? { backgroundImage: `url(${ico.src})` } : { backgroundImage: `url(${val.img})`, backgroundPosition: 'top' }} className="ficha-image" ></div>
                          <div>
                            <h2>{NomePerson}</h2>
                            <p>{desc > 18 ? `${desc}...` : desc}</p>
                          </div>
                        </Link>
                      )
                    })
                  }
                </div>

                : <div style={{ marginTop: 100, flexDirection: 'column' }} className='flex-center'>
                  <h2>Olá !</h2>
                  <p style={{ textAlign: 'center', marginTop: 10 }}>Aqui ficará os personagens que você deseja criar sem compromisso com nenhum RPG.</p>
                  <p onClick={actionPlus} style={{ marginTop: 10, textDecoration: 'underline', cursor: 'pointer' }} >Criar Personagem</p>
                </div>

            }
          </div>
          : <div className='heigth-100 flex-center'><Loadings /></div>
      }
      <SidePlus action={actionPlus} />
    </MenuH>
  )

}

export default VerFichas
