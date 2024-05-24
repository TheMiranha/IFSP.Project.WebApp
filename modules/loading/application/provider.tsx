'use client'

import Lottie from 'react-lottie';
import chemistryLoading from '../../../public/animations/loading/chemistry.json'
import { useLoading } from './store/loading';

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

  if (!active) return false

  return (
    <div className='h-[100dvh] w-[100dvw] absolute z-20 bg-slate-700 bg-opacity-50 grid place-items-center'>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isClickToPauseDisabled={true}
        style={{ cursor: 'default' }}
      />
    </div>
  )
}