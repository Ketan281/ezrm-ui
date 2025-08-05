# Simplified React Query Hooks

This approach uses `useQuery` and `useMutation` directly in components without complex handler layers, with minimal TypeScript types.

## Usage Pattern

### Queries

```tsx
import { useProducts, useProduct } from '../hooks/useProducts';

function MyComponent() {
  // Get all products
  const { data, isLoading, error } = useProducts();

  // Get single product
  const { data: product } = useProduct(productId);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data?.data?.map((product) => <div key={product.id}>{product.name}</div>)}
    </div>
  );
}
```

### Mutations

```tsx
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '../hooks/useProducts';

function ProductForm() {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleCreate = async (productData) => {
    try {
      await createProduct.mutateAsync(productData);
      // Success toast is handled automatically
    } catch (error) {
      // Error toast is handled automatically
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateProduct.mutateAsync({ id, data });
    } catch (error) {
      // Error handling
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct.mutateAsync(id);
    } catch (error) {
      // Error handling
    }
  };

  return (
    <div>
      <button
        onClick={() => handleCreate({ name: 'Product', price: 100 })}
        disabled={createProduct.isPending}
      >
        {createProduct.isPending ? 'Creating...' : 'Create'}
      </button>
    </div>
  );
}
```

## Benefits

1. **Simpler**: No complex handler layers
2. **Direct**: Use React Query hooks directly where needed
3. **Minimal Types**: Less TypeScript complexity
4. **Automatic**: Success/error toasts handled automatically
5. **Cache Management**: Automatic query invalidation

## Available Hooks

### Products

- `useProducts(params)` - Get all products
- `useProduct(id)` - Get single product
- `useCreateProduct()` - Create product mutation
- `useUpdateProduct()` - Update product mutation
- `useDeleteProduct()` - Delete product mutation

### Suppliers

- `useSuppliers(params)` - Get all suppliers
- `useSupplier(id)` - Get single supplier
- `useCreateSupplier()` - Create supplier mutation
- `useUpdateSupplier()` - Update supplier mutation
- `useDeleteSupplier()` - Delete supplier mutation

### Categories

- `useCategories(params)` - Get all categories
- `useCategory(id)` - Get single category
- `useCreateCategory()` - Create category mutation
- `useUpdateCategory()` - Update category mutation
- `useDeleteCategory()` - Delete category mutation

### Countries (Read-only)

- `useCountries(params)` - Get all countries
- `useCountry(code)` - Get single country by code

## Category Example

```tsx
import { useCategories, useCreateCategory } from '../hooks/useCategories';

function CategoryManager() {
  const { data: categories } = useCategories();
  const createCategory = useCreateCategory();

  const handleCreate = async () => {
    await createCategory.mutateAsync({
      name: 'Industrial Chemicals',
      slug: 'industrial-chemicals',
      description: 'Used in manufacturing and heavy industry.',
      status: 'active',
    });
  };

  return (
    <div>
      {categories?.data?.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
}
```

## Country Example

```tsx
import { useCountries } from '../hooks/useCountries';

function CountrySelector() {
  const { data: countries } = useCountries();

  return (
    <select>
      {countries?.data?.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
```

## Migration from Handlers

Replace:

```tsx
import { useProducts } from '@/api/handlers';
const { data, isLoading } = useProducts({ page, limit });
```

With:

```tsx
import { useProducts } from '@/hooks/useProducts';
const { data, isLoading } = useProducts({ page, limit });
```

The data structure remains the same, but the implementation is much simpler.
