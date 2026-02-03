// Arquivo criado: 31/12/2022 às 01:12
import MenuH from '@/components/MenuH'
import { useEffect, useState } from 'react'
import CoverSeeImage from '@/components/CoverSeeImage'
import Files from '@/components/Files'
import SidePlus from '@/components/SidePlus'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import BackEnd from '@/lib/frontEnd/toBack'
import { useRouter } from 'next/router'
import SetConquista from '@/lib/frontEnd/setConquista'

const PastaSingle = () => {

  const [thisPasta, setThisPasta] = useState({
    nome: 'Minha Pasta'
  })
  const [imageSingle, setImageSingle] = useState({
    isVisible: false,
    image: '',
    nome: ''
  })
  const [arquivos, setArquivos] = useState([])
  const [isLoading, setLoading] = useState(true)

  const state = useSelector(state => state.user)
  const router = useRouter()

  const novoArquivo = () => {
    Swal.fire({
      title: 'Envie um arquivo',
      input: 'file',
      inputAttributes: {
        accept: 'image/png, image/jpeg, image/jpg'
      },
      showCancelButton: true,
      inputValidator: (image) => {
        if (image) {
          const tamanhoPermitido = state.assinatura ? 10000000 : 3000000
          if (!!image.type.match('image.*') === false) {
            return 'O arquivo deve ser uma imagem'
          } else if (image.size > tamanhoPermitido) {
            if (tamanhoPermitido === 3000000) {
              return 'Seja Assinante para enviar arquivos maiores que 3MB'
            } else {
              return 'O arquivo deve ter no máximo 10MB'
            }
          }
        }
      },
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: image => {

        if (!image) return

        const url = URL.createObjectURL(image)
        let base64 = ''
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = (res) => {
          base64 = res.target.result
          setLoading(true)
          BackEnd('arquivos/setFile', {
            email: state.email,
            image: {
              name: image.name,
              type: image.type,
              size: image.size
            },
            base64,
            uid_folder: router.query.pasta
          }).then(res => {
            SetConquista(25, state)

            if (res.error) {
              return Swal.fire({
                title: 'Erro',
                text: res.error,
                icon: 'error'
              })
            }

            Swal.fire('Sucesso', 'Arquivo enviado com sucesso', 'success')
            setLoading(false)

            setArquivos(prev => [...prev, {
              nome: image.name,
              link: url
            }])

          })
        }

      }
    })
  }

  useEffect(() => {
    const handleThisPasta = () => {
      const session = sessionStorage.getItem('pasta')
      if (session !== null) {
        setThisPasta(JSON.parse(session))
        sessionStorage.removeItem('pasta')
      }
    }

    handleThisPasta()
  }, [])

  const handleSeeImage = arquivo => {
    setImageSingle({
      isVisible: true,
      image: arquivo.link,
      nome: arquivo.nome
    })
  }

  return (
    <MenuH showVoltar title='Arquivos' invertColor>
      <div className='top-bar-dashboard'>
        <h2>
          {
            thisPasta.nome.length < 28
              ? thisPasta.nome
              : 'Minha Pasta'
          }
        </h2>
      </div>
      <Files
        arquivos={arquivos}
        setArquivos={setArquivos}
        isLoading={isLoading}
        setLoading={setLoading}
        action={handleSeeImage}
      />
      <SidePlus action={novoArquivo} />
      {
        imageSingle.isVisible && <CoverSeeImage nome={imageSingle.nome} handle={setImageSingle} image={imageSingle.image} />
      }
    </MenuH>
  )

}

export default PastaSingle
