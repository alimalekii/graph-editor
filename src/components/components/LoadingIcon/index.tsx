import './style.scss'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

const LoadingIcon = () => {
  const container = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      gsap.to('.bdm-loading-icon__circle', {
        backgroundColor: '#3C78FD',
        width: 16,
        height: 16,
        ease: 'power2.inOut',
        duration: 0.6,
        stagger: { each: 0.2, yoyo: true, repeat: -1 },
      })
    },
    { scope: container },
  )

  return (
    <div className='bdm-loading-icon' ref={container}>
      <div className='bdm-loading-icon__circle'></div>
      <div className='bdm-loading-icon__circle'></div>
      <div className='bdm-loading-icon__circle'></div>
    </div>
  )
}

export default LoadingIcon
