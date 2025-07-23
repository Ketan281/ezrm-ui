import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { shipmentsService } from "../services/shipments"
import type { GetShipmentsParams } from "../services/shipments"

export const useShipments = ({ page = 1, limit = 10, search = "", status = "" }: GetShipmentsParams = {}) => {
  return useQuery({
    queryKey: ["shipments", { page, limit, search, status }] as const,
    queryFn: shipmentsService.getShipments,
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useShipmentById = (id: string) => {
  return useQuery({
    queryKey: ["shipment", id] as const,
    queryFn: () => shipmentsService.getShipmentById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
