// Arquivo criado: 22/12/2022 às 19:15
import userLogin1 from '@/assets/1.png'
import userLogin2 from '@/assets/2.png'
import userLogin3 from '@/assets/3.png'
import userLogin4 from '@/assets/4.png'
import userLogin5 from '@/assets/5.png'
import userLogin6 from '@/assets/6.png'
import userLogin7 from '@/assets/7.png'
import bgAreaLogin from '@/assets/bgAreaLogin.png'
import bgLogin from '@/assets/bgLogin.jpg'
import HeaderPage from '@/components/HeaderPage'
import Loadings from '@/components/Loadings'
import MenuFront from '@/components/MenuFront'
import { recaptchaKey } from '@/lib/frontEnd/vars'
import sass from '@/styles/variables.module.scss'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { createRef, useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { BsDiscord, BsGoogle } from 'react-icons/bs'
import { FaLock, FaUserAlt } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Swal from 'sweetalert2'

export const Login = () => {

  const [verifying, setVerifying] = useState(true)
  const { data: session } = useSession()

  const form = useRef()
  const recaptchaRef = createRef()
  const router = useRouter()

  const uiInput = (target, type = 'set') => {

    const div = form.current.children[target]
    const svg = div.children[0]
    const input = div.children[1]

    if (type === 'set') {
      svg.style.color = sass.corPrincipal
      div.style.borderColor = sass.corPrincipal
    } else if (input.value.length <= 0) {
      svg.style.color = '#ccc'
      div.style.borderColor = '#ccc'
    }
  }

  useEffect(() => {
    if (session) {
      setVerifying(true)
      router.isReady && router.push('/h')
    } else if (session === null) {
      setVerifying(false)
    }
  }, [router, session])

  const message = a => {
    a.preventDefault()
    Swal.fire('Aviso', 'No momento só é possível fazer login com o Discord ou com o Google :D')
  }

  const handleLogin = async type => {

    const recap = await recaptchaRef.current.executeAsync()

    if (recap !== null) {
      signIn(type, { callbackUrl: '/h' })
    }

  }

  return (
    <MenuFront>
      {
        !verifying
          ? <>
            <div className='bg-login' style={{ color: sass.corPrincipal, overflowX: 'hidden', backgroundImage: `url(${bgLogin.src})`, minHeight: '100vh' }}>
              <HeaderPage padrao="link" />
              <div className='container'>
                <div className='box-login'>
                  <div className='animate__animated animate__rubberBand' style={{ backgroundImage: `url(${bgAreaLogin.src})`, display: 'flex' }}>
                    <div className='ghost-box-login'></div>

                    <div className='ghost-box-login box-login-form'>
                      <Slider fade={true} dots={false} arrows={false} autoplay={true} autoplaySpeed={3000} infinite={true} speed={1000} slidesToShow={1} slidesToScroll={1} >
                        <div><Image alt='icon' width={userLogin1.width} height={userLogin1.height} src={userLogin1.src} className='ico-login' /></div>
                        <div><Image alt='icon' width={userLogin4.width} height={userLogin4.height} src={userLogin4.src} className='ico-login' /></div>
                        <div><Image alt='icon' width={userLogin7.width} height={userLogin7.height} src={userLogin7.src} className='ico-login' /></div>
                        <div><Image alt='icon' width={userLogin5.width} height={userLogin5.height} src={userLogin5.src} className='ico-login' /></div>
                        <div><Image alt='icon' width={userLogin2.width} height={userLogin2.height} src={userLogin2.src} className='ico-login' /></div>
                        <div><Image alt='icon' width={userLogin3.width} height={userLogin3.height} src={userLogin3.src} className='ico-login' /></div>
                        <div><Image alt='icon' width={userLogin6.width} height={userLogin6.height} src={userLogin6.src} className='ico-login' /></div>
                      </Slider>
                      <h2>{d.title}</h2>
                      <form ref={form}>
                        <div onClick={message} className='form-group'>
                          <FaUserAlt />
                          <input disabled type='text' onFocus={() => uiInput(0)} onBlur={() => uiInput(0, 'reset')} required placeholder="Nome" />
                        </div>

                        <div onClick={message} style={{ marginBottom: 10 }} className='form-group'>
                          <FaLock />
                          <input disabled type='text' onFocus={() => uiInput(1)} onBlur={() => uiInput(1, 'reset')} required placeholder="E-mail" />
                        </div>
                        <input onClick={message} style={{ backgroundColor: sass.corPrincipal }} type="submit" value="Login" />
                        <p style={{ margin: 7 }}>ou</p>
                        <div className='form-login-icons' style={{ marginBottom: 5 }}>
                          <span onClick={() => handleLogin('google')}><BsGoogle size={30} /></span>
                          <span onClick={() => handleLogin('discord')}><BsDiscord size={30} /></span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ReCAPTCHA size="invisible" ref={recaptchaRef} sitekey={recaptchaKey} />
          </>
          : <div className="flex-center heigth-100">
            <Loadings size={20} />
          </div>
      }
    </MenuFront>
  )

}

const d = {
  title: 'Olá, como foi o seu dia hoje ?'
}

export default Login
