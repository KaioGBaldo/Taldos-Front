import Swal from 'sweetalert2'
import BackEnd from './toBack'

const linkPlano = async (email: string) => {

  BackEnd('payments/get', { email }).then(json => {
    if (json.url) return window.location.href = json.url

    return Swal.fire({
      title: 'Ops...',
      text: 'Não foi possível gerar o link de pagamento. Tente novamente mais tarde.',
      icon: 'error'
    })
  })

}

export default linkPlano
