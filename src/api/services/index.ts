export { authService } from "./authService"
export { userService } from "./userService"
export { productsService } from "./products"
export { rfqService } from "./rfq"
export { ordersService } from "./orders"
export { customerReviewsService } from "./customerReviews"
export { shipmentsService } from "./shipments"
export type { LoginCredentials, RegisterData, User, AuthResponse } from "./authService"
export type { UpdateProfileData, ChangePasswordData } from "./userService"
export type {
  CreateProductRequest,
  Product,
  GetProductsParams,
  ProductsResponse,
  ApiResponse as ProductApiResponse,
  CreateProductFormData
} from "./products"
export type {
  RFQItem,
  GetRFQParams,
  RFQResponse,
  ApiResponse as RFQApiResponse,
} from "./rfq"
export type {
  OrderItem,
  // ProductInfo,
  // LocationInfo,
  GetOrdersParams,
  OrdersResponse,
  // ApiResponse as OrderApiResponse,
} from "./orders"
export type {
  CustomerReview,
  GetCustomerReviewsParams,
  CustomerReviewsResponse,
  UpdateReviewRequest,
  ApiResponse as CustomerReviewApiResponse,
} from "./customerReviews"
export type {
  Shipment,
  TrackingEvent,
  GetShipmentsParams,
  ShipmentsResponse,
  ApiResponse as ShipmentApiResponse,
} from "./shipments"
