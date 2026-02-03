// Arquivo criado: 28/12/2022 às 15:01

import sass from '@/styles/variables.module.scss'
import { useEffect, useState } from 'react'
import { BarLoader, BeatLoader, BounceLoader, CircleLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PacmanLoader, PropagateLoader, PuffLoader, PulseLoader, RingLoader, RotateLoader, ScaleLoader, SkewLoader, SquareLoader, SyncLoader } from 'react-spinners'

export const Loadings = ({
  color = sass.corPrincipal,
  size = 20,
  tipo = null
}) => {

  const All = [BarLoader, BeatLoader, BounceLoader, CircleLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PacmanLoader, PropagateLoader, PuffLoader, PulseLoader, RingLoader, RotateLoader, ScaleLoader, SkewLoader, SquareLoader, SyncLoader]

  const [index, setIndex] = useState(1)
  const attrs = {
    speedMultiplier: 0.9,
    color,
    size
  }

  const Single = All[tipo || index]

  useEffect(() => {
    setIndex(Math.floor(Math.random() * All.length))
  }, [All.length])

  // useEffect(() => {

  //   switch (Single) {
  //   case BeatLoader:
  //     setAttrs({ ...attrs, size })
  //     break
  //   case RotateLoader:
  //     setAttrs({ ...attrs, size })
  //     break
  //   case GridLoader:
  //     setAttrs({ ...attrs, size })
  //     break
  //   case MoonLoader:
  //     setAttrs({ ...attrs, size: size + 10 })
  //     break
  //   case BounceLoader:
  //     setAttrs({ ...attrs, size: size + 20 })
  //     break
  //   case CircleLoader:
  //     setAttrs({ ...attrs, size: size + 30 })
  //     break
  //   case ClipLoader:
  //     setAttrs({ ...attrs, size: size + 20 })
  //     break
  //   case ClockLoader:
  //     setAttrs({ ...attrs, size: size + 25 })
  //     break
  //   case DotLoader:
  //     setAttrs({ ...attrs, size: size + 20 })
  //     break
  //   case HashLoader:
  //     setAttrs({ ...attrs, size: size + 25 })
  //     break
  //   case PuffLoader:
  //     setAttrs({ ...attrs, size: size + 35 })
  //     break
  //   case RingLoader:
  //     setAttrs({ ...attrs, size: size + 35 })
  //     break
  //   case PulseLoader:
  //     setAttrs({ ...attrs, speedMultiplier: 0.7, size })
  //     break
  //   default:
  //     break
  //   }
  // }, [Single, attrs, size])

  return (
    <Single
      aria-label="Loading Spinner"
      data-testid="loader"
      {...attrs}
    />
  )

}

export default Loadings
