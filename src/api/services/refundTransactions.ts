import api from '../config/api'

export interface RefundTransaction {
  _id: string
  orderId: string
  customerId: string
  supplierId: string
  amount: number
  currency: string
  paymentMethod: string
  paymentSource: string
  paymentStatus: string
  transactionType: string
  paymentFor: string
  gatewayTransactionId: string
  notes: string
  uniqueId: string
  createdAt: string
  updatedAt: string
  gatewayResponse: {
    success: boolean
    message: string
    gatewayName: string
  }
  paymentDetails: {
    bankName: string
    accountNumber: string
  }
  fees: {
    gatewayFee: number
    processingFee: number
    taxAmount: number
  }
  refundDetails: {
    refundAmount: number
    refundReason: string
    refundDate: string
    refundStatus: string
  }
}

export interface RefundTransactionsResponse {
  success: boolean
  data: {
    transactions: RefundTransaction[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface RefundTransactionsParams {
  page?: number
  limit?: number
  search?: string
  status?: string
}

export const refundTransactionsService = {
  getRefundTransactions: async (params: RefundTransactionsParams = {}): Promise<RefundTransactionsResponse> => {
    const queryParams = new URLSearchParams()
    queryParams.append('transactionType', 'refund')
    
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.search) queryParams.append('search', params.search)
    if (params.status) queryParams.append('status', params.status)

    const response = await api.get(`/private/transactions/customer?${queryParams.toString()}`)
    return response.data
  }
}
