// Arquivo criado: 30/12/2022 às 23:36
import Folders from '@/components/Folders'
import SidePlus from '@/components/SidePlus'
import MenuH from '@/components/MenuH'
import SetConquista from '@/lib/frontEnd/setConquista'
import BackEnd from '@/lib/frontEnd/toBack'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Arquivos = () => {

  const [pastas, setPastas] = useState([])
  const state = useSelector(state => state.user)

  const novaPasta = () => {
    Swal.fire({
      title: 'Nome da Pasta',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return 'Informe um nome para a pasta!'
        } else if (value.length < 3) {
          return 'O nome muito curto!'
        } else if (value.length > 100) {
          return 'Nome muito longo!'
        }
      },
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (nome) => {
        BackEnd('arquivos/set', {
          email: state.email,
          nome
        }).then(res => {
          SetConquista(23, state)
          setPastas([...pastas, { nome, uid_folder: res.uid_folder }])
        })
      }
    })
  }

  return (
    <MenuH title='Arquivos' invertColor>
      <div className='top-bar-dashboard'>
        <h2>Meus Arquivos</h2>
      </div>
      <Folders pastas={pastas} setPastas={setPastas} />
      <SidePlus action={novaPasta} />
    </MenuH>
  )

}

export default Arquivos
