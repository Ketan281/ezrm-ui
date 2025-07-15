export { authService } from "./authService"
export { userService } from "./userService"
export { productsService } from "./products"
export type { LoginCredentials, RegisterData, User, AuthResponse } from "./authService"
export type { UpdateProfileData, ChangePasswordData } from "./userService"
export type {
  CreateProductRequest,
  Product,
  GetProductsParams,
  ProductsResponse,
  ApiResponse,
  UpdateProductRequest
} from "./products"
