import { useQuery } from '@tanstack/react-query'
import { supplierRefundTransactionsService, type SupplierRefundTransactionsParams } from '../services/supplierRefundTransactions'

export const useSupplierRefundTransactions = (params: SupplierRefundTransactionsParams = {}) => {
  return useQuery({
    queryKey: ['supplierRefundTransactions', params],
    queryFn: () => supplierRefundTransactionsService.getSupplierRefundTransactions(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}
