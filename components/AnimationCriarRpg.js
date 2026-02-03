// Arquivo criado: 04/01/2023 às 19:23

import img1 from '@/assets/criar-rpg-1.png'
import img2 from '@/assets/criar-rpg-2.png'
import img3 from '@/assets/criar-rpg-3.png'
import sass from '@/styles/variables.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { ClimbingBoxLoader } from 'react-spinners'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const AnimationCriarRpg = () => {

  const [textAnimation, setTextAnimation] = useState('')

  const iniciarAnimation = () => {

    setTextAnimation(frases[Math.floor(Math.random() * frases.length)])

    setInterval(() => {
      setTextAnimation(frases[Math.floor(Math.random() * frases.length)])
    }, 4000)

  }

  useEffect(() => {
    iniciarAnimation()
  }, [])

  return (
    <div className='animation-criar-rpg animate__animated animate__zoomInUp'>
      <h2 style={{ fontWeight: 'lighter', fontSize: 20 }}>Estamos preparando seu RPG :)</h2>
      <br />
      <p>Taldo&lsquo;s Bar - O RPG do seu jeito !</p>
      <br />
      <Slider fade={false} dots={false} arrows={false} autoplay={true} autoplaySpeed={5000} infinite={true} speed={2000} slidesToShow={1} slidesToScroll={1} >
        <div><Image alt='' width={img3.width} height={img3.height} src={img3.src} className='ico-animation-criar-rpg' /></div>
        <div><Image alt='' width={img2.width} height={img2.height} src={img2.src} className='ico-animation-criar-rpg' /></div>
        <div><Image alt='' width={img1.width} height={img1.height} src={img1.src} className='ico-animation-criar-rpg' /></div>
      </Slider>
      <br />
      <p>{textAnimation}...</p>
      <br />
      <br />
      <br />
      <br />
      <ClimbingBoxLoader color={sass.corPrincipal} />
    </div>
  )

}

const frases = ['Encerrando os cajados', 'Praticando as magias', 'Construindo a taverna', 'Agitando o bárbaro', 'Roubando o Dragão', 'Cantando com o bardo', 'Limpando as canecas', 'Desviando da missão principal', 'Salvando a princesa resgatada', 'Montando no dragão de fogo', 'Explodindo a loja de poções', 'Apredendo magia']

export default AnimationCriarRpg
