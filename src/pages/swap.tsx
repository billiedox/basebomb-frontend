import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Swap from '../views/Swap'

const SwapPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, [])
  return <Swap />
}

export default SwapPage
