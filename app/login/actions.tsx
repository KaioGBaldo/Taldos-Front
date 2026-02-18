'use client' // Para este exemplo simples de teste

import { useRouter } from 'next/navigation'

export function useLogin() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    // USUÁRIO TESTE: BALDUR
    if (email === 'baldur' && password === '12102003') {
      // No mundo real, aqui você usaria 'document.cookie' ou uma Server Action
      // Vamos simular o cookie que o seu Middleware procura:
      document.cookie = "session_token=valid_token_baldur; path=/; max-age=3600"
      
      alert('Bem-vindo à taverna, Baldur!')
      router.push('/perfil')
    } else {
      alert('Assinatura inválida! Tente novamente, viajante.')
    }
  }

  return { handleLogin }
}