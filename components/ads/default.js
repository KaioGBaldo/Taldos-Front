// Arquivo criado: 06/01/2023 às 20:41

import Script from 'next/script'

const ModalAds = () => {

  return (
    <>
      {
        process.env.NODE_ENV === 'production' && <Script async="async" data-cfasync="false" src="//arsnivyr.com/1?z=5647452"></Script>
      }
    </>
  )

}

export default ModalAds
