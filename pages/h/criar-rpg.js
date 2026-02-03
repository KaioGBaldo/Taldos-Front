// Arquivo criado: 29/12/2022 às 19:07

import bg from '@/assets/bg-criarRpg.jpg'
import AnimationCriarRpg from '@/components/AnimationCriarRpg'
import MenuH from '@/components/MenuH'
import linkPlano from '@/lib/frontEnd/LinkPlano'
import SetConquista from '@/lib/frontEnd/setConquista'
import BackEnd from '@/lib/frontEnd/toBack'
import { recaptchaKey } from '@/lib/frontEnd/vars'
import sass from '@/styles/variables.module.scss'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { BsCheck2Circle } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export const CriarRpg = () => {

  const recaptchaRef = useRef(null)

  const [animation, setAnimation] = useState(false)
  const [url, setURl] = useState('')
  const [completCreateRPG, setCompletCreateRPG] = useState(false)
  const [modos, setModos] = useState([])

  const state = useSelector(state => state.user)

  useEffect(() => {
    BackEnd('getModosJogo').then(data => {
      setModos(data)
    })
  }, [])

  const onSubmitWithReCAPTCHA = async () => {
    const token = await recaptchaRef.current.executeAsync()
    return token
  }

  const criarRPG = e => {
    e.preventDefault()
    // iniciarAnimation()
    // SetConquista(4, state)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    if (data.nomeRpg !== '' && data.sistemaDeJogo !== '') {
      onSubmitWithReCAPTCHA().then(vall => {
        if (vall != null) {
          setAnimation(true)
          BackEnd('criar-rpg', {
            nome: data.nomeRpg,
            tipo: data.sistemaDeJogo
          }).then(val => {
            if (val.link) {
              SetConquista(4, state)
              setURl(val.link)
              setTimeout(() => {
                setCompletCreateRPG(true)
              }, 12000)
            } else {
              setAnimation(false)

              if (val.button) {
                return Swal.fire({
                  title: 'Taldo Plus',
                  text: val.error,
                  icon: 'info',
                  showCancelButton: true,
                  confirmButtonText: 'Assinar!',
                  cancelButtonText: 'Não, obrigado.',
                  reverseButtons: true
                }).then((result) => {
                  if (result.isConfirmed) {
                    linkPlano(state.email)
                  } else {
                    window.location.reload()
                  }
                })
              }

              return Swal.fire('Um pequeno problema', val.error, 'error').then(() => window.location.reload())
            }
          })
        }
      })

    } else {
      Swal.fire('Vá com calma', 'Insira o nome e o tipo do RPG para que possamos cria-lo', 'error')
    }
  }

  return (
    <MenuH title='Criar Rpg'>
      <div style={{ backgroundColor: sass.corPrincipal, padding: 45 }} className="top-bar-criar-rpg"></div>
      <div style={{ backgroundImage: `url(${bg.src})` }} className='bg-criar-rpg'>
        <div className='side-form-criar'>

        </div>
        <div className='form-criar-mesa'>
          <div className='border-style'>
            {
              (!animation)
                ? <form method='post' onSubmit={criarRPG} className='form-criar-rpg'>
                  <ReCAPTCHA size="invisible" ref={recaptchaRef} sitekey={recaptchaKey} />
                  <div className='line-border'></div>
                  <br />

                  <label htmlFor='nomeRpg'>Nome do RPG</label>
                  <input name='nomeRpg' id='nomeRpg' placeholder='Digite o nome do jogo' type='text' />

                  <label htmlFor='sistemaDeJogo'>Sistema do jogo</label>
                  <select name="sistemaDeJogo" id="sistemaDeJogo">
                    <option disabled>Selecione o Modo</option>
                    {
                      modos.map(val => (
                        <option key={val.id} value={val.id}>{val.nome}</option>
                      ))
                    }
                  </select>
                  <div className='center-align'>
                    <input type='submit' value="Criar" />
                  </div>
                  <div className='line-border'></div>
                </form>
                : <div>
                  {
                    (!completCreateRPG)
                      ? <AnimationCriarRpg />
                      : <div className='animation-criar-rpg finish-create-rpg animate__animated animate__tada'>
                        <p style={{ fontSize: 20, marginBottom: 10 }}>Show de bola, terminamos !</p>
                        <div><BsCheck2Circle /></div>
                        <Link className='button' style={{ textShadow: 'none' }} href={`/m/${url}`}>Painel de Controle</Link>
                      </div>
                  }
                </div>
            }

          </div>
        </div>
      </div>
    </MenuH>
  )

}

export default CriarRpg
