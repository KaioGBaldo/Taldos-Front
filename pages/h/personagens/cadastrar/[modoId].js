// Arquivo criado: 02/01/2023 às 18:06
// import styles from '@/styles/Cadastrar.module.scss'
import OP_Cadastro from '@/components/layouts/ordem_paranormal/cadastrar'
import MenuH from '@/components/MenuH'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Cadastrar = () => {

  const router = useRouter()

  const [component, setComponent] = useState(null)

  useEffect(() => {
    if (router.query.modoId) {
      switch (router.query.modoId) {
      case 'op':
        setComponent(<OP_Cadastro />)
        break
      default:
        router.isReady && router.push('/h/personagens')
        break
      }
    } else {
      router.isReady && router.push('/h/personagens')
    }
  }, [router, router.query.modoId])

  return (
    <MenuH title='Criar Ficha' invertColor showVoltar>
      {component}
    </MenuH>
  )

}

export default Cadastrar
