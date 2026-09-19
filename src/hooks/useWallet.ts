import { getWalletBalance } from '@/api/wallet'
import { useQuery } from '@tanstack/react-query'

export const useWallet = () => {
  const getWallet = async () => {
    const wallet = await getWalletBalance()
    return wallet
  }
  const queryData = useQuery({
    queryKey: ['wallet'],
    queryFn: getWallet,
  })
  return queryData
}
