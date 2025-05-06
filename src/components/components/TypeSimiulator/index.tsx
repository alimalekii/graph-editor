import {
  useState,
  useEffect,
  //  Dispatch, SetStateAction
} from 'react'

interface ITypeSimiulator {
  text: string
  delay?: number
  className?: string
  // setStatus: Dispatch<SetStateAction<'pending' | 'progress' | 'success'>>
}

const TypeSimiulator = (props: ITypeSimiulator) => {
  const {
    text,
    delay = 300,
    className,
    // setStatus
  } = props

  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
        // setStatus('progress')
      }, delay)
      return () => clearTimeout(timeout)
    }

    // if (currentIndex === text.length) {
    //   setStatus('success')
    // }
  }, [currentIndex, delay, text])

  return <p className={className ?? ''}>{currentText}</p>
}

export default TypeSimiulator
