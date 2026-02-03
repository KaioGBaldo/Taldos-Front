// Arquivo criado: 29/12/2022 às 18:32

import { scroller } from 'react-scroll'

const scrollTo = (where: string, duration = 800) => {
  scroller.scrollTo(where, {
    duration,
    delay: 0,
    smooth: 'easeInOutQuart'
  })
}

export default scrollTo
