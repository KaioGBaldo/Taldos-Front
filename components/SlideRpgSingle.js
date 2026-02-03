// Arquivo criado: 03/01/2023 às 15:21
// import styles from '@/styles/littles/SlideRpgSingle.module.scss'
import male from '@/assets/male.png'
import sass from '@/styles/variables.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { IoMdLink } from 'react-icons/io'
import { MdVideoCameraFront } from 'react-icons/md'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const SlideRpgSingle = () => {

  const [peer, setPeer] = useState(6)
  const [usuarios, setUsuarios] = useState([
    {
      info: {
        nome: 'Teste 1'
      }
    }
  ])

  const Ninguem = () => {
    return (
      <div className='wraper-container-users'>
        <div style={{ borderColor: sass.corPrincipal }} className='container-users flex'>
          <div className='cinquenta area-create-any'>
            <p>Convide seu primeiro player aqui!</p>
            <a href={window.origin + '/rpg/convite/'} style={{ borderColor: sass.corPrincipal, cursor: 'pointer' }} className='button'>a</a>
          </div>
          <div className='cinquenta area-create-any'>
            <p>Crie sua primeira ficha aqui!</p>
            <Link style={{ borderColor: sass.corPrincipal }} href={'/dashboard/mestre-fichas/'} className='button'>Criar</Link>
          </div>
        </div>
      </div>
    )
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className + ' arrow-container-rpg-dashboard-slider'}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className + ' arrow-container-rpg-dashboard-slider'}
        style={{ ...style, display: 'block', left: -45 }}
        onClick={onClick}
      />
    )
  }

  const UserInd = (props) => {
    return (
      <div key={props.chave} className='flex container-user-rpg-single'>
        <div className='container-img-user-person-single flex-center'><div style={{ backgroundImage: `url(${male.src})` }} className="person-rpg-single"></div></div>
        <div className='user-rpg-single'>
          <h2>{props.infos.nome} </h2>
          <div className='flex-center icons-rpg-single'>
            <div className='icon-container-rpg'><IoMdLink size={16} /></div>
            <div className='icon-container-rpg'><MdVideoCameraFront size={16} /></div>
            <div className='icon-container-rpg'><FaTrash /></div>
          </div>
        </div>
      </div>
    )
  }

  const Gente = (props) => {

    return (
      <div className='wraper-container-users'>
        <div className='container-users flex'>
          {props.array.map((data, index) => {
            return <UserInd chave={index} key={index} infos={data.info} />
          })}
        </div>
      </div>
    )

  }

  if (usuarios.length < 1) {
    return <Ninguem />
  } else {

    const perChunk = peer

    const dividido = usuarios.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }

      resultArray[chunkIndex].push(item)

      return resultArray

    }, [])

    const arrayGente = []

    for (let index = 0; index < dividido.length; index++) {
      arrayGente.push(<Gente key={index} array={dividido[index]} />)
    }

    return (
      <Slider nextArrow={<SampleNextArrow />} prevArrow={<SamplePrevArrow />} fade={false} dots={true} arrows={true} autoplay={false} infinite={true} speed={1000} slidesToShow={1} slidesToScroll={1} >
        {arrayGente}
      </Slider>
    )
  }

}

export default SlideRpgSingle
