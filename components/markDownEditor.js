// Arquivo criado: 19/01/2023 às 00:14
import { tinyMceKey } from '@/lib/frontEnd/vars'
import { Emoji } from 'interfaces/emojis'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Swal from 'sweetalert2'

const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <p>Carregando editor...</p>
  }
)

const MarkDownEditor = ({
  textAreaRef = null
}) => {

  const [inputLength, setInputLength] = useState(data.defaultSentence.length)

  const log = () => {
    if (textAreaRef.current) {
      const value = textAreaRef.current.getContent().replace(/<[^>]*>|&nbsp;|\s/g, '').length

      if (value > 999) return Swal.fire('Ops!', 'Você não pode escrever mais de 999 caracteres', 'error')

      setInputLength(value)
    }

  }

  return (
    <>
      <Editor
        apiKey={tinyMceKey}
        onInit={(_evt, editor) => textAreaRef.current = editor}
        onKeyUp={log}
        initialValue={`<p style="text-align: center;">${data.defaultSentence}</p>`}
        init={{
          height: 500,
          paste_data_images: false,
          menubar: false,
          content_css: 'tinymce-5-dark',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | removeformat',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      {inputLength} / 999
    </>
  )

}

export default MarkDownEditor

const data = {
  defaultSentence: `Escreva aqui sua história ${Emoji.happy}`
}
