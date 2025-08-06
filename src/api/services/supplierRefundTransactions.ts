import api from '../config/api'

export interface SupplierRefundTransaction {
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

export interface SupplierRefundTransactionsResponse {
  success: boolean
  data: {
    transactions: SupplierRefundTransaction[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface SupplierRefundTransactionsParams {
  page?: number
  limit?: number
  search?: string
  status?: string
}

export const supplierRefundTransactionsService = {
  getSupplierRefundTransactions: async (params: SupplierRefundTransactionsParams = {}): Promise<SupplierRefundTransactionsResponse> => {
    const queryParams = new URLSearchParams()
    queryParams.append('transactionType', 'refund')
    
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.search) queryParams.append('search', params.search)
    if (params.status) queryParams.append('status', params.status)

    const response = await api.get(`/private/transactions/supplier?${queryParams.toString()}`)
    return response.data
  }
}
