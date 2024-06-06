'use client'

import Lottie from 'react-lottie';
import chemistryLoading from '../../../public/animations/loading/chemistry.json'
import { useLoading } from './store/loading';
import { useContainer } from '@/modules/container/application/store/container';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: chemistryLoading,
  rendererSettngs: {
    preserveAspectRadio: 'xMidYMid slice'
  }
}

export const LoadingModuleProvider = () => {

  const { active } = useLoading()
  const { height } = useContainer()

  if (!active) return false

  return (
    <div className='h-[100dvh] w-[100dvw] top-0 left-0 absolute z-20 bg-slate-700 bg-opacity-50 grid place-items-center'>
      <Lottie
        options={defaultOptions}
        height={height > 400 ? 400 : height}
        isClickToPauseDisabled={true}
        style={{ cursor: 'default' }}
      />
    </div>
  )
}