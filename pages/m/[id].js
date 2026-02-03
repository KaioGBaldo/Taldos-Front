// Arquivo criado: 29/12/2022 às 19:09

import MenuH from '@/components/MenuH'
import SlideRpgSingle from '@/components/SlideRpgSingle'

export const RpgSingle = () => {

  return (
    <MenuH
      invertColor
      showVoltar
      title='Teset 2'
      mesa
    >
      <div className='top-bar-dashboard'>
        <h2>Dashboard do Mestre</h2>
      </div>
      <div className='father-container-users animate__animated animate__zoomIn'>
        <SlideRpgSingle />
      </div>
    </MenuH>
  )

}

export default RpgSingle
