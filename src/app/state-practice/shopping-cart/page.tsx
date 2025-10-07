'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  discount: number;
  shipping: number;
}

export default function ShoppingCartExercise() {
  // TODO: Implement a shopping cart with the following features:
  // 1. Add/remove items from cart
  // 2. Update item quantities
  // 3. Calculate totals, taxes, shipping
  // 4. Apply discounts and coupons
  // 5. Save cart to localStorage
  // 6. Wishlist functionality
  // 7. Product filtering and search
  // 8. Cart persistence across sessions
  
  // Your implementation here:
  const [cart, setCart] = useState<CartState>({
    items: [],
    total: 0,
    itemCount: 0,
    discount: 0,
    shipping: 0
  });

  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, image: '🎧', category: 'Electronics', inStock: true },
    { id: 2, name: 'Smart Watch', price: 199.99, image: '⌚', category: 'Electronics', inStock: true },
    { id: 3, name: 'Coffee Maker', price: 79.99, image: '☕', category: 'Home', inStock: true },
    { id: 4, name: 'Running Shoes', price: 129.99, image: '👟', category: 'Sports', inStock: false },
    { id: 5, name: 'Laptop Stand', price: 49.99, image: '💻', category: 'Electronics', inStock: true },
    { id: 6, name: 'Yoga Mat', price: 39.99, image: '🧘', category: 'Sports', inStock: true },
    { id: 7, name: 'Desk Lamp', price: 59.99, image: '💡', category: 'Home', inStock: true },
    { id: 8, name: 'Water Bottle', price: 24.99, image: '🍶', category: 'Sports', inStock: true },
  ];

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const coupons = {
    'SAVE10': 0.1,
    'SAVE20': 0.2,
    'WELCOME': 0.15
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          ...prev,
          items: prev.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...prev,
          items: [...prev.items, { product, quantity: 1 }]
        };
      }
    });
    calculateTotals();
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.product.id !== productId)
    }));
    calculateTotals();
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    }));
    calculateTotals();
  };

  const calculateTotals = () => {
    setCart(prev => {
      const subtotal = prev.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = prev.items.reduce((sum, item) => sum + item.quantity, 0);
      const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
      const discountAmount = subtotal * prev.discount;
      const total = subtotal + shipping - discountAmount;

      return {
        ...prev,
        total: Math.max(0, total),
        itemCount,
        shipping
      };
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const applyCoupon = () => {
    const discount = coupons[couponCode as keyof typeof coupons];
    if (discount) {
      setCart(prev => ({ ...prev, discount }));
      setAppliedCoupon(couponCode);
      setCouponCode('');
      calculateTotals();
    }
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
      discount: 0,
      shipping: 0
    });
    setAppliedCoupon(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Recalculate totals when cart changes
  useState(() => {
    calculateTotals();
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
              
              {/* Search and Filter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-4 ${
                      !product.inStock ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="text-4xl mb-2">{product.image}</div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600">{product.category}</p>
                    <p className="text-lg font-bold text-green-600">${product.price}</p>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`px-3 py-2 rounded transition-colors ${
                          wishlist.has(product.id)
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {wishlist.has(product.id) ? '❤️' : '🤍'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shopping Cart</h2>
              
              {cart.items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-3 mb-4">
                    {cart.items.map(item => (
                      <div key={item.product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                        <div className="text-2xl">{item.product.image}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.product.name}</h4>
                          <p className="text-gray-600 text-sm">${item.product.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={applyCoupon}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedCoupon && (
                      <p className="text-green-600 text-sm mt-1">
                        Coupon "{appliedCoupon}" applied! ({Math.round(cart.discount * 100)}% off)
                      </p>
                    )}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Items ({cart.itemCount}):</span>
                      <span>${(cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{cart.shipping === 0 ? 'Free' : `$${cart.shipping}`}</span>
                    </div>
                    {cart.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-${(cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) * cart.discount).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>${cart.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                      Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}

              {/* Wishlist */}
              {wishlist.size > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-2">Wishlist ({wishlist.size})</h3>
                  <div className="space-y-2">
                    {products.filter(p => wishlist.has(p.id)).map(product => (
                      <div key={product.id} className="flex items-center space-x-2 text-sm">
                        <span>{product.image}</span>
                        <span className="flex-1">{product.name}</span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Exercise Goals:</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>✓ Manage complex nested state objects</li>
            <li>✓ Implement shopping cart logic with calculations</li>
            <li>✓ Handle multiple related state variables</li>
            <li>✓ Implement filtering and search functionality</li>
            <li>✓ Manage wishlist state separately from cart</li>
            <li>✓ Calculate totals, discounts, and shipping dynamically</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
