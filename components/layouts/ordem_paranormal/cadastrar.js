// Arquivo criado: 02/01/2023 às 18:21
import ButtonDefault from '@/components/ButtonDefault'
import Loadings from '@/components/Loadings'
import MarkDownEditor from '@/components/markDownEditor'
import ModalSelectImage from '@/components/ModalSelectImage'
import { Emoji } from '@/interfaces/emojis'
import showNotification from '@/lib/frontEnd/showNotification'
import BackEnd from '@/lib/frontEnd/toBack'
import styles from '@/styles/layouts/ordem_paranormal/cadastrar.module.scss'
import flaformatter from 'flaformatter'
import { useRef, useState } from 'react'
import { FaClipboard, FaGlobeAmericas, FaImage, FaUser } from 'react-icons/fa'
import { GoX } from 'react-icons/go'
import Swal from 'sweetalert2'

const OP_Cadastro = () => {

  const [modalFile, setModalFile] = useState(false)
  const [loading, setLoading] = useState(false)
  const [chipData, setChipData] = useState([
    'acrobacia',
    'religião',
    'furtividade'
  ])
  const [selectedImage, setSelectedImage] = useState(null)

  const form = useRef(null)
  const textArea = useRef(null)

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip !== chipToDelete))
  }

  const handleAddChip = e => {

    if (e.key === 'Enter') {

      if (e.target.value !== '') {

        if (chipData.length > 29) {
          return Swal.fire('Ops!', 'Você não pode adicionar mais de 29 perícias', 'error')
        }

        if (chipData.includes(e.target.value.toLowerCase())) {
          return Swal.fire('Ops!', 'Você já adicionou essa perícia', 'error')
        }

        setChipData([...chipData, e.target.value])
        e.target.value = ''
      }
    }
  }

  const handleSelectedImage = image => {
    setSelectedImage(image.link)
    setModalFile(false)
  }

  const handleForm = () => {
    const formData = new FormData(form.current)

    const data = {
      ...Object.fromEntries(formData),
      pericias: chipData,
      descricao: textArea.current.getContent(),
      img: selectedImage,
      tipe: 'op'
    }

    if (data.nome === '') return showNotification('error', 'Adicione um nome')
    if (data.origem === '') return showNotification('error', 'Adicione uma origem')
    if (data.classe === '') return showNotification('error', 'Adicione uma classe')
    if (data.nex === '' || parseInt(data.nex) < 0 || parseInt(data.nex) > 99) return showNotification('error', 'Adicione seu nex')
    if (data.pericias.length === 0) return showNotification('error', 'Adicione pelo menos uma perícia')

    if (parseInt(data.Agi) < 0 || parseInt(data.Agi) > 6) return showNotification('error', 'Adicione um valor válido para Agi')
    if (parseInt(data.For) < 0 || parseInt(data.For) > 6) return showNotification('error', 'Adicione um valor válido para For')
    if (parseInt(data.Int) < 0 || parseInt(data.Int) > 6) return showNotification('error', 'Adicione um valor válido para Int')
    if (parseInt(data.Pre) < 0 || parseInt(data.Pre) > 6) return showNotification('error', 'Adicione um valor válido para Pre')
    if (parseInt(data.Vig) < 0 || parseInt(data.Vig) > 6) return showNotification('error', 'Adicione um valor válido para Vig')

    setLoading(true)
    BackEnd('fichas/set', data).then(res => {
      setLoading(false)

      if (res.error) {
        return Swal.fire('Ops!', res.error, 'error')
      }

      return Swal.fire('Sucesso!', 'Ficha criada com sucesso', 'success').then(() => {
        form.current.reset()
      })

    }).catch(() => {
      setLoading(false)
      Swal.fire('Ops!', 'Ocorreu um erro, tente novamente mais tarde', 'error')
    })
  }

  const verifyAtributoValue = e => {
    const max = 6
    if (e.target.value > max) {
      return e.target.value = max
    }
  }

  return (
    <div>
      <div className='top-bar-dashboard'>
        <h2 className={styles.animation}>Criando</h2>
      </div>

      <div className={styles.container}>
        <form
          style={{ display: loading ? 'none' : 'block' }}
          ref={form}
          method='post'
          onSubmit={e => e.preventDefault()}
        >
          <div className={styles.container__1}>
            <div onClick={() => setModalFile(true)} className={styles.container__1__img} >
              {
                selectedImage
                  ? <div className={styles.container__1__img_single} style={{ backgroundImage: `url(${selectedImage})` }}></div>
                  : (
                    <>
                      <FaImage />
                      <p>Adicionar Imagem</p>
                    </>
                  )
              }
            </div>

            {
              input.map((item, index) => (
                <div key={index} className={styles.formGroup}>
                  {item.icon}
                  <input {...item.input} />
                </div>
              ))
            }

            <div className={`${styles.formGroup} ${styles.formGroup__number}`}>
              <input name='nex' onChange={(e) => flaformatter(e, 'int')} type="tel" maxLength={2} placeholder='Nex' />
            </div>
          </div>

          <br />
          <br />
          <div className={styles.container_2}>
            <h2 className={styles.container_2_titleDefault}>Perícias</h2>

            <br />
            <div className={styles.chipContainer}>
              {
                chipData.map(data => (
                  <div
                    className={styles.chipContainer__chip}
                    key={data}
                  > {data} <GoX onClick={handleDelete(data)} /> </div>
                ))
              }
            </div>

            <div className={styles.formGroup}>
              <FaGlobeAmericas />
              <input
                type="text"
                placeholder='Adicionar Perícia'
                onKeyUp={handleAddChip}
                onChange={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '')}
                maxLength={12}
              />
            </div>

            <br />
            <br />
            <br />
            <h2 className={styles.container_2_titleDefault}>Atributos</h2>

            <div className={styles.container_2__atributos}>
              {
                atributos.map(item => (
                  <div key={item} className={`${styles.formGroup} ${styles.formGroup__number}`}>
                    <input onChange={(e) => { flaformatter(e, 'int'); verifyAtributoValue(e) }} name={item} placeholder={item} type="tel" maxLength={1} />
                  </div>
                ))
              }
            </div>

            <br />
            <br />
            <br />
            <h2 className={styles.container_2_titleDefault}>Descrição do Personagem</h2>

            <div className={styles.container_2_markDown}>
              <MarkDownEditor textAreaRef={textArea} />
            </div>

          </div>

        </form>
        <div
          style={{ display: loading ? 'none' : 'block' }}
          className={styles.container_3__button}
        >
          <ButtonDefault onClick={handleForm} className={styles.button} type={2} >Criar Personagem</ButtonDefault>
        </div>
        {
          loading && (
            <div className={`heigth-100 ${styles.containerLoading}`}>
              <Loadings />
              <br />
              Criando seu Barbaro... {Emoji.loading}
            </div>
          )
        }
      </div>

      {
        modalFile && (
          <ModalSelectImage
            handleOpen={setModalFile}
            handleSelectedImage={handleSelectedImage}
          />
        )
      }
    </div>
  )

}

const input = [
  {
    icon: <FaUser />,
    input: {
      type: 'text',
      name: 'nome',
      placeholder: 'Nome'
    }
  },
  {
    icon: <FaGlobeAmericas />,
    input: {
      type: 'text',
      name: 'origem',
      placeholder: 'Origem'
    }
  },
  {
    icon: <FaClipboard />,
    input: {
      type: 'text',
      name: 'classe',
      placeholder: 'Classe'
    }
  }
]

const atributos = [
  'For',
  'Vig',
  'Int',
  'Pre',
  'Agi'
]

export default OP_Cadastro
