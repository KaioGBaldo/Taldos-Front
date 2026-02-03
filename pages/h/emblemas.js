// Arquivo criado: 27/12/2022 às 01:24
import DicaInfo from '@/components/DicaInfo'
import MenuH from '@/components/MenuH'
import BackEnd from '@/lib/frontEnd/toBack'
import styles from '@/styles/emblemas.module.scss'
import sass from '@/styles/variables.module.scss'
import Tippy from '@tippyjs/react'
import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
import { BiDonateHeart, BiWorld } from 'react-icons/bi'
import { FaCamera, FaFolder } from 'react-icons/fa'
import { GiAncientSword, GiAnvilImpact, GiAstronautHelmet, GiBackup, GiBrokenSkull, GiDeathNote, GiDirectorChair, GiEvilBook, GiHalfDead, GiLeakySkull, GiLifeBar, GiLifeSupport, GiMagicAxe, GiRingBox, GiSaberSlash, GiSaberTooth, GiSail, GiStopSign, GiWeightLiftingUp } from 'react-icons/gi'
import { RiLiveFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import 'tippy.js/dist/tippy.css'

export const Emblemas = () => {

  const contentConquistas = useRef(null)
  const state = useSelector(state => state.user)
  const [porcentagemGanho, setPorcentagemGanho] = useState(0)
  const [conquistas, setConquistas] = useState(data.conquistas)

  useEffect(() => {

    const getConquistas = async () => {
      BackEnd('emblemas/get', { email: state.email }).then(res => {

        setConquistas(data.conquistas.filter(item => {

          res.find(item2 => {
            if (item.id === item2.id_conquista) {
              item.tem = true
              item.data = item2.data
            }

            // como o find para no primeiro true, eu preciso retornar o item só se a condição for verdadeira
            return item.id === item2.id_conquista
          })

          return item
        }))

        const lengthEmblemas = data.conquistas.filter(item => item.icon != null).length

        const lengthGanhos = res.length

        setPorcentagemGanho((lengthGanhos * 100) / lengthEmblemas)
      })
    }

    if (state.email && state.token) getConquistas()
  }, [state.email, state.token])

  const uiChanging = () => {

    setInterval(() => {
      if (contentConquistas.current !== null) {
        const bolaDaVez = contentConquistas.current.children[Math.floor(Math.random() * contentConquistas.current.children.length)]

        bolaDaVez.classList.add('singleEmblemaFocused')
        setTimeout(() => {
          bolaDaVez.classList.remove('singleEmblemaFocused')
        }, 2000)
      }
    }, 10000)

  }

  const handleCountUpEnd = () => {
    uiChanging()
    // peguei do jeito padrão pois o ref n aceita em um componente como o countup
    const element = document.querySelector('.porcentagem-p')
    if (element !== null) element.classList.add('animate__tada')
  }

  return (
    <MenuH invertColor title='Emblemas' >
      <div className='rpg-config'>
        <div className='top-bar-dashboard'>
          <h2>Mural</h2>
        </div>
        <div className='container' style={{ maxWidth: 900 }}>
          <CountUp className='porcentagem-p flex-center animate__animated' onEnd={handleCountUpEnd} duration={1.5} end={porcentagemGanho} suffix='%' />
          <div ref={contentConquistas} className={styles.containerEmblemas}>
            {
              conquistas.map((res, index) => {
                if (res.icon != null) {
                  const iconStyle = {
                    opacity: res.ativo ? 1 : 0.3,
                    color: res.tem ? sass.corPrincipal : '#ccc'
                  }
                  return (
                    <Tippy key={index} content={res.ativo ? <DicaInfo t={res.descricao} h={res.nome} d={res.data} r={res.requisito} /> : 'Em breve...'}>
                      <div style={{ borderColor: sass.corPrincipal }} className={`${styles.singleEmblema} flex-center`}>
                        <res.icon style={iconStyle} size={30} />
                      </div>
                    </Tippy>
                  )
                } else {
                  return <div key={index} style={{ cursor: 'default' }} className={`${styles.singleEmblema} flex-center`}></div>
                }
              })
            }
          </div>
        </div>
      </div>
    </MenuH>
  )

}

const data = {
  conquistas: [
    {
      id: 1,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Explorador iniciante',
      descricao: "Conhecendo os seus primeiros passos no taldo's você foi reconhecido como o pequeno explorador, que outras surpresas o aguardam adiante? Siga descobrindo!",
      icon: GiAstronautHelmet,
      requisito: 'Ver o primeiro tutorial'
    },
    {
      id: 2,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Pequeno explorador',
      descricao: 'Assistindo os tutoriais você alcança os primeiros niveis de sabedoria,continue explorando, cumpra as missões e logo saberá tudo!',
      icon: GiAncientSword,
      requisito: 'Cumprir todos os requisitos escritos na area do perfil'
    },
    {
      id: 3,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Aventureiro',
      descricao: 'Você ao terminar seu segundo tutorial, é reconhecido como um aventureiro sábio, e é nomeado assim, para que consiga seguir sua jornada, meus parabéns',
      icon: GiSail,
      requisito: 'Assistir o segundo tutorial'
    },
    {
      id: 4,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Criador de mundos',
      descricao: 'Com o conhecimento adquirido na sua jornada você começa a criar seus primeiros e tão únicos mundos, convide seus amigos, uma aventura espera por vocês!',
      icon: BiWorld,
      requisito: 'Criar seu primeiro RPG'
    },
    {
      id: 5,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Seu primeiro desafio!',
      descricao: 'Ao criar sua ficha você se torna apto a começar sua jornada para o futuro, trazendo consigo experiências e vivências do passado e buscando sorte no seu futuro',
      icon: GiLeakySkull,
      requisito: 'Criar sua primeira ficha'
    },
    {
      id: 6,
      ativo: true,
      tem: false,
      data: null,
      nome: 'A primeira ação!',
      descricao: 'Rolando seu primeiro dado você busca trazer seu futuro a tona, trazendo certezas e boa sorte a si, meus parabéns, o futuro logo começa!',
      icon: GiSaberSlash,
      requisito: 'Rolar seu primeiro dado'
    },
    {
      id: 7,
      ativo: true,
      tem: false,
      data: null,
      nome: 'A primeira queda',
      descricao: 'Conhecer seu inimigo não basta para evitar o primeiro confronto, mas não se preucupe, erga sua cabeça e continue, a aventura não pode parar por uns arranhões!',
      icon: GiSaberTooth,
      requisito: 'Levar o primeiro dano'
    },
    {
      id: 8,
      ativo: false,
      tem: false,
      data: null,
      nome: 'A primeira recompensa',
      descricao: 'Com a benção divina, você recebe seu primeiro item em mãos, trazendo consigo a felicidade por uma jornada recompensadora!',
      icon: GiMagicAxe,
      requisito: 'Receber o primeiro item'
    },
    {
      id: 9,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Conheça a ti mesmo!',
      descricao: 'Por completar todos as lacunas da sua história, você é recompensado, agora você conhece mais a ti mesmo que qualquer outra pessoa!',
      icon: GiEvilBook,
      requisito: 'Completar todos os campos da sua ficha'
    },
    {
      id: 10,
      ativo: false,
      tem: false,
      data: null,
      nome: 'Olhando para o abismo!',
      descricao: 'Ao chegar em 0 de vida, algo acontece, você sente um medo, como será sua vida daqui em diante? Acabou?',
      icon: GiDeathNote,
      requisito: 'Zerar a vida pela primeira vez'
    },
    {
      id: 11,
      ativo: false,
      tem: false,
      data: null,
      nome: 'A volta dos que não foram!',
      descricao: 'Voltando a consciência, você se vê curado, agradeça aos seus amigos, eles são para se contar!',
      icon: GiLifeSupport,
      requisito: 'A primeira cura depois de quase morrer'
    },
    {
      id: 12,
      ativo: true,
      tem: false,
      data: null,
      nome: 'A criação do mundo parte 2',
      descricao: 'Ao criar um mundo, coisas são requisitadas, sendo assim, ao cria-las vocÊ da ao seu mundo novos ares, e formas de ganhar seus objetivos',
      icon: GiLifeBar,
      requisito: 'Crie seus primeiros atributos e pericias'
    },
    {
      id: 13,
      ativo: false,
      tem: false,
      data: null,
      nome: 'Criando vida',
      descricao: 'Trazendo novas opções aos habitantes de seu mundo, você cria e molda vida ao seu favor, você está ficando mais forte!',
      icon: GiLifeBar,
      requisito: 'Crie uma barra'
    },
    {
      id: 14,
      ativo: false,
      nome: '1,2,3 Streamando!',
      descricao: 'Ao ver sua criação concluida porque não mostrar ao mundo o que você fez?',
      icon: RiLiveFill,
      requisito: 'Usar pela primeira vez o overlay'
    },
    {
      id: 15,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Forjando o futuro',
      descricao: 'Conhecendo o mundo, você começa a forjar o futuro, criando novos atributos e pericias, e ao mesmo tempo, criando novos itens e armas!',
      icon: GiAnvilImpact,
      requisito: 'Crie um item'
    },
    {
      id: 16,
      ativo: true,
      tem: false,
      data: null,
      nome: 'STOP !!!',
      descricao: 'Na vida há limites e esse é um deles.',
      icon: GiStopSign,
      requisito: 'Tente entrar em uma sessão que não começou'
    },
    {
      id: 17,
      ativo: true,
      tem: false,
      data: null,
      nome: 'AQUI É BODY BUILDER !!!',
      descricao: 'Com a experiência obtida em combate, você chega ao limite de sua habilidade',
      icon: GiWeightLiftingUp,
      requisito: 'Evolua uma perícia ou atributo ao maximo'
    },
    {
      id: 18,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Achou mesmo que eu morri ?!',
      descricao: 'Se eu posso ter personagens ilimitados porque não usa-los ?!',
      icon: GiHalfDead,
      requisito: 'Possua dois personagens. Um vivo e um morto.'
    },
    {
      id: 19,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Diretor é comigo mesmo !',
      descricao: 'Mandar é algo interessante. Acredito que não seja para todo mundo, mas para mim...',
      icon: GiDirectorChair,
      requisito: 'Inicia uma sessão como mestre.'
    },
    {
      id: 20,
      ativo: false,
      nome: 'Na Saúde e na doença',
      descricao: 'Se alguem tem algo contra esse casamento fale agora ou cale-se para sempre !!!',
      icon: GiRingBox,
      requisito: 'Case-se com um personagem.'
    },
    {
      id: 21,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Está tudo tão queto. Por enquanto...',
      descricao: 'O mundo estáva muito queto, E você teve a brilhante ideia de criar um ser vivo',
      icon: GiBackup,
      requisito: 'Crie uma ficha como mestre'
    },
    {
      id: 22,
      ativo: true,
      nome: 'Vendo mais do que eu pensei',
      descricao: 'Após ver suas conquistas você se surpreende, e decide ajudar as pessoas',
      icon: BiDonateHeart,
      requisito: 'Visite nosso Apoia-se'
    },
    {
      id: 23,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Propriedade Privada',
      descricao: 'Parece que você optou por um cantinho reservado. Você é o dono do cantinho, e pode fazer o que quiser com ele.',
      icon: FaFolder,
      requisito: 'Simples assim. Crie uma pasta'
    },
    {
      id: 24,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Eu que decido',
      descricao: 'Opa, prefiro dessa forma, eu sou o dono do cantinho, e posso fazer o que quiser com ele.',
      icon: GiBrokenSkull,
      requisito: 'Como mestre. Edite a ficha de um player'
    },
    {
      id: 25,
      ativo: true,
      tem: false,
      data: null,
      nome: 'Deixando Registrado',
      descricao: 'Você não quer esquecer de nada, então registra tudo.',
      icon: FaCamera,
      requisito: 'Adicione sua primeira imagem'
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    },
    {
      id: 99,
      ativo: true,
      tem: false,
      data: null,
      nome: '',
      descricao: '',
      icon: null,
      requisito: ''
    }
  ]
}

export default Emblemas
