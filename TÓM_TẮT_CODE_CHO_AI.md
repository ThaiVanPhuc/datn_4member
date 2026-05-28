# TÓM TẮT CODE DỰ ÁN SHOPDOAN CHO AI HIỂU

---

## PHẦN 1: ARCHITECTURE TỔNG QUÁT

### 1.1. Cấu Trúc Project

Dự án chia thành **3 phần chính**:

```
SHOPDOAN/
├── shopdoan-api/          # Backend (NestJS + PostgreSQL)
├── shopdoan-ui/           # Frontend (Next.js monorepo)
│   ├── apps/admin/        # Admin dashboard
│   └── apps/user/         # User & Seller app
└── diagram-generator/     # Tool để vẽ diagrams (mermaid)
```

### 1.2. Tech Stack

**Backend (API):**
- NestJS (TypeScript)
- PostgreSQL + Prisma ORM
- GraphQL + REST API
- JWT Authentication
- Stripe Payments
- Socket.io (WebSocket for Chatbot)
- Jest (Testing)

**Frontend:**
- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS
- NextAuth.js (Authentication)
- SWR (Data fetching)
- Zustand/Context (State management)

**Database:**
- PostgreSQL (20+ tables)
- Prisma migrations
- Vector embeddings (for recommendations)

---

## PHẦN 2: DATABASE SCHEMA

### 2.1. Main Tables (20+ entities)

```
┌─────────────────────────────────────────┐
│           CORE ENTITIES                  │
├─────────────────────────────────────────┤
│  • users (người dùng)                   │
│  • roles (vai trò)                      │
│  • user_roles (gán role)                │
│  • notifications (thông báo)            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         SELLER MANAGEMENT                │
├─────────────────────────────────────────┤
│  • seller_profiles (hồ sơ bán hàng)    │
│  • shops (cửa hàng)                     │
│  • seller_requests (yêu cầu bán hàng)  │
│  • shop_categories (danh mục shop)      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       PRODUCT MANAGEMENT                 │
├─────────────────────────────────────────┤
│  • products (sản phẩm marketplace)      │
│  • menu_items (mục trong menu)          │
│  • categories (danh mục)                │
│  • product_variants (biến thể sản phẩm)│
│  • product_images (hình sản phẩm)       │
│  • product_attributes (thuộc tính)      │
│  • product_embeddings (vector AI)       │
│  • menus (menu tổng)                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       SHOPPING & ORDERS                  │
├─────────────────────────────────────────┤
│  • carts (giỏ hàng)                     │
│  • cart_items (mục giỏ hàng)            │
│  • orders (đơn hàng)                    │
│  • order_items (mục đơn hàng)           │
│  • order_details (chi tiết đơn)         │
│  • payments (thanh toán)                │
│  • inventory_movements (biến động kho)  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       REVIEWS & RATINGS                  │
├─────────────────────────────────────────┤
│  • reviews (đánh giá)                   │
│  • product_views (view sản phẩm)        │
│  • product_view_history (lịch xem)      │
│  • search_history (lịch tìm kiếm)       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       AI & COMMUNICATION                 │
├─────────────────────────────────────────┤
│  • conversations (cuộc trò chuyện)      │
│  • messages (tin nhắn)                  │
│  • chat_sessions (phiên chat)           │
│  • ai_memories (nhớ từ AI)              │
│  • recommendation_logs (log gợi ý)      │
└─────────────────────────────────────────┘
```

### 2.2. Key Enum Types

```typescript
// Trạng thái sản phẩm
enum MarketplaceProductStatus {
  DRAFT       // Bản nháp
  ACTIVE      // Đang bán
  INACTIVE    // Tạm ẩn
  BANNED      // Bị cấm
}

// Trạng thái đơn hàng
enum MarketplaceOrderStatus {
  PENDING     // Chờ xác nhận
  CONFIRMED   // Đã xác nhận
  PACKING     // Đóng gói
  SHIPPING    // Đang giao
  DELIVERED   // Đã giao
  CANCELLED   // Đã hủy
}

// Vai trò người dùng
enum UserRole {
  BUYER       // Người mua
  SELLER      // Người bán
  ADMIN       // Quản trị viên
}

// Trạng thái bán hàng
enum SellerProfileStatus {
  PENDING     // Chờ duyệt
  APPROVED    // Đã duyệt
  REJECTED    // Bị từ chối
  SUSPENDED   // Bị tạm dừng
}

// Phương thức thanh toán
enum PaymentMethod {
  COD          // Thanh toán khi nhận hàng
  MOMO         // Ví MoMo
  CREDIT_CARD  // Thẻ tín dụng
  BANK_TRANSFER // Chuyển khoản ngân hàng
}
```

### 2.3. Key Relationships

```
User (1) ──┬──→ (N) Orders
           ├──→ (N) Reviews
           ├──→ (N) SellerProfile (as seller)
           ├──→ (1) Cart
           ├──→ (N) ChatSessions
           └──→ (N) Notifications

SellerProfile (1) ──┬──→ (N) Products
                    ├──→ (N) OrderItems
                    └──→ (1) User

Product (1) ──┬──→ (N) ProductImages
              ├──→ (N) ProductVariants
              ├──→ (N) CartItems
              ├──→ (N) OrderItems
              ├──→ (N) Reviews
              └──→ (N) RecommendationLogs

Category (1) ──→ (N) Products
Category (1) ──→ (N) MenuItems

Order (1) ──┬──→ (N) OrderItems
            ├──→ (N) OrderDetails
            └──→ (N) Payments

Cart (1) ──→ (N) CartItems
CartItem (N) ──→ (1) Product or MenuItem
```

---

## PHẦN 3: BACKEND API (NestJS)

### 3.1. Module Structure

**app.module.ts** - Import toàn bộ modules:
- AuthModule (login, register, JWT)
- UsersModule (profile, settings)
- ProductsModule (marketplace products)
- MenusModule & MenuItemsModule (menu items)
- CartModule (shopping cart)
- OrdersModule (orders)
- ReviewsModule (ratings & reviews)
- ChatbotModule (AI chat)
- PaymentsModule (Stripe, payments)
- SearchModule (search products)
- RecommendationModule (AI recommendations)
- ShopsModule (seller shops)
- SellersModule (seller management)
- ShopChatModule (chat giữa buyer-seller)
- NotificationsModule (notifications)
- MailModule (email)
- UploadModule (upload files)

**Global Guards & Interceptors:**
- JwtAuthGuard (JWT authentication)
- RolesGuard (role-based access)
- AppThrottlerGuard (rate limiting)
- GraphQL support (Apollo)

### 3.2. Authentication Flow

**Files:**
- `auth/auth.service.ts` - Logic đăng nhập/đăng ký
- `auth/auth.controller.ts` - Endpoints
- `auth/passport/jwt.strategy.ts` - JWT strategy
- `auth/passport/local.strategy.ts` - Local strategy
- `auth/guards/jwt-auth.guard.ts` - JWT guard
- `auth/decorators/current-user.decorator.ts` - Get current user
- `auth/decorators/roles.decorator.ts` - Role validation

**Main Endpoints:**
```
POST   /auth/register           # Đăng ký
POST   /auth/login              # Đăng nhập
POST   /auth/refresh-token      # Làm mới token
POST   /auth/change-password    # Đổi mật khẩu
POST   /auth/forgot-password    # Quên mật khẩu
POST   /auth/reset-password     # Đặt lại mật khẩu
```

**Auth Flow:**
```
1. User gửi email + password → register/login
2. API kiểm tra password (bcrypt)
3. Nếu đúng → tạo JWT token
4. Client lưu token vào localStorage/cookie
5. Mỗi request, gửi header: Authorization: Bearer {token}
6. JwtAuthGuard kiểm tra token → cho phép hoặc từ chối
```

### 3.3. Products Module

**Files:**
- `modules/products/products.service.ts` - Business logic
- `modules/products/products.controller.ts` - API endpoints
- `modules/products/dto/product.dto.ts` - Data transfer objects

**Main Endpoints:**
```
GET    /products                      # Lấy danh sách sản phẩm
GET    /products/:id                  # Chi tiết sản phẩm
POST   /products                      # Tạo sản phẩm (Seller only)
PUT    /products/:id                  # Sửa sản phẩm (Seller only)
DELETE /products/:id                  # Xóa sản phẩm (Seller only)

GET    /products/:id/reviews          # Lấy đánh giá
POST   /products/:id/reviews          # Tạo đánh giá
```

**Query Parameters:**
```typescript
{
  limit?: number              // Số lượng (default: 20)
  offset?: number             // Bỏ qua bao nhiêu (default: 0)
  sortBy?: 'newest' | 'best_selling' | 'price_asc' | 'price_desc'
  categoryId?: number         // Lọc theo danh mục
  searchQuery?: string        // Tìm kiếm full-text
  minPrice?: number           // Giá tối thiểu
  maxPrice?: number           // Giá tối đa
}
```

**Response:**
```typescript
{
  products: [
    {
      id: number
      name: string
      description: string
      price: number
      salePrice?: number
      stock: number
      soldCount: number
      ratingAverage: number
      ratingCount: number
      images: [{ id, imageUrl, sortOrder }]
      variants: [{ id, name, value, price, stock }]
      seller: { id, shopName, rating }
      category: { id, name }
    }
  ]
  total: number
  page: number
  pages: number
}
```

### 3.4. Orders Module

**Files:**
- `modules/orders/orders.service.ts` - Order business logic
- `modules/orders/orders.controller.ts` - Order API
- `modules/orders/dto/order.dto.ts` - Order DTOs

**Main Endpoints:**
```
GET    /orders                  # Lấy orders của user
GET    /orders/:id              # Chi tiết order
POST   /orders                  # Tạo order mới (Checkout)
PUT    /orders/:id/cancel       # Hủy order
PUT    /orders/:id/status       # Cập nhật trạng thái
```

**Order Creation Flow:**
```
1. Frontend gửi POST /orders với:
   {
     cartItems: [{ productId, quantity, variantId }],
     shippingAddress: { name, phone, address },
     paymentMethod: 'COD' | 'STRIPE' | 'MOMO',
     note: string
   }

2. Backend:
   - Kiểm tra stock
   - Kiểm tra giá hiện tại
   - Tạo Order record
   - Tạo OrderItems từ cart
   - Tạo Payment record nếu là Stripe
   - Xóa CartItems
   - Gửi email confirm

3. Response:
   {
     orderId: number
     orderCode: string
     totalPrice: number
     status: 'PENDING'
     paymentUrl?: string (nếu Stripe)
   }
```

### 3.5. Cart Module

**Files:**
- `modules/cart/cart.service.ts` - Cart logic
- `modules/cart/cart.controller.ts` - Cart API

**Main Endpoints:**
```
GET    /cart                    # Lấy giỏ hàng
POST   /cart/items              # Thêm item
PUT    /cart/items/:id          # Sửa quantity
DELETE /cart/items/:id          # Xóa item
POST   /cart/validate           # Kiểm tra hợp lệ
```

**Cart Item Structure:**
```typescript
{
  id: number
  userId: number
  cartId: number
  menuItemId?: number          // Nếu là menu item
  productId?: number           // Nếu là marketplace product
  variantId?: number           // Nếu có variant
  quantity: number
  priceAtTime: number          // Giá khi thêm vào
  note?: string
  createdAt: DateTime
}
```

### 3.6. Chatbot Module

**Files:**
- `modules/chatbot/chatbot.service.ts` - Chatbot AI logic
- `modules/chatbot/chatbot.controller.ts` - REST endpoints
- `modules/chatbot/chatbot.gateway.ts` - WebSocket (Socket.io)

**Features:**
- Hybrid approach (Rule-based + Retrieval + LLM)
- Claude API integration
- Memory management
- Multi-language support (Vietnamese, English)

**Main Endpoints:**
```
POST   /chatbot/messages        # Gửi message
GET    /chatbot/history         # Lịch chat
WS     /chatbot                 # WebSocket connection
```

**Chatbot Response:**
```typescript
{
  reply: string                 // Câu trả lời
  source: 'rule' | 'retrieval' | 'llm'  // Nguồn
  confidence: number            // 0-1
  quickActions?: string[]       // Quick reply buttons
  needsEscalation?: boolean     // Cần chuyển agent?
}
```

### 3.7. Payments Module

**Files:**
- `modules/payments/payments.service.ts` - Payment logic
- `modules/payments/payments.controller.ts` - Payment API

**Main Endpoints:**
```
POST   /payments/stripe/intent  # Tạo Stripe intent
POST   /payments/webhook        # Webhook từ Stripe
GET    /payments/:id            # Chi tiết payment
```

**Payment Flow:**
```
1. User checkout với payment method = STRIPE
2. Frontend gọi POST /payments/stripe/intent
3. API tạo Stripe PaymentIntent
4. Frontend show Stripe form
5. User thanh toán
6. Stripe webhook gọi /payments/webhook
7. API cập nhật Payment status = PAID
8. Order status = CONFIRMED
9. Gửi email thông báo
```

### 3.8. Search Module

**Files:**
- `modules/search/search.service.ts` - Search logic
- `modules/search/search.controller.ts` - Search API

**Features:**
- Full-text search (PostgreSQL)
- Fuzzy matching
- Filter by price, category, rating
- Search history tracking
- AI-powered recommendations

**Main Endpoints:**
```
GET    /search                  # Tìm kiếm
GET    /search/suggestions      # Gợi ý tìm kiếm
GET    /search/trending         # Trending products
```

### 3.9. Recommendations Module

**Files:**
- `modules/recommendation/recommendation.service.ts` - Recommendation AI
- `modules/recommendation/recommendation.resolver.ts` - GraphQL endpoint

**Features:**
- Collaborative filtering (user-user, item-item)
- Content-based filtering (embeddings)
- Popularity-based
- Seasonal trends

**Recommendation Flow:**
```
1. User xem sản phẩm → lưu ProductView
2. User mua sản phẩm → lưu Order
3. Cron job chạy mỗi đêm:
   - Tính similarity giữa users
   - Tính similarity giữa products
   - Tạo recommendations
4. Frontend gọi GET /recommendations?userId=X
5. API trả về top 20 sản phẩm gợi ý
```

### 3.10. Sellers Module

**Files:**
- `modules/sellers/sellers.service.ts` - Seller logic
- `modules/sellers/sellers.controller.ts` - Seller API
- `modules/sellers/admin-sellers.controller.ts` - Admin seller management

**Main Endpoints:**
```
POST   /sellers/register         # Đăng ký bán hàng
GET    /sellers/:id              # Thông tin seller
GET    /sellers/me/dashboard     # Dashboard seller
GET    /sellers/me/products      # Sản phẩm của seller
GET    /sellers/me/orders        # Đơn hàng của seller
GET    /sellers/me/analytics     # Analytics

# Admin only
GET    /admin/sellers            # Danh sách seller
PUT    /admin/sellers/:id/approve  # Duyệt seller
PUT    /admin/sellers/:id/reject   # Từ chối seller
PUT    /admin/sellers/:id/suspend  # Tạm dừng seller
```

---

## PHẦN 4: FRONTEND (Next.js)

### 4.1. Project Structure

```
shopdoan-ui/
├── apps/
│   ├── user/                    # User app
│   │   ├── src/app/
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── auth/            # Login, register, forgot password
│   │   │   ├── menu/            # Product listing & filtering
│   │   │   ├── cart/            # Shopping cart
│   │   │   ├── checkout/        # Checkout pages
│   │   │   ├── orders/          # Order tracking
│   │   │   ├── profile/         # User profile
│   │   │   ├── seller/          # Seller pages
│   │   │   │   ├── register/    # Seller registration
│   │   │   │   ├── products/    # Seller products management
│   │   │   │   ├── orders/      # Seller orders
│   │   │   │   ├── chats/       # Seller chats
│   │   │   │   └── page.tsx     # Seller dashboard
│   │   │   ├── shop/            # Shop detail pages
│   │   │   └── api/
│   │   │       ├── auth/[...nextauth]/  # NextAuth.js API
│   │   │       └── chatbot/     # Chatbot API
│   │   ├── src/components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── product/
│   │   │   │   └── ProductCard.tsx
│   │   │   ├── seller/
│   │   │   │   ├── ProductForm.tsx
│   │   │   │   └── SellerShell.tsx
│   │   │   └── ui/
│   │   │       └── Chatbot.tsx
│   │   ├── src/services/
│   │   │   ├── marketplaceService.ts    # Marketplace API calls
│   │   │   ├── authService.ts           # Auth API calls
│   │   │   ├── cartService.ts           # Cart API calls
│   │   │   ├── ordersService.ts         # Orders API calls
│   │   │   ├── chatbotService.ts        # Chatbot API calls
│   │   │   ├── sellerProductService.ts  # Seller product API
│   │   │   ├── sellerOrderService.ts    # Seller order API
│   │   │   ├── uploadService.ts         # File upload API
│   │   │   ├── paymentsService.ts       # Payment API
│   │   │   └── reviewsService.ts        # Reviews API
│   │   ├── src/context/
│   │   │   └── CartContext.tsx          # Cart state management
│   │   ├── src/lib/
│   │   │   ├── auth.ts                  # Auth utils
│   │   │   ├── config.ts                # API config
│   │   │   ├── format.ts                # Format utilities
│   │   │   └── checkoutStorage.ts       # Checkout data storage
│   │   ├── src/types/
│   │   │   └── next-auth.d.ts           # NextAuth.js types
│   │   ├── i18n.ts                      # i18n config
│   │   └── middleware.ts                # Next.js middleware
│   │
│   └── admin/                   # Admin dashboard
│       ├── src/app/
│       │   ├── page.tsx         # Dashboard
│       │   ├── layout.tsx
│       │   └── [admin pages]
│       └── ...
└── shared/                      # Shared components & utilities
```

### 4.2. Authentication (NextAuth.js)

**File:** `apps/user/src/app/api/auth/[...nextauth]/route.ts`

**Config:**
```typescript
{
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Call backend API to verify credentials
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials)
        })
        const user = await res.json()
        return user
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      // Add access token to JWT
      return { ...token, accessToken: user.accessToken }
    },
    async session({ session, token }) {
      // Add token to session
      session.accessToken = token.accessToken
      return session
    }
  },
  
  session: { strategy: 'jwt' }
}
```

**Login Flow (Frontend):**
```
1. User fills email + password → click Sign In
2. NextAuth.js calls signIn('credentials', { email, password })
3. authorize() calls backend POST /auth/login
4. Backend returns { user, accessToken, refreshToken }
5. NextAuth.js stores token in JWT
6. Frontend redirected to dashboard
7. Mỗi API call, NextAuth.js thêm token vào header
```

### 4.3. Homepage (page.tsx)

**Features:**
- Hero section (banner)
- Trust badges
- Category carousel (top 10)
- Flash sale products
- Recommended products
- Chatbot widget (bottom-right)

**Data Fetching (Client-side):**
```typescript
useEffect(() => {
  Promise.all([
    getCategories(10),           // Get top 10 categories
    getProducts({ limit: 8, sortBy: 'best_selling' }),  // Best selling
    getHomeRecommendations(8)    // AI recommendations
  ])
  .then(([cats, best, recs]) => {
    setCategories(cats)
    setBestSelling(best.products)
    setRecommended(recs)
  })
}, [])
```

### 4.4. Product Listing (menu/page.tsx)

**Features:**
- Product grid (2x-4x columns responsive)
- Search bar
- Category filter
- Price range filter
- Sort options (new, best selling, price)
- Pagination
- Loading states

**Query Parameters:**
```
/menu?
  categoryId=5&
  search=iphone&
  sortBy=best_selling&
  minPrice=1000000&
  maxPrice=50000000&
  page=1
```

### 4.5. Shopping Cart (cart/page.tsx)

**Features:**
- List of cart items
- Edit quantity
- Remove items
- Cart summary (subtotal, tax, shipping)
- Checkout button
- Continue shopping link

**Cart Context:**
```typescript
interface CartContextType {
  cartItems: CartItem[]
  cartTotal: number
  cartCount: number
  addToCart: (product: Product, quantity: number) => Promise<void>
  removeFromCart: (cartItemId: number) => Promise<void>
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
}
```

### 4.6. Checkout (checkout/page.tsx)

**Multi-step Checkout:**

**Step 1: Cart Review**
- List items
- Edit quantities
- Apply coupon

**Step 2: Shipping Address**
- Select existing address or add new
- Validate address fields

**Step 3: Shipping Method**
- Choose: Standard (free) / Express (+fee)
- Show delivery time

**Step 4: Payment Method**
- COD (Cash on Delivery)
- Credit Card (Stripe)
- E-wallet

**Step 5: Review & Place Order**
- Final summary
- Place Order button

**Checkout Flow:**
```
Frontend:
1. getSessionStorage('checkoutData') → get cart items
2. User fills shipping address
3. User selects shipping method
4. User selects payment method
5. User clicks "Place Order"
6. Frontend POST /api/orders {
     cartItems, address, shippingMethod, paymentMethod
   }

Backend:
1. Validate stock
2. Create Order record
3. If payment = STRIPE:
   - Create PaymentIntent
   - Return paymentUrl
4. If payment = COD:
   - Mark as PENDING
5. Delete CartItems
6. Send order confirmation email

Frontend:
7. If Stripe: redirect to payment form
8. If COD: show order confirmation
9. Redirect to /orders/:orderId
```

### 4.7. Order Tracking (orders/page.tsx)

**Features:**
- List all user orders
- Order status badge
- Click to view details
- Cancel order button (if pending)
- Leave review button (if delivered)

**Order Detail Page:**
- Order items with images
- Tracking information
- Shipping address
- Payment info
- Contact seller button

### 4.8. Seller Dashboard (seller/page.tsx)

**Features for Sellers:**
- Sales overview (today, week, month)
- Revenue chart
- Top products
- Recent orders
- Shop rating

**Seller Pages:**
- `/seller/products` - Manage products (CRUD)
- `/seller/orders` - Manage orders (confirm, cancel, mark as shipped)
- `/seller/chats` - Chat with customers
- `/seller/register` - Seller registration

### 4.9. Services (API Clients)

**marketplaceService.ts:**
```typescript
export async function getProducts(params: {
  limit?: number
  offset?: number
  sortBy?: string
  categoryId?: number
}) {
  const res = await fetch(
    `${API_URL}/products?${new URLSearchParams(params)}`
  )
  return res.json()
}

export async function getProduct(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`)
  return res.json()
}

export async function getHomeRecommendations(limit: number) {
  const res = await fetch(
    `${API_URL}/recommendations/home?limit=${limit}`
  )
  return res.json()
}
```

**authService.ts:**
```typescript
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

export async function register(data: {
  email: string
  password: string
  fullName: string
  phone?: string
}) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}
```

**cartService.ts:**
```typescript
export async function addToCart(
  productId: number,
  quantity: number,
  variantId?: number
) {
  const res = await fetch(`${API_URL}/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ productId, quantity, variantId })
  })
  return res.json()
}

export async function getCart() {
  const res = await fetch(`${API_URL}/cart`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
  return res.json()
}
```

**chatbotService.ts:**
```typescript
export async function sendChatMessage(message: string) {
  const res = await fetch(`${API_URL}/chatbot/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ message })
  })
  return res.json()
}

export async function connectChatbot() {
  // WebSocket connection
  const ws = new WebSocket(`${WS_URL}/chatbot`)
  return ws
}
```

### 4.10. Components

**ProductCard.tsx:**
```typescript
export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="rounded-lg bg-white shadow">
        {/* Image */}
        <Image
          src={product.images[0]?.imageUrl}
          alt={product.name}
          width={200}
          height={200}
        />
        
        {/* Sale badge */}
        {product.salePrice && (
          <Badge>-{calculateDiscount()}%</Badge>
        )}
        
        {/* Product info */}
        <h3>{product.name}</h3>
        <Rating value={product.ratingAverage} count={product.ratingCount} />
        
        {/* Price */}
        <div className="flex gap-2">
          <span className="font-bold">{product.salePrice || product.price}</span>
          {product.salePrice && <span className="line-through">{product.price}</span>}
        </div>
        
        {/* Shop */}
        <p className="text-sm text-gray-600">{product.seller.shopName}</p>
        
        {/* Add to cart button */}
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </Link>
  )
}
```

**Chatbot.tsx:**
```typescript
export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const handleSendMessage = async () => {
    const response = await sendChatMessage(input)
    setMessages(prev => [
      ...prev,
      { role: 'user', content: input },
      { role: 'assistant', content: response.reply }
    ])
    setInput('')
  }

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)}>
        💬 Chat with us
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg">
      <div className="p-4 bg-blue-600 text-white rounded-t-lg">
        ShopDoan Support
      </div>
      
      <div className="h-96 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : ''}>
            {msg.content}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}
```

---

## PHẦN 5: AI CHATBOT IMPLEMENTATION

### 5.1. Hybrid Approach

```
User Message
    ↓
[Intent Matcher] (Rule-based)
  - Pattern matching: "reset password", "shipping cost"
  - If matched → Return instant answer
  ↓ (No match)
[FAQ Retriever] (Semantic search)
  - Search knowledge base with embeddings
  - If high confidence (>0.8) → Return FAQ answer
  ↓ (Low confidence)
[Claude API] (LLM-based)
  - Call Claude with context
  - Generate natural response
  - Highest quality but slower
```

### 5.2. Claude Integration

**API Call:**
```typescript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const response = await client.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 500,
  system: `You are ShopDoan support assistant.
    - Help with orders, products, returns, shipping
    - Be helpful and professional
    - If unsure, offer to escalate to human agent
    
    Platform info:
    - Return window: 30 days
    - Shipping: Standard (free, 2-3 days) or Express (+fee)
    - Payment: COD, Stripe, MoMo`,
  messages: [
    { role: 'user', content: userMessage }
  ]
})

const reply = response.content[0].text
```

### 5.3. Memory System

**AiMemory Table:**
```typescript
{
  id: number
  userId: number
  conversationId: number
  type: 'product_preference' | 'order_history' | 'complaint'
  content: string  // JSON data
  createdAt: DateTime
}
```

**Example:**
```typescript
// Store user preferences
{
  type: 'product_preference',
  content: JSON.stringify({
    favoriteCategories: ['electronics', 'fashion'],
    priceRange: { min: 100000, max: 5000000 },
    brands: ['Samsung', 'Apple']
  })
}

// Store past issues
{
  type: 'complaint',
  content: JSON.stringify({
    date: '2024-01-15',
    issue: 'Late delivery',
    resolution: 'Refunded shipping fee'
  })
}
```

---

## PHẦN 6: DATA FLOW DIAGRAMS

### 6.1. User Browsing Products

```
User opens homepage
    ↓
Frontend calls getCategories(10)
    ↓
Backend: GET /categories?limit=10
    ↓
Database: SELECT * FROM categories ORDER BY sort_order LIMIT 10
    ↓
Backend returns: [{ id, name, image, ... }]
    ↓
Frontend renders category carousel
    ↓
User clicks category
    ↓
Frontend navigates to /menu?categoryId=5
    ↓
Frontend calls getProducts({ categoryId: 5, limit: 20 })
    ↓
Backend: GET /products?categoryId=5&limit=20&offset=0
    ↓
Database: SELECT * FROM products 
          WHERE categoryId=5 AND status='ACTIVE'
          ORDER BY soldCount DESC
          LIMIT 20
    ↓
Backend returns products with images, variants, seller info
    ↓
Frontend renders product grid
    ↓
User clicks product
    ↓
Frontend navigates to /products/123
    ↓
Backend: GET /products/123
    ↓
Database: SELECT * FROM products WHERE id=123
         + SELECT * FROM product_images WHERE productId=123
         + SELECT * FROM product_variants WHERE productId=123
         + SELECT * FROM reviews WHERE productId=123 ORDER BY created DESC LIMIT 5
    ↓
Increment view count (async)
    ↓
Frontend shows product detail page with images, variants, reviews
```

### 6.2. Adding to Cart

```
User clicks "Add to Cart" on product
    ↓
Frontend shows quantity selector
    ↓
User enters quantity, clicks "Add to Cart"
    ↓
Frontend calls addToCart({ productId: 123, quantity: 2 })
    ↓
Backend: POST /cart/items
         Body: { productId: 123, quantity: 2, variantId: 45 }
    ↓
Backend finds or creates Cart for user
    ↓
Database: INSERT INTO cart_items
          (userId, productId, variantId, quantity, priceAtTime, cartKey)
          VALUES (userId, 123, 45, 2, 1500000, 'product-123-variant-45')
    ↓
Backend returns created CartItem
    ↓
Frontend updates CartContext
    ↓
Toast notification: "Added to cart"
    ↓
Cart icon shows updated count
```

### 6.3. Checkout & Order Creation

```
User clicks "Checkout" button
    ↓
Frontend navigates to /checkout
    ↓
Step 1: Review cart items
  - Show list of items
  - Can edit quantities or remove
  - Show subtotal

Step 2: Select shipping address
  - Show existing addresses
  - Can add new address
  - Validate required fields

Step 3: Select shipping method
  - Standard (free, 2-3 days)
  - Express (+50k VND, 1 day)

Step 4: Select payment method
  - COD (Cash on Delivery)
  - Credit Card (Stripe)

Step 5: Review & place order
  - Final review
  - Place Order button
    ↓
Frontend POST /orders
         Body: {
           cartItems: [{ productId, quantity }],
           shippingAddressId: 5,
           shippingMethod: 'STANDARD',
           paymentMethod: 'STRIPE',
           note: 'Please ring doorbell'
         }
    ↓
Backend validates everything:
  - Check stock availability
  - Check current prices
  - Check shipping address exists
    ↓
Backend creates Order:
  - INSERT INTO orders (userId, totalAmount, status, paymentMethod)
  - INSERT INTO order_items (FROM cart_items)
  - Decrement product stock
    ↓
If payment = STRIPE:
  - Call Stripe API to create PaymentIntent
  - Store paymentIntentId
  - Return paymentUrl to frontend
    ↓
If payment = COD:
  - Set paymentStatus = PENDING
  - Wait for cash payment at delivery
    ↓
Delete CartItems for this user
    ↓
Send email to user with order confirmation
    ↓
Backend response:
  {
    orderId: 456,
    orderCode: 'ORD-20240115-001234',
    totalAmount: 3000000,
    status: 'PENDING',
    paymentUrl: 'https://stripe.com/...' (only for Stripe)
  }
    ↓
Frontend:
  If Stripe: Redirect to paymentUrl
  If COD: Show success page and redirect to /orders/456
```

### 6.4. Chatbot Flow

```
User types "How to return products?" in chatbot
    ↓
Frontend sends to /chatbot/messages
    ↓
Backend receives message, runs intent matcher:
  - Check patterns: /return|refund|exchange/i
  - Found: RETURN_POLICY intent with confidence 1.0
    ↓
Backend has predefined response:
  "Our return policy:
   - 30 days return window
   - Product in original packaging
   - Go to My Orders → Return/Refund"
    ↓
Response sent immediately (< 100ms)
    ↓
Frontend displays: "Source: Rule-based"
    ↓

---

If user asks: "My package arrived damaged, what should I do?"
    ↓
Intent matcher: No high confidence match
    ↓
FAQ retriever searches knowledge base:
  - Query embedding created
  - Semantic search in product_embeddings
  - Top FAQ: "How to handle damaged packages" (score: 0.75)
    ↓
Score is medium (0.5-0.8), so use as context for LLM
    ↓
Backend calls Claude API with:
  - User message
  - Retrieved FAQ as context
  - User profile (past complaints)
  - Order history
    ↓
Claude generates personalized response:
  "I understand you received a damaged package.
   Based on our FAQ: ...
   Since this is your first complaint, we can offer...
   You can start return in My Orders → Return/Refund"
    ↓
Response sent (2-3 seconds)
    ↓
Frontend displays: "Source: AI (Claude)" with confidence 0.85
    ↓
User clicks "Talk to agent" → escalated to human support
```

---

## PHẦN 7: KEY DATA TRANSFORMATIONS

### 7.1. Product Data Flow

```
Database (products table):
{
  id: 123
  name: "iPhone 14 Pro"
  price: 25000000    // Giá gốc
  salePrice: 22000000 // Giá bán
  stock: 50
  status: "ACTIVE"
  ... other fields
}

    ↓ API returns with relations:

{
  id: 123
  name: "iPhone 14 Pro"
  price: 25000000
  salePrice: 22000000
  discount: 12%
  stock: 50
  images: [
    { id: 1, imageUrl: "...", sortOrder: 0 }
  ]
  variants: [
    { id: 45, name: "256GB", stock: 20 },
    { id: 46, name: "512GB", stock: 30 }
  ]
  seller: {
    id: 5,
    shopName: "Tech Store",
    rating: 4.8
  }
  ratingAverage: 4.8
  ratingCount: 150
  soldCount: 500
}

    ↓ Frontend renders:

ProductCard
  - Show salePrice (bold)
  - Show original price (strikethrough)
  - Show discount badge (-12%)
  - Show seller name
  - Show rating stars
  - Show variants as button group
```

### 7.2. Order Data Flow

```
Frontend sends:
{
  cartItems: [
    { productId: 123, quantity: 2, variantId: 45 }
  ],
  shippingAddressId: 7,
  paymentMethod: 'STRIPE'
}

    ↓ Backend creates records:

INSERT INTO orders:
{
  userId: 10,
  totalPrice: 44000000  // 22M * 2
  shippingFee: 0
  finalAmount: 44000000
  status: PENDING
  paymentMethod: STRIPE
  orderCode: 'ORD-20240115-001234'
}

INSERT INTO order_items:
{
  orderId: 456
  productId: 123
  variantId: 45
  quantity: 2
  price: 22000000  // Price at time of order
  productName: "iPhone 14 Pro"
  productImage: "..."
}

DELETE FROM cart_items WHERE userId=10

INSERT INTO payments:
{
  orderId: 456
  provider: STRIPE
  amount: 44000000
  status: PENDING
  paymentIntentId: "pi_..."
}

    ↓ Frontend receives:

{
  orderId: 456,
  orderCode: 'ORD-20240115-001234',
  totalAmount: 44000000,
  status: 'PENDING',
  paymentUrl: 'https://stripe.com/pay?session=...'
}

    ↓ Frontend redirects to paymentUrl

    ↓ User completes Stripe payment

    ↓ Stripe webhook calls /payments/webhook

Backend updates:
{
  paymentStatus: PAID,
  paidAt: 2024-01-15T10:30:00Z
}

Order status changed to: CONFIRMED

Send email with confirmation

    ↓ Frontend shows success page
```

---

## PHẦN 8: ENVIRONMENT VARIABLES

**Backend (.env):**
```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/shopdoan

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
REFRESH_TOKEN_SECRET=refresh-secret
REFRESH_TOKEN_EXPIRATION=30d

# Email
MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=app-password
MAIL_FROM=noreply@shopdoan.com

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Claude API
ANTHROPIC_API_KEY=sk-ant-...

# Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760  # 10MB

# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## PHẦN 9: COMMON CODE PATTERNS

### 9.1. API Error Handling

```typescript
// Backend (NestJS)
try {
  const product = await this.prisma.product.findUniqueOrThrow({
    where: { id: productId }
  })
} catch (error) {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      throw new NotFoundException('Product not found')
    }
  }
  throw new InternalServerErrorException()
}

// Frontend
try {
  const product = await getProduct(123)
} catch (error) {
  if (error.status === 404) {
    showToast('Product not found')
    router.push('/menu')
  } else if (error.status === 401) {
    // Redirect to login
  } else {
    showToast('Something went wrong')
  }
}
```

### 9.2. Data Fetching with SWR

```typescript
// Use SWR hook
function ProductDetail({ productId }) {
  const { data: product, error, isLoading } = useSWR(
    `/products/${productId}`,
    fetcher,
    { revalidateOnFocus: false }
  )

  if (isLoading) return <Skeleton />
  if (error) return <Error message={error.message} />

  return <ProductCard product={product} />
}

// Or fetch on page load
function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {
      const data = await getProducts({ limit: 10 })
      setProducts(data.products)
    })()
  }, [])

  return <ProductGrid products={products} />
}
```

### 9.3. Form Handling

```typescript
// Frontend
function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    images: []
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate
    if (!formData.name) {
      showError('Name is required')
      return
    }

    try {
      const product = await createProduct(formData)
      showSuccess('Product created')
      router.push(`/products/${product.id}`)
    } catch (error) {
      showError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        value={formData.price}
        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
      />
      <button type="submit">Create</button>
    </form>
  )
}
```

---

## PHẦN 10: IMPORTANT FILES SUMMARY

| File | Purpose | Lines |
|------|---------|-------|
| **Backend** |
| app.module.ts | App configuration, imports | 80 |
| auth/auth.service.ts | Login, register logic | 200+ |
| products/products.service.ts | Product CRUD & search | 300+ |
| orders/orders.service.ts | Order creation & management | 250+ |
| chatbot/chatbot.service.ts | AI chatbot logic | 200+ |
| prisma/schema.prisma | Database schema | 900+ |
| **Frontend (User)** |
| app/page.tsx | Homepage | 300+ |
| app/menu/page.tsx | Product listing | 250+ |
| app/cart/page.tsx | Shopping cart | 200+ |
| app/checkout/page.tsx | Checkout flow | 400+ |
| components/product/ProductCard.tsx | Product card UI | 150+ |
| services/marketplaceService.ts | API calls | 300+ |
| context/CartContext.tsx | Cart state | 150+ |

---

## SUMMARY

Dự án SHOPDOAN là một **full-stack marketplace** với:

1. **Backend**: NestJS + PostgreSQL + Prisma, 20+ modules
2. **Frontend**: Next.js 14 + TypeScript, 2 apps (user + admin)
3. **Database**: 20+ tables, normalized schema
4. **APIs**: 50+ REST endpoints + GraphQL
5. **Features**: Products, Orders, Cart, Payments (Stripe), Chatbot (Claude), Recommendations
6. **Auth**: NextAuth.js + JWT
7. **Real-time**: WebSocket for Chatbot
8. **AI**: Hybrid chatbot (Rule + Retrieval + LLM)

**Key Concepts:**
- Monorepo structure (Nx or pnpm workspaces)
- Modular architecture
- Separated concerns (Backend services, Frontend pages/components)
- Database-driven (Prisma migrations)
- API-first design
- Client-side authentication (NextAuth.js)
- Real-time communication (WebSocket)
- AI integration (Claude API)
