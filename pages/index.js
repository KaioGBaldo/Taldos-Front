// Arquivo criado: 21/12/2022 às 17:12
import bg1 from '@/assets/bg1.jpg'
import chamada2 from '@/assets/chamada-2.jpg'
import chamada3 from '@/assets/chamada-3.jpg'
import finalbg from '@/assets/finalbg.jpg'
import ModalAds from '@/components/ads/default'
import HeaderPage from '@/components/HeaderPage'
import MenuFront from '@/components/MenuFront'
import scrollTo from '@/lib/frontEnd/scrollTo'
import { grupoDiscordLink, twitterLink } from '@/lib/frontEnd/vars'
import sass from '@/styles/variables.module.scss'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsDiscord, BsShieldFillCheck } from 'react-icons/bs'
import { FaCodepen, FaSlideshare, FaUserAlt } from 'react-icons/fa'
import { GiAxeInLog, GiBowman, GiGears } from 'react-icons/gi'
import { ImUsers } from 'react-icons/im'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ico from '../public/favicon.png'

export const Home = ({ data }) => {

  const chamada1Boxs = useRef(null)
  const chamada2Boxs = useRef(null)
  const endChamada1 = useRef(null)

  const router = useRouter()

  const urlParametros = new URLSearchParams(router.asPath.split('?')[1])
  const parametro = urlParametros.get('i')

  useEffect(() => {
    AOS.init()

    const verifyIfExist = (ref) => {
      if (ref.current) {
        return true
      }
      return false
    }

    setTimeout(() => {
      verifyIfExist(chamada1Boxs) && chamada1Boxs.current.children[0].classList.add('animate__bounceIn')
      verifyIfExist(chamada2Boxs) && chamada2Boxs.current.children[0].classList.add('animate__bounceIn')
    }, 1000)

    setTimeout(() => {
      verifyIfExist(chamada1Boxs) && chamada1Boxs.current.children[1].classList.add('animate__bounceIn')
      verifyIfExist(chamada2Boxs) && chamada2Boxs.current.children[1].classList.add('animate__bounceIn')
    }, 2000)

    setTimeout(() => {
      verifyIfExist(chamada1Boxs) && chamada1Boxs.current.children[2].classList.add('animate__bounceIn')
      verifyIfExist(chamada2Boxs) && chamada2Boxs.current.children[2].classList.add('animate__bounceIn')
    }, 3000)

    setTimeout(() => {
      verifyIfExist(chamada1Boxs) && chamada1Boxs.current.children[3].classList.add('animate__bounceIn')
      verifyIfExist(chamada2Boxs) && chamada2Boxs.current.children[3].classList.add('animate__bounceIn')
    }, 4000)

    setTimeout(() => {
      verifyIfExist(endChamada1) && endChamada1.current.classList.add('animate__flipInX')
    }, 7000)

  }, [])

  useEffect(() => {
    if (parametro != null) {
      setTimeout(() => {
        scrollTo(parametro)
      }, 1000)
    }
  }, [parametro])

  const firstSwitch = val => {
    switch (val) {
    case 'AiOutlineEdit':
      return <AiOutlineEdit size={60} />
    case 'FaSlideshare':
      return <FaSlideshare size={60} />
    case 'ImUsers':
      return <ImUsers size={60} />
    case 'FaCodepen':
      return <FaCodepen size={60} />
    case 'BsDiscord':
      return <BsDiscord size={60} />
    case 'GiAxeInLog':
      return <GiAxeInLog size={60} />
    case 'GiBowman':
      return <GiBowman size={60} />
    case 'BsShieldFillCheck':
      return <BsShieldFillCheck size={60} />
    case 'GiGears':
      return <GiGears size={60} />
    default:
      return ''
    }
  }

  return (
    <MenuFront>
      <ModalAds />
      <div>
        <div style={{ backgroundImage: `url(${ico.src})` }} className='ico-mobile' ></div>
        <div style={{ backgroundImage: `url(${bg1.src})` }} className='bg1'>
          <HeaderPage />
          <div className='chamada-1'>

            <div className='chamada-1-text animate__animated animate__zoomInDown'>
              <h2>{data.chamada1.principal.titulo}</h2>
              <p className='pre-line'>{data.chamada1.principal.fraseDesktop}</p>
              <p>{data.chamada1.principal.fraseMobile}</p>
            </div>

            <div ref={chamada1Boxs} className='chamada-1-boxs'>
              {
                data.chamada1.featuresDestaque.desktop.map((val, index) => (
                  <div key={index} className='chamada-1-box-single animate__animated'>
                    <div>{firstSwitch(val.icon)}</div>
                    <div><p className='pre-line'>{val.frase}</p></div>
                  </div>
                ))
              }
            </div>
            <div ref={chamada2Boxs} className='chamada-1-boxs chamada-1-mobile'>
              {
                data.chamada1.featuresDestaque.mobile.map((val, index) => (
                  <div key={index} className='chamada-1-box-single animate__animated'>
                    <div>{firstSwitch(val.icon)}</div>
                    <div><p className='pre-line'>{!val.show && val.frase}</p></div>
                    {val.show && <div><Link href="/login" style={{ borderColor: sass.corPrincipal, fontSize: 25 }} className='button'>{val.frase}</Link></div>}
                  </div>
                ))
              }
            </div>

            <div ref={endChamada1} className='end-chamada-1 animate__animated' style={{ textAlign: 'center' }}>
              <p className='pre-line'>{data.chamada1.final.frase}</p>
              <Link href="/login" style={{ borderColor: sass.corPrincipal, fontSize: 25 }} className='button'>{data.chamada1.final.button}</Link>
            </div>
          </div>
        </div>

        <section className='container section-chamada-2'>
          <div data-aos="fade-right" className='h2-chamada-2'><h2>{data.sectionChamada2.titulo}</h2></div>
          <div className='infos-container'>

            <div className='img-infos'><div data-aos="zoom-in" style={{ backgroundImage: `url(${chamada2.src})` }} className='img-chamada-2'></div></div>
            <div className='infos-text'>
              {
                data.sectionChamada2.informacoes.map((val, index) => (
                  <div key={index} data-aos="fade-up-left" className='info-text-single'>
                    <div className='ico-info-text-single'>{firstSwitch(val.icon)}</div>
                    <div className='info-text-single-text'>
                      <h2>{val.title}</h2>
                      <p>{val.mensagem}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>

        <section name="players" className='container funcoes-section'>
          <div className='division-funcoes'>
            <div data-aos="flip-left" className='funcoes-single'>
              <h2 className='title-funcoes'>Funções para Players</h2>
              <p>Trazemos inovações para a configuração e montagem de fichas, totalmente personalizavéis desde cores para o fundo, até a utilização da foto do Discord</p>
              <p>Notificações na área de login são a implementação mais recente dessa atual versão, além disso possui liberdade para escrever na área destinada aos pensamentos do seu personagem, tais como um bloco de notas.</p>
              <p>Algumas outras funções particulares são a possibilidade de enviar mensagens privadas aos outros jogadores</p>
            </div>
            <div data-aos="fade-up" style={{ backgroundColor: sass.corPrincipal }} className='line-vertical'></div>
            <div name="mestres" data-aos="flip-right" className='funcoes-single'>
              <h2 className='title-funcoes'>Funções para Mestres</h2>
              <p>Aos mestres destinamos funções particulares, tais como as opções de importarem músicas para a sessão e modifica-lás através do player disponível no painel do mestre</p>
              <p>Poderá criar seus próprios mapas através do nosso criador de mapas, ou mesmo importar um mapa pronto.</p>
              <p>Tokens para os players ou inimigos também podem ser importados para maior comodidade dos mestres</p>
              <p>Além da criação de suas próprias perícias e atributos</p>
            </div>
          </div>
        </section>

        <section className='container funcoes-section'>
          <div className='division-funcoes sobre-flex'>
            <div data-aos="zoom-in" className='funcoes-single single-sobre'>
              <h2 className='title-funcoes'>{data.funcoesSection.title}</h2>
              <p>{data.funcoesSection.p1}</p>
              <div className="traco"></div>
              <p>{data.funcoesSection.p2}</p>
            </div>
            <div className='img-infos-3'><div data-aos="zoom-in" style={{ backgroundImage: `url(${chamada3.src})` }} className='img-chamada-3'></div></div>
          </div>
        </section>

        <section id="sobre-donos-section" className='container sobre-donos-section'>
          <div data-aos="fade-up" className='margin-more'>
            <Slider dots={false} arrows={true} autoplay={true} autoplaySpeed={10000} infinite={true} speed={1000} slidesToShow={1} slidesToScroll={1} >
              {
                data.mensagens.map((val, index) => (
                  <div key={index} className='sobre-single'>
                    <div><FaUserAlt size={35} /></div>
                    <h2>{val.nome}</h2>
                    <h3>{val.cargo}</h3>
                    <div className='linha-owner'></div>
                    <p>&quot;{val.mensagem}&quot;</p>
                  </div>
                ))
              }

            </Slider>
          </div>
        </section>

        <section style={{ backgroundImage: `url(${finalbg.src})` }} className='finalbg'>
          <div className='cover-finalbg'>
            <div className='container container-finalbg'>
              <h2 data-aos="zoom-in-up" className='title-funcoes'>{data.finalbg.title}</h2>
              <div data-aos="zoom-out" className='box-atualizacao'></div>
              <p data-aos="flip-down">Para as próximas atualizações fique ligado no nosso <a href={grupoDiscordLink} rel="noreferrer" target="_blank" style={{ color: '#7289DA', textDecoration: 'underline' }}>discord</a>, e em nosso <a href={twitterLink} rel='noreferrer' target="_blank" style={{ color: '#1DA1F2', textDecoration: 'underline' }}>Twitter</a> !</p>
            </div>
          </div>
        </section>

      </div>
    </MenuFront>
  )

}

// getInitialProps

Home.getInitialProps = async () => {

  const data = {
    chamada1: {
      principal: {
        titulo: 'Venha jogar seu RPG conosco !',
        fraseDesktop: 'Traga seu grupo, faça novos amigos em nossa comunidade, \n crie mapas, fichas, utilize músicas, token, \n importe seus próprios mapas ou crie utilizando nosso criador',
        fraseMobile: 'Totalmente de Graça !'
      },
      featuresDestaque: {
        desktop: [
          {
            icon: 'AiOutlineEdit',
            frase: 'Personalize suas fichas \n O seu limite é a sua imaginação'
          },
          {
            icon: 'FaSlideshare',
            frase: "Participe de nossa comunidade \n Entre em RPG'S ou crie um e jogue com novas pessoas"
          },
          {
            icon: 'ImUsers',
            frase: 'Com total liberdade você será o que quiser, seja mestre ou player'
          },
          {
            icon: 'FaCodepen',
            frase: 'Site feito com as melhores tecnologias do mercado, para assim melhorar a sua experiência'
          }
        ],
        mobile: [
          {
            icon: 'BsDiscord',
            frase: 'Participe da nossa comunidade'
          },
          {
            icon: 'GiAxeInLog',
            frase: 'Personalize seus personagens'
          },
          {
            icon: 'GiBowman',
            frase: 'O limite é a sua imaginação. \n \n Venha Jogar conosco !'
          },
          {
            show: true,
            frase: 'Login !'
          }
        ]
      },
      final: {
        frase: 'Não perca tempo e faça parte você também \n dessa comunidade !',
        button: 'Login !'
      }
    },
    mensagens: [
      {
        nome: 'Kaio G',
        cargo: 'Coordenador e Dono',
        mensagem: 'Creio eu que este seja o projeto mais gratificante da minha vida, em que eu faço noção só o que eu gosto, mas como faço outras pessoas terem a oportunidade de ver o mundo como eu também vejo'
      },
      {
        nome: 'Flaviano',
        cargo: 'Full-Stack Developer e Dono',
        mensagem: "O Taldo's Bar é uma filosofia de vida. Está sendo uma experiência incrível desenvolver este bar tão querido."
      }
    ],
    sectionChamada2: {
      titulo: 'O que trazemos de novo ?',
      informacoes: [
        {
          icon: 'BsShieldFillCheck',
          title: 'Proteção total',
          mensagem: ' Com as melhores linhas de código, e as melhores tecnologias no mercado, disponibilizamos esse site com total segurança pra vocês que forem usar. Além disso atualizamos e trabalhamos constantemente para trazer cada vez mais segurança.'
        },
        {
          icon: 'GiGears',
          title: 'Personalização',
          mensagem: 'Trazemos pra você a opção de personalização de cores no site, além da personalização total quanto a fichas, notificações na sua área de trabalho, fotos de personagens e nas próximas atualizações, mapas!!'
        },
        {
          icon: 'BsDiscord',
          title: 'Comunidade no discord',
          mensagem: 'Contamos com uma enorme comunidade no Discord, e com administradores responsavéis para promover a melhor e mais completa experiência de jogar RPG com seus amigos, com nossa comunidade viva!!'
        }
      ]
    },
    funcoesSection: {
      title: 'Sobre nós:',
      p1: 'A nossa equipe começou como um pequeno e excêntrico grupo de RPG, buscando uma forma simples e prática de utilizar tudo que sabiamos para aperfeiçoar cada ponto para uma experiência imersiva.',
      p2: 'E é aí que o nosso site entra, buscamos trazer e juntar de forma mais simples e prática para desde um mestre iniciante, ao mais avançado, utilizar todas as nossas ferramentas, tais como uma função de fazer mapas, importar arquivos, utilizar players de música, integração com o discord, dentre outras funcionabilidades, aproveitando e acima de tudo se divertindo o máximo possível !'
    },
    finalbg: {
      title: 'Últimas atualizações:'
    }
  }

  return { data }
}

export default Home
