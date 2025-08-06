import { useQuery } from '@tanstack/react-query'
import { refundTransactionsService, type RefundTransactionsParams } from '../services/refundTransactions'

export const useRefundTransactions = (params: RefundTransactionsParams = {}) => {
  return useQuery({
    queryKey: ['refundTransactions', params],
    queryFn: () => refundTransactionsService.getRefundTransactions(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}
