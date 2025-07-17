import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { rfqService } from "../services/rfq"
import type { GetRFQParams } from "../services/rfq"

export const useRFQs = ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  sortBy = "createdAt",
  sortOrder = "desc" as "asc" | "desc",
}: GetRFQParams = {}) => {
  return useQuery({
    queryKey: ["rfqs", { page, limit, search, status, sortBy, sortOrder }] as const,
    queryFn: rfqService.getRFQs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useRFQById = (id: string) => {
  return useQuery({
    queryKey: ["rfq", id] as const,
    queryFn: () => rfqService.getRFQById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
