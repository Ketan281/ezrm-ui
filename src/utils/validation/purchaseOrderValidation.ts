import * as yup from 'yup';
import { PurchaseOrderStatus } from '../../api/services/purchaseOrders';

// Validation schema for purchase order items
export const purchaseOrderItemSchema = yup.object({
  product_id: yup.string().required('Product is required'),
  product_name: yup.string().required('Product name is required'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number'),
  unit_price: yup
    .number()
    .required('Unit price is required')
    .positive('Unit price must be positive'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive'),
  status: yup
    .string()
    .oneOf(Object.values(PurchaseOrderStatus), 'Invalid status')
    .required('Status is required'),
});

// Validation schema for shipping address
export const shippingAddressSchema = yup.object({
  street: yup.string().required('Street address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State/Province is required'),
  country: yup.string().required('Country is required'),
  postal_code: yup.string().required('Postal code is required'),
});

// Main validation schema for purchase order
export const purchaseOrderSchema = yup.object({
  supplier_id: yup.string().required('Supplier is required'),
  status: yup
    .string()
    .oneOf(Object.values(PurchaseOrderStatus), 'Invalid status')
    .required('Status is required'),
  total_amount: yup
    .number()
    .required('Total amount is required')
    .positive('Total amount must be positive'),
  currency: yup.string().required('Currency is required'),
  expected_date: yup.string().required('Expected date is required'),
  items: yup
    .array()
    .of(purchaseOrderItemSchema)
    .min(1, 'At least one product item is required')
    .required('Items are required'),
  shipping_address: shippingAddressSchema.required(
    'Shipping address is required'
  ),
  shipping_method: yup.string().required('Shipping method is required'),
  shipping_cost: yup
    .number()
    .required('Shipping cost is required')
    .min(0, 'Shipping cost cannot be negative'),
  tracking_number: yup.string().optional(),
  shipping_date: yup.string().optional(),
  delivery_date: yup.string().optional(),
  shipping_notes: yup.string().optional(),
});

// Validation schema for creating purchase order (API format)
export const createPurchaseOrderSchema = yup.object({
  order: purchaseOrderSchema,
  items: yup
    .array()
    .of(purchaseOrderItemSchema)
    .min(1, 'At least one product item is required')
    .required('Items are required'),
});

export type PurchaseOrderFormData = yup.InferType<typeof purchaseOrderSchema>;
export type CreatePurchaseOrderData = yup.InferType<
  typeof createPurchaseOrderSchema
>;
