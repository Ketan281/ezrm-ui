import { api, ENDPOINTS } from '../config';

export const productsService = {
  // Get user profile
  getProducts: async ({ queryKeys }: any) => {
    const [, { page, limit, search }] = queryKeys;

    const params = {
      page,
      limit,
      search,
    };

    const { data } = await api.get(`${ENDPOINTS.PRODUCTS.GET}`, {
      params,
    });
    return data;
  },

  // Update profile
  updateProduct: async ({
    productId,
    data,
  }: {
    productId: string;
    data: any;
  }) => {
    const response = await api.put(
      `${ENDPOINTS.PRODUCTS.GET}/${productId}`,
      data
    );
    return response.data;
  },

  addProduct: async (data: any) => {
    const response = await api.post(ENDPOINTS.PRODUCTS.GET, data);
    return response.data;
  },

  deleteProduct: async ({ productId }: { productId: string }) => {
    const response = await api.delete(`${ENDPOINTS.PRODUCTS.GET}/${productId}`);
    return response.data;
  },
};
