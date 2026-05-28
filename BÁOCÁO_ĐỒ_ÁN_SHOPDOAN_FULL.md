# BÁOCÁO ĐỒ ÁN SHOPDOAN - NỀN TẢNG THƯƠNG MẠI ĐIỆN TỬ ĐA BÁN HÀNG (MARKETPLACE)

**Tác giả**: 4 thành viên nhóm  
**Lớp**: DATN 4 Member  
**Ngày hoàn thành**: Tháng 5, 2026  
**Trạng thái**: Hoàn thiện

---

# MỤC LỤC

- [CHƯƠNG 1: GIỚI THIỆU DỰ ÁN](#chương-1-giới-thiệu-dự-án)
- [CHƯƠNG 2: PHÂN TÍCH YÊU CẦU HỆ THỐNG](#chương-2-phân-tích-yêu-cầu-hệ-thống)
- [CHƯƠNG 3: THIẾT KẾ HỆ THỐNG](#chương-3-thiết-kế-hệ-thống)
- [CHƯƠNG 4: TÍCH HỢP TRÍ TUỆ NHÂN TẠO](#chương-4-tích-hợp-trí-tuệ-nhân-tạo)
- [CHƯƠNG 5: KIỂM THỬ HỆ THỐNG](#chương-5-kiểm-thử-hệ-thống)
- [CHƯƠNG 6: TRIỂN KHAI HỆ THỐNG](#chương-6-triển-khai-hệ-thống)
- [CHƯƠNG 7: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN](#chương-7-kết-luận-và-hướng-phát-triển)

---

# CHƯƠNG 1: GIỚI THIỆU DỰ ÁN

## 1.1. Tổng quan dự án

### 1.1.1. Định nghĩa vấn đề

Thương mại điện tử (E-commerce) đang phát triển nhanh chóng tại Việt Nam, tuy nhiên:

- **Thị trường hiện tại** bị thống trị bởi các nền tảng lớn (Lazada, Shopee, Tiki)
- **Các cửa hàng nhỏ lẻ** khó cạnh tranh vì chi phí cao
- **Người tiêu dùng** muốn trải nghiệm mua sắm tốt hơn với AI hỗ trợ
- **Hệ thống cũ** không hỗ trợ chatbot, analytics, hay các tính năng hiện đại

### 1.1.2. Giải pháp

**ShopDoan** - Một nền tảng Marketplace hiện đại cho phép:
- ✅ Nhiều bán hàng bán cùng một sàn
- ✅ Hỗ trợ AI Chatbot 24/7
- ✅ Quản lý bán hàng và kho hàng thông minh
- ✅ Thanh toán an toàn (Stripe + COD)
- ✅ Vận chuyển tích hợp

### 1.1.3. Mục tiêu dự án

**Mục tiêu chính:**
1. Xây dựng nền tảng marketplace cho phép nhiều bán hàng bán sản phẩm
2. Tích hợp AI chatbot để hỗ trợ khách hàng
3. Cung cấp dashboard cho seller quản lý bán hàng
4. Đảm bảo bảo mật, hiệu năng cao

**Mục tiêu phụ:**
- Hỗ trợ thanh toán đa cách (COD, Card, Wallet)
- Quản lý vận chuyển, trả hàng
- Analytics & reports cho business

## 1.2. E-Commerce Fundamentals

### 1.2.1. Các mô hình kinh doanh

```
┌─────────────────────────────────────────────────────────────────┐
│                    E-COMMERCE BUSINESS MODELS                   │
└─────────────────────────────────────────────────────────────────┘

1. B2C (Business to Consumer)
   ├─ Cửa hàng online riêng (Niche stores)
   └─ Ví dụ: Quần áo riêng, sách online

2. B2B (Business to Business)
   ├─ Bán buôn giữa các công ty
   └─ Ví dụ: Nguyên liệu, máy móc

3. C2C (Consumer to Consumer)
   ├─ Người bán người dùng (Chợ trực tuyến)
   └─ Ví dụ: Carousell, Facebook Marketplace

4. MARKETPLACE (Multi-vendor)
   ├─ Nhiều bán hàng trên 1 sàn
   ├─ Sàn chịu trách nhiệm thanh toán, vận chuyển
   └─ Ví dụ: Lazada, Shopee, Amazon
   
   ⭐ SHOPDOAN sử dụng MARKETPLACE model

5. SOSIAL COMMERCE
   ├─ Bán hàng qua mạng xã hội
   └─ Ví dụ: Facebook Shop, Instagram Shop
```

### 1.2.2. Quy trình mua bán cơ bản

```
CUSTOMER JOURNEY:

1. DISCOVERY (Khám phá)
   ├─ Duyệt sản phẩm
   ├─ Tìm kiếm
   ├─ Xem reviews
   └─ So sánh giá

2. CONSIDERATION (Cân nhắc)
   ├─ Xem chi tiết sản phẩm
   ├─ Hỏi seller
   ├─ Thêm vào wishlist
   └─ Đọc comments

3. PURCHASE (Mua hàng)
   ├─ Thêm vào giỏ
   ├─ Checkout
   ├─ Chọn vận chuyển
   └─ Thanh toán

4. FULFILLMENT (Giao hàng)
   ├─ Seller gói hàng
   ├─ Chuyển courier
   ├─ Theo dõi đơn hàng
   └─ Nhận hàng

5. POST-PURCHASE (Sau mua)
   ├─ Đánh giá sản phẩm
   ├─ Trả hàng nếu cần
   ├─ Yêu cầu hỗ trợ
   └─ Mua lại

SHOPDOAN hỗ trợ toàn bộ quy trình này!
```

## 1.3. Tech Stack Chi Tiết

### 1.3.1. Frontend

```
FRONTEND STACK:

┌─────────────────────────────────────────────────────┐
│            NEXT.JS 16 (App Router)                  │
│  - Server Components (RSC)                          │
│  - Server Actions                                   │
│  - Image Optimization                               │
│  - Built-in API routes                              │
└────────────────┬────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐ ┌─────────┐ ┌──────────┐
│ React  │ │TypeScript│ │ Tailwind │
│ 19.2   │ │   5.x   │ │  CSS 3.x │
└────────┘ └─────────┘ └──────────┘
    │            │            │
    └────────────┼────────────┘
                 │
    ┌────────────┴─────────────┐
    │                          │
    ▼                          ▼
┌──────────────┐      ┌─────────────────┐
│ State Mgmt   │      │  UI Components  │
│ • SWR        │      │ • shadcn/ui     │
│ • Context    │      │ • Radix UI      │
│ • Redux      │      │ • Recharts      │
└──────────────┘      └─────────────────┘
```

**Công nghệ:**
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS 3.x
- **State Management**: SWR (data fetching) + Context API
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Date**: Day.js
- **Icons**: Lucide React

### 1.3.2. Backend

```
BACKEND STACK:

┌──────────────────────────────────────┐
│         NESTJS (v10.x)               │
│  - Dependency Injection              │
│  - Decorators & Metadata             │
│  - Module architecture               │
│  - Built-in testing                  │
└────────────┬─────────────────────────┘
             │
    ┌────────┼────────┐
    │        │        │
    ▼        ▼        ▼
┌────────┐ ┌─────┐ ┌───────────┐
│TypeScript│ Node │ Express.js │
│   5.x  │ 20.x │  (engine)   │
└────────┘ └─────┘ └───────────┘
    │        │        │
    └────────┼────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌──────────────┐  ┌──────────────┐
│  Database    │  │   Services   │
│  • Prisma    │  │  • JWT Auth  │
│  • PostgreSQL│  │  • Stripe    │
│  • Redis     │  │  • Mailing   │
└──────────────┘  └──────────────┘
```

**Công nghệ:**
- **Framework**: NestJS 10.x
- **Language**: TypeScript 5.x
- **Database ORM**: Prisma 5.x
- **Primary DB**: PostgreSQL 15
- **Cache**: Redis 7.x
- **Authentication**: JWT + Bcrypt
- **Validation**: Class-validator + Class-transformer
- **File Upload**: Cloudinary
- **Payment**: Stripe SDK
- **Email**: Nodemailer + Gmail SMTP
- **Testing**: Jest + Supertest

### 1.3.3. DevOps & Deployment

```
DEVOPS STACK:

┌─────────────────────────────────────┐
│      VERSION CONTROL                │
│  GitLab + GitHub Actions            │
└─────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│      CI/CD PIPELINE                 │
│  Jenkins (Groovy Pipeline)          │
│  • Build                             │
│  • Test                              │
│  • Docker image                      │
│  • Deploy                            │
└─────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│      CONTAINERIZATION               │
│  Docker + Docker Compose            │
│  • Multi-stage builds               │
│  • Production-ready images          │
└─────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│      ORCHESTRATION                  │
│  Docker Compose (current)           │
│  Kubernetes (future)                │
└─────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│      MONITORING & LOGGING           │
│  • ELK Stack (Elasticsearch)        │
│  • Prometheus + Grafana             │
│  • Nginx (Reverse Proxy)            │
│  • cAdvisor (Container metrics)     │
└─────────────────────────────────────┘
```

---

# CHƯƠNG 2: PHÂN TÍCH YÊU CẦU HỆ THỐNG

## 2.1. Phân tích hiện trạng

### 2.1.1. Vấn đề hiện tại

**Thị trường:**
- Các sàn marketplace hiện tại (Lazada, Shopee) quá lớn, phí cao
- Không có sàn chuyên biệt cho các cửa hàng nhỏ ở Việt Nam
- Nhu cầu AI hỗ trợ khách hàng tăng cao (45% người dùng muốn chatbot)

**Khách hàng:**
- Khó tìm các cửa hàng nhỏ chất lượng
- Không có hỗ trợ trực tuyến tốt (55% chờ lâu để được trả lời)
- Quy trình mua bán phức tạp

**Bán hàng:**
- Chi phí bán trên Lazada/Shopee cao (6-10% phí)
- Khó quản lý đơn hàng từ nhiều sàn
- Không có analytics sâu

### 2.1.2. Cơ hội

- Thị trường E-commerce Việt Nam tăng **30% năm**
- Xu hướng tiêu dùng online tăng mạnh (COVID đã thay đổi hành vi)
- Nhu cầu về AI chatbot, personal shopping tăng 
- Gen Z ưa thích shopping qua social + personalized experience

## 2.2. Yêu Cầu Chức Năng (FR - Functional Requirements)

### 2.2.1. Các Use Cases Chính (10 Use Cases)

```
┌─────────────────────────────────────────────────────────────────┐
│                    10 USE CASES CHÍNH                            │
└─────────────────────────────────────────────────────────────────┘
```

#### **USE CASE 1: User Registration & Email Verification**

```
Use Case: UC-1 Đăng ký tài khoản và xác thực email

Actors: 
  - Primary Actor: Khách hàng mới (New Customer)
  - Secondary Actor: SMTP Email System

Preconditions:
  - User có email hợp lệ
  - Email chưa được đăng ký trước

Main Flow:
  1. User click "Đăng ký" trên trang chủ
  2. Hệ thống hiển thị form đăng ký (email, password, name)
  3. User nhập thông tin và click "Đăng ký"
  4. Hệ thống validate dữ liệu:
     - Email format hợp lệ
     - Password >= 8 ký tự, có number & special char
     - Email chưa tồn tại trong database
  5. Hệ thống hash password, lưu user vào DB (status: UNVERIFIED)
  6. Hệ thống gửi email verification (OTP 6 chữ số)
  7. User check email, copy OTP
  8. User nhập OTP vào form verify
  9. Hệ thống validate OTP (phải trong 10 phút)
  10. Hệ thống update user status = VERIFIED
  11. Hệ thống tạo JWT token, redirect to dashboard

Postconditions:
  - User account được tạo với status VERIFIED
  - Email được confirm
  - User đã login vào hệ thống

Alternate Flow:
  A1: Email đã tồn tại
     → Hệ thống thông báo "Email này đã được sử dụng"
     → Suggest "Bạn có muốn đăng nhập?"
  
  A2: OTP hết hạn
     → Hệ thống thông báo "OTP đã hết hạn"
     → Option "Gửi lại OTP"
  
  A3: OTP sai
     → Hệ thống thông báo "OTP sai, vui lòng thử lại"
     → Giới hạn 3 lần nhập sai

Code Reference:
  - NestJS Controller: src/modules/auth/auth.controller.ts
  - Service: src/modules/auth/auth.service.ts
  - Prisma Schema: prisma/schema.prisma (User model)
  - Email Template: src/templates/verification.hbs
```

---

#### **USE CASE 2: Product Search & Filter**

```
Use Case: UC-2 Tìm kiếm và lọc sản phẩm

Actors:
  - Primary Actor: Customer
  - Secondary Actor: Search Engine (Elasticsearch)

Preconditions:
  - Hệ thống có >= 100 sản phẩm
  - User đã vào trang Products

Main Flow:
  1. User nhập keyword vào search box (ví dụ: "áo thun nam")
  2. Hệ thống gọi Elasticsearch search API
  3. ES trả về 20 kết quả đầu tiên (pagination)
  4. Hệ thống display kết quả:
     - Thumbnail image
     - Product name
     - Price (min-max nếu có variant)
     - Rating (4.5 sao)
     - Seller name
  5. User có thể áp dụng filter:
     - Price range (select slider 0-5M)
     - Category (dropdown)
     - Rating (>= 3, >= 4, >= 5 sao)
     - Seller
     - Condition (new, refurbished)
  6. Hệ thống update search params, reload
  7. Results hiển thị filtered products
  8. User click vào product → Xem detail page

Postconditions:
  - User thấy products matching search criteria
  - Có thể tiếp tục refine search

Alternate Flow:
  A1: Không có results
     → Hệ thống suggest products tương tự
     → Show "Có phải bạn tìm...?"
  
  A2: User click filter "Seller"
     → Show list các seller có sản phẩm này
     → Có thể sort by rating, delivery speed

Code Reference:
  - Elasticsearch Query: src/modules/product/elasticsearch.service.ts
  - Controller: src/modules/product/product.controller.ts
  - Query: src/modules/product/dto/search-product.dto.ts
```

---

#### **USE CASE 3: Add to Cart & Manage Cart**

```
Use Case: UC-3 Thêm sản phẩm vào giỏ hàng và quản lý

Actors:
  - Primary Actor: Customer
  - Secondary Actor: Cart Service, Redis Cache

Preconditions:
  - User đã login
  - Product tồn tại và có stock
  - Cart chưa đạt 100 items

Main Flow:
  1. User ở trang product detail
  2. User chọn variant (nếu có):
     - Màu sắc (ví dụ: Đỏ, Xanh)
     - Size (ví dụ: S, M, L)
  3. User nhập quantity (1-999)
  4. User click "Thêm vào giỏ"
  5. Hệ thống validate:
     - Product tồn tại
     - Variant hợp lệ
     - Quantity <= stock
  6. Hệ thống check giỏ:
     - Nếu product+variant đã có → cộng quantity
     - Nếu chưa có → thêm mới
  7. Hệ thống save vào Redis (key: cart:{userId})
  8. Hệ thống update cart count badge (UI)
  9. Show toast notification "Đã thêm vào giỏ"
  10. User có thể tiếp tục shopping hoặc go to cart

Postconditions:
  - Item được thêm vào giỏ
  - Cart count updated
  - User vẫn ở trang product hoặc chuyển sang cart

Alternate Flow:
  A1: Stock không đủ
     → Hệ thống show "Còn lại 2 sản phẩm"
     → User có thể chỉ add 2 thay vì 5
  
  A2: Product hết hàng
     → Button "Thêm vào giỏ" disabled
     → Show "Sẽ nhập hàng lại 01/06"
     → Option "Theo dõi sản phẩm này"

Data Model:
  Cart {
    id: UUID
    userId: UUID (FK User)
    items: CartItem[]
    totalPrice: Decimal
    updatedAt: DateTime
  }
  
  CartItem {
    id: UUID
    cartId: UUID
    productId: UUID
    variantId: UUID (nullable)
    quantity: Int
    unitPrice: Decimal
  }

Code Reference:
  - Service: src/modules/cart/cart.service.ts
  - Controller: src/modules/cart/cart.controller.ts
  - Redis: src/modules/cache/redis.service.ts
```

---

#### **USE CASE 4: Checkout & Order Creation**

```
Use Case: UC-4 Thanh toán và tạo đơn hàng

Actors:
  - Primary Actor: Customer
  - Secondary Actor: Payment Gateway (Stripe/COD)
  - Secondary Actor: Seller Notification Service

Preconditions:
  - User đã login
  - Giỏ hàng có >= 1 item
  - User có địa chỉ giao hàng

Main Flow:
  1. User click "Thanh toán" từ cart page
  2. Hệ thống hiển thị checkout form:
     - Shipping address (select hoặc add new)
     - Contact info (name, phone)
     - Shipping method:
       * Express (1-2 ngày): +25K
       * Standard (3-5 ngày): +15K
       * Economy (7-10 ngày): +5K
     - Payment method:
       * COD (Trả khi nhận)
       * Stripe (Card)
       * Wallet (nếu có)
  3. User review order:
     - Product list (có thể edit quantity)
     - Subtotal: 500K
     - Shipping: 25K
     - Tax (nếu có): 0
     - Total: 525K
  4. User chọn payment method
  5. Nếu Stripe:
     a. Click "Thanh toán bằng thẻ"
     b. Redirect to Stripe checkout
     c. User nhập card info
     d. Stripe validate & charge
     e. Redirect back với success=true
  6. Nếu COD:
     a. Click "Thanh toán khi nhận"
     b. Hệ thống tạo order ngay
  7. Hệ thống tạo Order record:
     - orderId, userId, totalPrice
     - items: product, variant, quantity, price
     - status: PENDING
     - paymentStatus: PAID (Stripe) / PENDING (COD)
     - shippingStatus: NOT_SHIPPED
  8. Hệ thống gửi confirmation email cho customer
  9. Hệ thống gửi notification cho các seller
  10. Redirect to "Order Confirmation" page
  11. Show order code, tracking details

Postconditions:
  - Order được tạo trong DB
  - Payment được xử lý (PAID hoặc PENDING)
  - Cart được clear
  - Customer nhận email confirm
  - Seller nhận thông báo order mới

Alternate Flow:
  A1: Payment failed
     → Stripe return error
     → Hệ thống show "Thanh toán không thành công"
     → Option "Thử lại" hoặc "Chọn COD"
  
  A2: Out of stock lúc checkout
     → Hệ thống detect stock change
     → Block checkout, show "Sản phẩm này vừa hết"
     → Suggest tương tự hoặc remove from cart

Data Model:
  Order {
    id: UUID
    orderCode: String (UC-123456) - unique
    userId: UUID (FK User)
    totalPrice: Decimal
    shippingPrice: Decimal
    taxPrice: Decimal = 0
    paymentMethod: ENUM (COD, STRIPE, WALLET)
    paymentStatus: ENUM (PENDING, PAID, FAILED, REFUNDED)
    shippingStatus: ENUM (NOT_SHIPPED, SHIPPED, DELIVERED, CANCELLED)
    shippingAddress: Address
    notes: String (nullable)
    createdAt: DateTime
    updatedAt: DateTime
    items: OrderItem[]
  }
  
  OrderItem {
    id: UUID
    orderId: UUID
    productId: UUID
    variantId: UUID (nullable)
    quantity: Int
    unitPrice: Decimal
    subtotal: Decimal (quantity * unitPrice)
  }

Code Reference:
  - Service: src/modules/order/order.service.ts
  - Stripe Integration: src/modules/payment/stripe.service.ts
  - Controller: src/modules/order/order.controller.ts
```

---

#### **USE CASE 5: AI Chatbot Support 24/7**

```
Use Case: UC-5 Hỗ trợ khách hàng qua AI Chatbot

Actors:
  - Primary Actor: Customer
  - Secondary Actor: Claude AI (Anthropic)
  - Secondary Actor: Retrieval-Augmented Generation (RAG) Database

Preconditions:
  - User có thể chưa login (chatbot available for all)
  - Chatbot model đã trained
  - Product database connected

Main Flow:
  1. User click "Chat support" button (bottom-right)
  2. Chatbot window open
  3. Chatbot show greeting: "Xin chào! Tôi là Bot hỗ trợ ShopDoan"
  4. User ask question, ví dụ: "Tôi có thể mua áo thun ở đâu?"
  5. Hệ thống:
     a. Send user message to Claude AI
     b. Claude process message với context:
        - User profile (nếu login)
        - Chat history (5 messages gần nhất)
        - Product database (embedding search)
        - FAQ database (embedding search)
     c. Claude generate response
     d. Display response in chatbot
  6. Chatbot response:
     "Chúng tôi có nhiều áo thun chất lượng từ các bán hàng uy tín.
      Bạn muốn xem:
      - Áo thun nam (300+ products)
      - Áo thun nữ (200+ products)
      - Áo thun trẻ em (100+ products)
      Click vào để xem danh sách"
  7. User click "Áo thun nam"
  8. Hệ thống navigate to search results
  9. User có thể tiếp tục chat hoặc continue shopping

Special Features:
  - Detect intent:
    * PRODUCT_SEARCH: "Tôi cần áo thun" → Search products
    * TRACK_ORDER: "Đơn hàng tôi đâu?" → Fetch orders
    * RETURN_POLICY: "Có được trả hàng không?" → FAQ
    * SELLER_INFO: "Seller này uy tín không?" → Seller info
    * COMPLAINT: "Sản phẩm bị lỗi" → Create ticket
    * GENERAL_CHAT: "Bạn là ai?" → General response
  
  - Multi-language: Vietnamese & English
  - Sentiment analysis: Nếu user unhappy → escalate to human
  - Rating: User có thể rate chatbot response

Postconditions:
  - User question được answer
  - Chat history saved (nếu login)
  - User có thể tiếp tục shopping hoặc close chat

Alternate Flow:
  A1: Chatbot không hiểu (confidence < 30%)
     → Hệ thống show: "Xin lỗi, tôi không hiểu. Bạn có thể:"
        1. Rephrase câu hỏi
        2. Chat với human agent
        3. Xem FAQ
  
  A2: User request escalation
     → Show "Chúng tôi đang kết nối bạn với agent"
     → Email to support + create ticket
     → Agent response within 1 hour

Data Model:
  ChatMessage {
    id: UUID
    chatSessionId: UUID
    userId: UUID (nullable - for anonymous)
    sender: ENUM (USER, BOT)
    message: String
    intent: ENUM (PRODUCT_SEARCH, TRACK_ORDER, ...)
    confidence: Float (0-100)
    metadata: JSON (product_id, order_id, etc)
    createdAt: DateTime
  }
  
  ChatSession {
    id: UUID
    userId: UUID (nullable)
    startedAt: DateTime
    endedAt: DateTime (nullable)
    topic: String (nullable)
    escalatedToHuman: Boolean
    humanAgentId: UUID (nullable)
    messages: ChatMessage[]
  }

AI Model Architecture:
  User Input
    ↓
  Intent Classification (Claude)
    ├─ PRODUCT_SEARCH (95%)
    ├─ FAQ (30%)
    └─ GENERAL (40%)
    ↓
  Context Retrieval (Vector DB)
    ├─ Product Embeddings (Search similar products)
    ├─ FAQ Embeddings (Find relevant FAQs)
    └─ Chat History
    ↓
  Response Generation (Claude)
    ├─ Generate natural response
    ├─ Add suggestions/links
    └─ Format for UI
    ↓
  User Output

Code Reference:
  - Service: src/modules/chat/chat.service.ts
  - Claude Integration: src/modules/ai/claude.service.ts
  - Vector DB: src/modules/ai/vector-db.service.ts
  - Controller: src/modules/chat/chat.controller.ts
  - Frontend: src/components/ChatBot.tsx
```

---

#### **USE CASE 6: Seller Registration & Store Setup**

```
Use Case: UC-6 Đăng ký bán hàng và setup store

Actors:
  - Primary Actor: Seller (Individual/Business)
  - Secondary Actor: Admin (Verify seller)

Preconditions:
  - User đã có account customer
  - Email chưa registered as seller

Main Flow:
  1. User (logged in) click "Trở thành seller"
  2. Hệ thống show form "Đăng ký bán hàng":
     - Loại seller: Individual / Business
     - Shop name (2-100 chars)
     - Business license (if business):
       * Upload file
       * OR enter license number
     - Contact info:
       * Phone
       * Address
       * Ward, District, City
     - Bank account (for payment):
       * Bank name
       * Account number
       * Account holder name
     - Profile image
  3. User fill form and submit
  4. Hệ thống validate:
     - All required fields filled
     - Phone format valid
     - Business license format valid (if provided)
     - Bank account valid
  5. Hệ thống create Seller record:
     - status: PENDING (chờ admin verify)
     - createdAt: now
  6. Hệ thống send email: "Đơn đăng ký của bạn đã nhận"
  7. Admin dashboard show notification
  8. Admin verify seller:
     - Check business license
     - Verify contact info
     - Approve or Reject
  9. If Approved:
     - Seller status = ACTIVE
     - Email to seller: "Chúc mừng!"
     - Seller can now:
       * Create store profile
       * Upload products
       * Manage orders
  10. Seller setup store:
      - Shop description
      - Shop avatar
      - Shop banner
      - Shop policies (return, shipping)
      - Shipping methods
      - Store categories

Postconditions:
  - Seller account created
  - Seller can upload products
  - Orders from customers go to seller

Alternate Flow:
  A1: Seller rejected
     → Admin provide reason
     → Email to seller: "Đơn đăng ký bị từ chối vì..."
     → Option to re-submit
  
  A2: Business license invalid
     → Admin request re-submit
     → Seller get notification

Data Model:
  Seller {
    id: UUID
    userId: UUID (FK User) - 1:1
    shopName: String
    shopSlug: String (unique, generated from shopName)
    description: String (nullable)
    avatar: String (image URL)
    banner: String (image URL)
    status: ENUM (PENDING, ACTIVE, SUSPENDED, BANNED)
    sellerType: ENUM (INDIVIDUAL, BUSINESS)
    businessLicense: String (nullable)
    contactPhone: String
    address: String
    ward: String
    district: String
    city: String
    bankName: String
    bankAccount: String
    accountHolder: String
    commissionRate: Decimal (default: 6%) - set by admin
    rating: Float (avg of order ratings)
    totalProducts: Int
    totalOrders: Int
    totalRevenue: Decimal
    createdAt: DateTime
    verifiedAt: DateTime (nullable)
    verifiedBy: UUID (FK Admin, nullable)
  }

Code Reference:
  - Service: src/modules/seller/seller.service.ts
  - Controller: src/modules/seller/seller.controller.ts
  - Admin: src/modules/admin/seller-verification.service.ts
```

---

#### **USE CASE 7: Track Order & Receive Notification**

```
Use Case: UC-7 Theo dõi đơn hàng và nhận thông báo

Actors:
  - Primary Actor: Customer
  - Secondary Actor: Shipping Provider (GHN, Grab)
  - Secondary Actor: Notification Service

Preconditions:
  - Order exists
  - Order has been placed (status != CANCELLED)

Main Flow:
  1. Customer click vào order trong "My Orders"
  2. Hệ thống display order detail page:
     - Order code: UC-123456
     - Items:
       * Product name, variant, quantity, price
     - Status timeline:
       ✓ Order placed (15:30, 01/06/2026)
       ✓ Processing (16:45, 01/06/2026)
       ✓ Shipped (08:00, 02/06/2026)
       → In delivery (tracking #GHN123456)
       ○ Delivered (pending)
     - Shipping tracking:
       * Carrier: GHN Express
       * Tracking #: GHN123456
       * Estimated delivery: 04/06/2026
       * Current location: Hà Nội
       * Detailed events:
         - 01:00 - Gói hàng tại kho GHN HN01
         - 05:30 - Giao cho GHN đi Hồ Chí Minh
         - 14:00 - Tới kho GHN HCMC
         - 18:00 - Giao cho shipper
  3. Customer can:
     - Contact seller: "Button Chat với seller"
     - Return request: "Button Trả hàng" (if allowed)
     - Confirm delivery: "Button Đã nhận hàng"
  4. When order status changes:
     - System send notification (in-app + email)
     - "Đơn hàng UC-123456 đã được giao cho GHN"
  5. When order arrives:
     - Customer click "Đã nhận hàng"
     - Hệ thống update status = DELIVERED
     - Show: "Vui lòng đánh giá sản phẩm"
     - Customer rate and comment

Notifications:
  - Order confirmed (1 min)
  - Order processing (1 hour)
  - Shipped (immediately)
  - In delivery (3 hours)
  - Out for delivery (same day)
  - Delivered (same day)
  - Return request (if applicable)

Postconditions:
  - Customer can track order status
  - Customer receives timely notifications
  - Order marked as delivered
  - Customer can rate products

Alternate Flow:
  A1: Delivery delayed
     → Shipping status shows "Delayed"
     → Contact info provided
     → Option "Contact shipper"
  
  A2: Delivery failed
     → Status shows "Failed attempt"
     → Rescheduling option
     → Seller contact

Data Model:
  Order {
    id: UUID
    orderCode: String
    status: ENUM (PENDING, PROCESSING, SHIPPED, IN_DELIVERY, DELIVERED, CANCELLED, RETURNED)
    statusHistory: OrderStatusHistory[]
    trackingNumber: String (nullable)
    shippingCarrier: String (nullable)
  }
  
  OrderStatusHistory {
    id: UUID
    orderId: UUID
    status: String
    timestamp: DateTime
    message: String
    location: String (nullable)
  }

Code Reference:
  - Service: src/modules/order/order-tracking.service.ts
  - Webhook: src/modules/shipping/shipping-webhook.controller.ts
  - Notification: src/modules/notification/notification.service.ts
```

---

#### **USE CASE 8: Product Rating & Review**

```
Use Case: UC-8 Đánh giá và bình luận sản phẩm

Actors:
  - Primary Actor: Customer (đã mua sản phẩm)
  - Secondary Actor: Other customers (view review)

Preconditions:
  - Customer đã có order DELIVERED
  - Product tồn tại
  - Customer chưa rate product này

Main Flow:
  1. Customer nhận hàng, click "Đã nhận"
  2. Hệ thống show "Vui lòng đánh giá sản phẩm"
  3. Customer click "Viết đánh giá"
  4. Show form:
     - Star rating (1-5 sao)
     - Title (ví dụ: "Sản phẩm rất tốt")
     - Content (ví dụ: "Chất lượng tốt, giao hàng nhanh")
     - Image upload (up to 3 images)
     - Aspect rating:
       * Quality (1-5)
       * Shipping time (1-5)
       * Package condition (1-5)
  5. Customer submit review
  6. Hệ thống:
     - Validate (có star, có content >= 20 chars)
     - Check spam (nếu >3 reviews/day → pending)
     - Save to DB
     - Update product rating
  7. Review display:
     - Customer avatar, name
     - Star rating (with breakdown by aspect)
     - Title, content, images
     - "Helpful? Yes/No"
     - Timestamp
  8. Other customers:
     - Can view review
     - Can mark "Helpful"
     - Can report "Spam/Inappropriate"
  9. Seller:
     - Can see all reviews
     - Can reply to review

Postconditions:
  - Product rating updated
  - Review visible to other customers
  - Seller can view and reply

Alternate Flow:
  A1: Customer delete review
     → Review marked as deleted (not removed)
     → Show "[Deleted by user]"
  
  A2: Review flagged as spam
     → Admin review & take action
     → Can remove review or warn user

Data Model:
  ProductReview {
    id: UUID
    productId: UUID
    userId: UUID
    orderId: UUID (FK - to verify purchase)
    rating: Int (1-5)
    title: String
    content: String
    images: String[] (up to 3 URLs)
    aspectRatings: {
      quality: Int,
      shippingTime: Int,
      packageCondition: Int
    }
    helpfulCount: Int (default: 0)
    unhelpfulCount: Int (default: 0)
    status: ENUM (PUBLISHED, PENDING, DELETED, HIDDEN)
    sellerReply: String (nullable)
    sellerReplyAt: DateTime (nullable)
    createdAt: DateTime
    updatedAt: DateTime
  }

Code Reference:
  - Service: src/modules/review/review.service.ts
  - Controller: src/modules/review/review.controller.ts
  - Schema: prisma/schema.prisma
```

---

#### **USE CASE 9: Return & Refund Request**

```
Use Case: UC-9 Yêu cầu trả hàng và hoàn tiền

Actors:
  - Primary Actor: Customer
  - Secondary Actor: Seller
  - Secondary Actor: Return Coordinator

Preconditions:
  - Order status = DELIVERED
  - Within return period (15 days)
  - Product conditions meet return criteria

Main Flow:
  1. Customer click "Trả hàng" button trên order detail
  2. Hệ thống show return form:
     - Select items (nếu order có multi items)
     - Reason:
       * Product defective
       * Different from description
       * Wrong item
       * Size doesn't fit
       * Changed mind
       * Other (specify)
     - Description (why want to return)
     - Upload photos (up to 5)
  3. Customer submit return request
  4. Hệ thống:
     - Create ReturnRequest record
     - Set status = PENDING
     - Send notification to seller
     - Show returnCode (RT-123456)
  5. Seller review (within 24h):
     - Can approve or reject
     - If approve:
       * Show return shipping address
       * Show return label (QR code or PDF)
     - If reject:
       * Provide reason
  6. If approved:
     - Customer print return label
     - Send product back
     - Provide tracking number
  7. Hệ thống track return:
     - Mark as "In transit"
     - Receive notification when arrived
     - Mark as "Received"
  8. Seller inspect:
     - Check product condition
     - Approve or reject refund
     - If approve:
       * Mark as "Refunded"
       * Initiate refund to customer
       * Customer receives money in 3-5 days
     - If reject:
       * Provide reason
       * Option to escalate to admin
  9. Customer:
     - Check refund status
     - Receive notification when refunded

Return Policy:
  - Window: 15 days from delivery
  - Conditions:
    * Product unused/not damaged
    * Original packaging
    * All accessories included
  - Exceptions:
    * Consumables (food, cosmetics) - non returnable
    * Digital products - non returnable
    * Custom products - non returnable

Postconditions:
  - Return request created
  - Refund processed (if approved)
  - Customer receives money back

Alternate Flow:
  A1: Seller rejects return
     → Customer can escalate to admin
     → Admin review & make final decision
  
  A2: Return package not received
     → Seller confirm non-receipt
     → Customer responsible for package
     → Dispute opened

Data Model:
  ReturnRequest {
    id: UUID
    returnCode: String (RT-XXXXX) - unique
    orderId: UUID
    userId: UUID
    reason: String
    description: String
    images: String[] (up to 5 URLs)
    status: ENUM (PENDING, APPROVED, REJECTED, IN_TRANSIT, RECEIVED, REFUNDED, CANCELLED)
    refundAmount: Decimal
    refundMethod: ENUM (ORIGINAL_PAYMENT, WALLET, BANK_TRANSFER)
    sellerApprovedAt: DateTime (nullable)
    sellerApprovedBy: UUID (nullable)
    adminApprovedAt: DateTime (nullable)
    returnTrackingNumber: String (nullable)
    returnedAt: DateTime (nullable)
    refundedAt: DateTime (nullable)
    rejectionReason: String (nullable)
  }

Code Reference:
  - Service: src/modules/return/return.service.ts
  - Controller: src/modules/return/return.controller.ts
```

---

#### **USE CASE 10: Seller Analytics & Sales Report**

```
Use Case: UC-10 Xem thống kê bán hàng và báocáo

Actors:
  - Primary Actor: Seller
  - Secondary Actor: Analytics Engine

Preconditions:
  - Seller is ACTIVE
  - Seller has >= 1 order
  - Data is available for analysis

Main Flow:
  1. Seller click "Analytics" in seller dashboard
  2. Hệ thống show overview metrics:
     - Today:
       * Orders: 5
       * Sales: 2.5M VND
       * Visitors: 320
     - This month (MTD):
       * Orders: 45
       * Sales: 25M VND
       * Visitors: 3,200
       * Growth vs last month: +15%
     - Period selector: (Last 7 days, 30 days, 90 days, 1 year, custom)
  3. Charts & Graphs:
     - Revenue chart (line chart):
       * X-axis: Days/Weeks/Months
       * Y-axis: Revenue amount
       * Can filter by order status
     - Order trend (bar chart):
       * Number of orders per day
     - Top products (table):
       * Product name, sales, revenue
       * Can sort by units/revenue
       * Click to see product detail
     - Traffic sources (pie chart):
       * Direct, Search, Referral, Social
     - Conversion funnel:
       * Store visits → Product views → Add to cart → Purchase
       * Show conversion rate at each step
  4. Seller can:
     - Export data (CSV, PDF)
     - Set goals and track
     - Compare periods
     - Get insights/recommendations
  5. Detailed reports available:
     - Sales by category
     - Sales by variant (color, size)
     - Customer demographics
     - Return rate analysis
     - Customer feedback summary

Insights & Recommendations:
  - "Your best-selling time is 7PM-9PM on weekends"
  - "Áo thun đỏ has 2% return rate (high). Check quality"
  - "Customers from HCMC average order value 500K"
  - "You have 2% conversion rate. Industry avg is 3%"

Postconditions:
  - Seller can make data-driven decisions
  - Analytics saved and comparable over time
  - Seller performance visible to admin

Data Model:
  SalesMetrics {
    id: UUID
    sellerId: UUID
    date: Date
    ordersCount: Int
    revenue: Decimal
    refundAmount: Decimal (netRevenue = revenue - refund)
    averageOrderValue: Decimal
    uniqueCustomers: Int
    returnRate: Float
    conversionRate: Float
    topProducts: JSON (product_id, sales_count)
  }
  
  TrafficMetrics {
    id: UUID
    sellerId: UUID
    date: Date
    storeVisits: Int
    productViews: Int
    addToCartCount: Int
    purchaseCount: Int
    source: ENUM (DIRECT, SEARCH, REFERRAL, SOCIAL, PAID_ADS)
  }

Code Reference:
  - Service: src/modules/analytics/seller-analytics.service.ts
  - Controller: src/modules/analytics/analytics.controller.ts
  - Dashboard: src/app/(seller)/analytics/page.tsx
```

---

### 2.2.2. Functional Requirements Summary

```
┌───────────────────────────────────────────────────────────────────┐
│                    FUNCTIONAL REQUIREMENTS (FR)                   │
└───────────────────────────────────────────────────────────────────┘

AUTHENTICATION & USER MANAGEMENT:
FR-1.1: User registration with email verification (OTP)
FR-1.2: Login/Logout functionality
FR-1.3: Forgot password with reset link
FR-1.4: Social login (Facebook, Google) - Phase 2
FR-1.5: Profile management (update info, avatar, password)
FR-1.6: User roles (Customer, Seller, Admin)

PRODUCT MANAGEMENT:
FR-2.1: Product catalog with pagination
FR-2.2: Advanced search with Elasticsearch
FR-2.3: Product filtering (price, category, rating, seller)
FR-2.4: Product detail view (images, description, specs)
FR-2.5: Product variants (color, size, etc)
FR-2.6: Stock management
FR-2.7: Product recommendations (AI-based)
FR-2.8: Wishlist / Save for later
FR-2.9: Product comparison

SHOPPING CART & CHECKOUT:
FR-3.1: Add/Remove/Update cart items
FR-3.2: Cart persistence (across devices)
FR-3.3: Cart calculation (subtotal, tax, shipping)
FR-3.4: Checkout flow (address, payment method)
FR-3.5: Order creation and confirmation

PAYMENT PROCESSING:
FR-4.1: Stripe integration (card payments)
FR-4.2: COD (Cash on Delivery)
FR-4.3: Payment status tracking
FR-4.4: Invoice generation
FR-4.5: Refund processing

ORDER MANAGEMENT:
FR-5.1: Order creation
FR-5.2: Order tracking (status + shipping)
FR-5.3: Order history
FR-5.4: Return request handling
FR-5.5: Order cancellation (with conditions)
FR-5.6: Invoice & receipt

SELLER FUNCTIONALITY:
FR-6.1: Seller registration & verification
FR-6.2: Store profile setup
FR-6.3: Product upload & management
FR-6.4: Inventory management
FR-6.5: Order management (view, process)
FR-6.6: Sales analytics & reports
FR-6.7: Communication with customers
FR-6.8: Refund/Return handling

REVIEWS & RATINGS:
FR-7.1: Product reviews (text + images)
FR-7.2: Star rating (1-5 stars)
FR-7.3: Seller rating
FR-7.4: Review filtering & sorting
FR-7.5: Helpful votes on reviews
FR-7.6: Report inappropriate content

AI CHATBOT:
FR-8.1: Product search via chat
FR-8.2: Order tracking via chat
FR-8.3: FAQ support
FR-8.4: Intent detection
FR-8.5: Chat history storage
FR-8.6: Escalation to human agent
FR-8.7: Multi-language support (VI, EN)
FR-8.8: Sentiment analysis

NOTIFICATIONS:
FR-9.1: Email notifications (order, promo)
FR-9.2: In-app notifications
FR-9.3: SMS notifications (Phase 2)
FR-9.4: Notification preferences
FR-9.5: Real-time updates (WebSocket)

ADMIN PANEL:
FR-10.1: User management
FR-10.2: Seller verification & approval
FR-10.3: Product moderation
FR-10.4: Order management (override)
FR-10.5: Dispute resolution
FR-10.6: System analytics
FR-10.7: Content management (banners, promos)
FR-10.8: Seller commission configuration
```

## 2.3. Yêu Cầu Phi Chức Năng (NFR - Non-Functional Requirements)

```
┌───────────────────────────────────────────────────────────────────┐
│             NON-FUNCTIONAL REQUIREMENTS (NFR)                     │
└───────────────────────────────────────────────────────────────────┘

PERFORMANCE:
NFR-1.1: API response time < 200ms (p95)
NFR-1.2: Page load time < 1.5s (FCP)
NFR-1.3: Database query time < 100ms (p95)
NFR-1.4: Concurrent users support: >= 10,000
NFR-1.5: Search results returned < 500ms
NFR-1.6: Image optimization & CDN delivery
NFR-1.7: Lazy loading for product lists

RELIABILITY & AVAILABILITY:
NFR-2.1: System uptime >= 99.5% (SLA)
NFR-2.2: MTTR (Mean Time To Recover) < 15 minutes
NFR-2.3: MTTF (Mean Time To Fail) > 7 days
NFR-2.4: Database backup every 6 hours
NFR-2.5: Zero data loss guarantee
NFR-2.6: Automated health checks
NFR-2.7: Blue-green deployment for zero downtime

SECURITY:
NFR-3.1: All passwords hashed (bcrypt)
NFR-3.2: JWT-based authentication
NFR-3.3: HTTPS/TLS for all connections
NFR-3.4: SQL injection prevention
NFR-3.5: XSS prevention
NFR-3.6: CSRF protection
NFR-3.7: Rate limiting on APIs
NFR-3.8: PCI DSS compliance for payments
NFR-3.9: Data encryption at rest
NFR-3.10: Regular security audits

SCALABILITY:
NFR-4.1: Horizontal scaling (add servers)
NFR-4.2: Database replication
NFR-4.3: Caching layer (Redis)
NFR-4.4: Load balancing (Nginx)
NFR-4.5: CDN for static assets
NFR-4.6: Queue system for async tasks
NFR-4.7: Microservices architecture ready

USABILITY:
NFR-5.1: Mobile-first responsive design
NFR-5.2: Accessibility (WCAG 2.1 AA)
NFR-5.3: Multi-language support (VI, EN)
NFR-5.4: Intuitive UI/UX
NFR-5.5: Fast user onboarding
NFR-5.6: Clear error messages

MAINTAINABILITY:
NFR-6.1: Code follows industry standards
NFR-6.2: API documentation (Swagger)
NFR-6.3: Test coverage >= 70%
NFR-6.4: Automated testing (Unit, Integration, E2E)
NFR-6.5: Logging & monitoring
NFR-6.6: Version control (Git)
NFR-6.7: CI/CD pipeline

COMPLIANCE:
NFR-7.1: GDPR compliance (data privacy)
NFR-7.2: Consumer protection law compliance
NFR-7.3: Tax calculation & reporting
NFR-7.4: Payment fraud detection
```

---

# CHƯƠNG 3: THIẾT KẾ HỆ THỐNG

## 3.1. Kiến Trúc Tổng Thể

### 3.1.1. Kiến Trúc 3-Layer

```
┌─────────────────────────────────────────────────────────────────┐
│                   SHOPDOAN SYSTEM ARCHITECTURE                  │
│                      (3-LAYER PATTERN)                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                          │
│                   (Client Applications)                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   NextJS     │  │     React    │  │   Expo       │          │
│  │   Frontend   │  │  Admin Panel │  │   Mobile     │          │
│  │   :3000      │  │   :3000      │  │   :8081      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│           │               │                 │                    │
│           └───────────────┼─────────────────┘                    │
│                           │                                      │
│                  API Gateway (Nginx)                             │
│                   :80 / :443 (SSL)                               │
│                                                                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                    HTTP/REST API
                    (JSON + JWT)
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                          │
│                    (NestJS Backend)                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MODULES (각 모듈은 독립적인 feature):                          │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Auth      │  │   Product   │  │   Order     │             │
│  │  Module     │  │  Module     │  │  Module     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Cart      │  │   Review    │  │   Seller    │             │
│  │  Module     │  │  Module     │  │  Module     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Chat      │  │   Payment   │  │   Notify    │             │
│  │  Module     │  │  Module     │  │  Module     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  CROSS-CUTTING CONCERNS:                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  • Authentication & Authorization                       │   │
│  │  • Error Handling & Logging                             │   │
│  │  • Request Validation                                   │   │
│  │  • Rate Limiting                                        │   │
│  │  • Caching                                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  EXTERNAL INTEGRATIONS:                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Stripe API  │  │  Claude AI   │  │  SMTP Gmail  │         │
│  │              │  │              │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                  Internal RPC / Database
                    Query Layer (Prisma)
                           │
┌──────────────────────────▼───────────────────────────────────────┐
│                      DATA LAYER                                  │
│                   (Persistence)                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PRIMARY DATASTORE:                                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  PostgreSQL 15 (ACID, Relational)                         │  │
│  │  ├─ User & Authentication data                            │  │
│  │  ├─ Products & Inventory                                  │  │
│  │  ├─ Orders & Transactions                                 │  │
│  │  ├─ Sellers & Stores                                      │  │
│  │  ├─ Reviews & Ratings                                     │  │
│  │  ├─ Notifications                                         │  │
│  │  └─ Audit logs                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  CACHE LAYER:                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Redis 7 (In-Memory Key-Value Store)                      │  │
│  │  ├─ Session storage                                       │  │
│  │  ├─ Shopping cart cache                                   │  │
│  │  ├─ Product cache (popular products)                      │  │
│  │  ├─ Rate limiting counters                                │  │
│  │  ├─ Queue for async tasks                                 │  │
│  │  └─ Chat session cache                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  SEARCH INDEX:                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Elasticsearch 8 (Full-text Search)                       │  │
│  │  ├─ Product search index                                  │  │
│  │  ├─ Seller search index                                   │  │
│  │  └─ Search analytics                                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  VECTOR DATABASE (Phase 2):                                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Pinecone / Weaviate (Vector Search for AI)               │  │
│  │  ├─ Product embeddings                                    │  │
│  │  ├─ FAQ embeddings                                        │  │
│  │  └─ Semantic search                                       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  FILE STORAGE:                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Cloudinary (Image CDN)                                   │  │
│  │  ├─ Product images                                        │  │
│  │  ├─ User avatars                                          │  │
│  │  ├─ Auto compression & optimization                       │  │
│  │  └─ Global CDN distribution                               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 3.1.2. Detailed Module Architecture

```
SHOPDOAN MODULE DEPENDENCY DIAGRAM:

┌─────────────────────────────────────────────────────────────────┐
│                      SHARED MODULE                              │
│  (Common services: Logger, Config, Database, Cache)             │
└─────────────────┬───────────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
┌─────────┐  ┌──────────┐  ┌──────────┐
│  AUTH   │  │ PRODUCT  │  │  ORDER   │
│ MODULE  │  │ MODULE   │  │ MODULE   │
└────┬────┘  └────┬─────┘  └────┬─────┘
     │            │             │
     │            ▼             │
     │        ┌──────────┐       │
     │        │  REVIEW  │       │
     │        │ MODULE   │       │
     │        └──────────┘       │
     │                           │
     └─────────┬─────────────────┘
               │
               ▼
        ┌──────────────┐
        │  CART MODULE │
        └──────┬───────┘
               │
         ┌─────┴─────┐
         │           │
         ▼           ▼
    ┌────────┐  ┌─────────────┐
    │PAYMENT │  │   SELLER    │
    │MODULE  │  │  MODULE     │
    └────────┘  └─────────────┘
         │           │
         └─────┬─────┘
               │
               ▼
        ┌──────────────┐
        │  NOTIFY      │
        │  MODULE      │
        └──────────────┘
               │
         ┌─────┴─────┐
         │           │
         ▼           ▼
    ┌────────┐  ┌──────────┐
    │ CHAT   │  │ ANALYTICS│
    │MODULE  │  │ MODULE   │
    └────────┘  └──────────┘
```

## 3.2. Database Schema Chi Tiết

### 3.2.1. ER Diagram (Entity Relationship)

```
┌─────────────────────────────────────────────────────────────────┐
│                         ENTITIES (25+)                          │
└─────────────────────────────────────────────────────────────────┘

1. USER
   ├─ id (PK)
   ├─ email (UNIQUE)
   ├─ password_hash
   ├─ full_name
   ├─ phone
   ├─ avatar_url
   ├─ role (CUSTOMER / SELLER / ADMIN)
   ├─ status (ACTIVE / SUSPENDED / BANNED)
   ├─ created_at
   ├─ updated_at

2. SELLER
   ├─ id (PK)
   ├─ user_id (FK → USER, 1:1)
   ├─ shop_name
   ├─ shop_slug (UNIQUE)
   ├─ description
   ├─ avatar
   ├─ banner
   ├─ status (PENDING / ACTIVE / SUSPENDED)
   ├─ business_license
   ├─ bank_account
   ├─ commission_rate (default: 6%)
   ├─ rating (avg of orders)
   ├─ total_products
   ├─ total_orders
   ├─ total_revenue

3. CATEGORY
   ├─ id (PK)
   ├─ name
   ├─ slug (UNIQUE)
   ├─ icon_url
   ├─ parent_id (FK → CATEGORY, nullable - for subcategories)
   ├─ order (for sorting)

4. PRODUCT
   ├─ id (PK)
   ├─ seller_id (FK → SELLER)
   ├─ category_id (FK → CATEGORY)
   ├─ name
   ├─ slug (UNIQUE)
   ├─ description
   ├─ price (base price)
   ├─ stock (total quantity)
   ├─ images (array of URLs)
   ├─ rating (avg of reviews)
   ├─ review_count
   ├─ status (ACTIVE / DRAFT / INACTIVE)
   ├─ created_at
   ├─ updated_at

5. PRODUCT_VARIANT
   ├─ id (PK)
   ├─ product_id (FK → PRODUCT)
   ├─ name (e.g., "Color: Red, Size: M")
   ├─ sku (UNIQUE)
   ├─ price_modifier (additional cost)
   ├─ stock
   ├─ attributes (JSON: {color: "red", size: "M"})

6. CART
   ├─ id (PK)
   ├─ user_id (FK → USER, 1:1)
   ├─ total_price
   ├─ updated_at

7. CART_ITEM
   ├─ id (PK)
   ├─ cart_id (FK → CART)
   ├─ product_id (FK → PRODUCT)
   ├─ variant_id (FK → PRODUCT_VARIANT, nullable)
   ├─ quantity
   ├─ unit_price

8. ORDER
   ├─ id (PK)
   ├─ order_code (UNIQUE, e.g., "UC-123456")
   ├─ user_id (FK → USER)
   ├─ total_price
   ├─ shipping_price
   ├─ tax_price (default: 0)
   ├─ payment_method (COD / STRIPE / WALLET)
   ├─ payment_status (PENDING / PAID / FAILED / REFUNDED)
   ├─ shipping_status (NOT_SHIPPED / SHIPPED / DELIVERED / CANCELLED)
   ├─ shipping_address
   ├─ tracking_number (nullable)
   ├─ notes
   ├─ created_at
   ├─ updated_at

9. ORDER_ITEM
   ├─ id (PK)
   ├─ order_id (FK → ORDER)
   ├─ product_id (FK → PRODUCT)
   ├─ variant_id (FK → PRODUCT_VARIANT, nullable)
   ├─ quantity
   ├─ unit_price
   ├─ seller_id (FK → SELLER - for multi-vendor orders)

10. REVIEW
    ├─ id (PK)
    ├─ product_id (FK → PRODUCT)
    ├─ user_id (FK → USER)
    ├─ order_id (FK → ORDER - verify purchase)
    ├─ rating (1-5)
    ├─ title
    ├─ content
    ├─ images (array, up to 3)
    ├─ helpful_count (upvotes)
    ├─ unhelpful_count (downvotes)
    ├─ seller_reply (nullable)
    ├─ status (PUBLISHED / PENDING / DELETED)
    ├─ created_at

11. RETURN_REQUEST
    ├─ id (PK)
    ├─ return_code (UNIQUE, e.g., "RT-123456")
    ├─ order_id (FK → ORDER)
    ├─ user_id (FK → USER)
    ├─ reason
    ├─ description
    ├─ images (array, up to 5)
    ├─ status (PENDING / APPROVED / REJECTED / REFUNDED)
    ├─ refund_amount
    ├─ created_at

12. ADDRESS
    ├─ id (PK)
    ├─ user_id (FK → USER)
    ├─ name
    ├─ phone
    ├─ street
    ├─ ward
    ├─ district
    ├─ city
    ├─ postal_code
    ├─ is_default (BOOLEAN)

13. PAYMENT
    ├─ id (PK)
    ├─ order_id (FK → ORDER, nullable)
    ├─ user_id (FK → USER)
    ├─ amount
    ├─ payment_method (STRIPE / COD / WALLET)
    ├─ status (PENDING / COMPLETED / FAILED)
    ├─ stripe_payment_intent_id (nullable)
    ├─ created_at

14. NOTIFICATION
    ├─ id (PK)
    ├─ user_id (FK → USER)
    ├─ title
    ├─ message
    ├─ type (ORDER / PROMO / SYSTEM / CHAT)
    ├─ related_id (order_id, product_id, etc - nullable)
    ├─ is_read
    ├─ created_at

15. CHAT_SESSION
    ├─ id (PK)
    ├─ user_id (FK → USER, nullable - for anonymous)
    ├─ started_at
    ├─ ended_at (nullable)
    ├─ topic (nullable)
    ├─ escalated_to_human (BOOLEAN)
    ├─ human_agent_id (FK → USER, nullable)

16. CHAT_MESSAGE
    ├─ id (PK)
    ├─ chat_session_id (FK → CHAT_SESSION)
    ├─ user_id (FK → USER, nullable)
    ├─ sender (USER / BOT)
    ├─ message
    ├─ intent (PRODUCT_SEARCH / TRACK_ORDER / FAQ / GENERAL)
    ├─ confidence (0-100)
    ├─ metadata (JSON - product_id, order_id, etc)
    ├─ created_at

17. WISHLIST
    ├─ id (PK)
    ├─ user_id (FK → USER)
    ├─ product_id (FK → PRODUCT)
    ├─ added_at

18. PROMOTION
    ├─ id (PK)
    ├─ code (UNIQUE, e.g., "SUMMER2024")
    ├─ description
    ├─ discount_type (PERCENTAGE / FIXED)
    ├─ discount_value (10 for 10%, or 50000 for fixed)
    ├─ min_order_value (nullable)
    ├─ max_uses (nullable)
    ├─ times_used
    ├─ valid_from
    ├─ valid_until
    ├─ status (ACTIVE / INACTIVE)

19. AUDIT_LOG
    ├─ id (PK)
    ├─ user_id (FK → USER, nullable)
    ├─ action (CREATE / UPDATE / DELETE)
    ├─ entity_type (PRODUCT / ORDER / USER / etc)
    ├─ entity_id
    ├─ changes (JSON - before/after values)
    ├─ ip_address
    ├─ created_at

20. OTP
    ├─ id (PK)
    ├─ user_id (FK → USER)
    ├─ code (6 digits)
    ├─ purpose (EMAIL_VERIFICATION / PASSWORD_RESET)
    ├─ expires_at
    ├─ is_used
    ├─ created_at

21. SESSION
    ├─ id (PK)
    ├─ user_id (FK → USER)
    ├─ jwt_token
    ├─ refresh_token
    ├─ expires_at
    ├─ ip_address
    ├─ user_agent

22. SELLER_COMMISSION
    ├─ id (PK)
    ├─ seller_id (FK → SELLER)
    ├─ order_id (FK → ORDER)
    ├─ order_amount
    ├─ commission_rate
    ├─ commission_amount
    ├─ status (PENDING / PAID / FAILED)
    ├─ paid_at (nullable)

23. PRODUCT_VIEW
    ├─ id (PK)
    ├─ product_id (FK → PRODUCT)
    ├─ user_id (FK → USER, nullable)
    ├─ viewed_at

24. SELLER_RATING
    ├─ id (PK)
    ├─ seller_id (FK → SELLER)
    ├─ user_id (FK → USER)
    ├─ order_id (FK → ORDER)
    ├─ rating (1-5)
    ├─ aspect_ratings (JSON: {shipping: 4, communication: 5})
    ├─ created_at

25. BANNER
    ├─ id (PK)
    ├─ title
    ├─ image_url
    ├─ link_url (nullable)
    ├─ position (HOMEPAGE_TOP / HOMEPAGE_MIDDLE / etc)
    ├─ is_active
    ├─ starts_at
    ├─ ends_at
```

### 3.2.2. Prisma Schema (Actual Code)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String      @id @default(cuid())
  email         String      @unique
  passwordHash  String
  fullName      String
  phone         String?
  avatarUrl     String?
  role          Role        @default(CUSTOMER)
  status        UserStatus  @default(ACTIVE)
  
  // Relations
  seller        Seller?
  cart          Cart?
  orders        Order[]
  addresses     Address[]
  reviews       Review[]
  wishlist      Wishlist[]
  notifications Notification[]
  chatSessions  ChatSession[]
  sessions      Session[]
  otps          OTP[]
  
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  @@index([email])
  @@index([role])
}

enum Role {
  CUSTOMER
  SELLER
  ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  BANNED
}

model Seller {
  id                String      @id @default(cuid())
  userId            String      @unique
  shopName          String
  shopSlug          String      @unique
  description       String?
  avatar            String?
  banner            String?
  status            SellerStatus @default(PENDING)
  businessLicense   String?
  contactPhone      String
  address           String
  ward              String
  district          String
  city              String
  bankName          String
  bankAccount       String
  accountHolder     String
  commissionRate    Decimal     @default(6.00) @db.Decimal(5, 2)
  rating            Float       @default(0)
  totalProducts     Int         @default(0)
  totalOrders       Int         @default(0)
  totalRevenue      Decimal     @default(0) @db.Decimal(15, 2)
  
  // Relations
  user              User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  products          Product[]
  commissions       SellerCommission[]
  sellerRatings     SellerRating[]
  
  verifiedAt        DateTime?
  verifiedBy        String?
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  @@index([shopSlug])
  @@index([status])
}

enum SellerStatus {
  PENDING
  ACTIVE
  SUSPENDED
  BANNED
}

model Category {
  id        String    @id @default(cuid())
  name      String
  slug      String    @unique
  iconUrl   String?
  parentId  String?
  order     Int       @default(0)
  
  // Relations
  parent    Category? @relation("CategoryToParent", fields: [parentId], references: [id])
  children  Category[] @relation("CategoryToParent")
  products  Product[]
  
  createdAt DateTime  @default(now())

  @@index([slug])
}

model Product {
  id              String            @id @default(cuid())
  sellerId        String
  categoryId      String
  name            String
  slug            String            @unique
  description     String            @db.Text
  price           Decimal           @db.Decimal(15, 2)
  stock           Int
  images          String[]
  rating          Float             @default(0)
  reviewCount     Int               @default(0)
  status          ProductStatus     @default(ACTIVE)
  
  // Relations
  seller          Seller            @relation(fields: [sellerId], references: [id])
  category        Category          @relation(fields: [categoryId], references: [id])
  variants        ProductVariant[]
  cartItems       CartItem[]
  orderItems      OrderItem[]
  reviews         Review[]
  wishlists       Wishlist[]
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  @@index([sellerId])
  @@index([categoryId])
  @@index([slug])
  @@fulltext([name, description])
}

enum ProductStatus {
  ACTIVE
  DRAFT
  INACTIVE
}

model ProductVariant {
  id              String    @id @default(cuid())
  productId       String
  name            String
  sku             String    @unique
  priceModifier   Decimal   @default(0) @db.Decimal(10, 2)
  stock           Int
  attributes      Json      // {color: "red", size: "M"}
  
  // Relations
  product         Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  cartItems       CartItem[]
  orderItems      OrderItem[]
  
  createdAt       DateTime  @default(now())

  @@index([productId])
  @@unique([productId, sku])
}

model Cart {
  id              String    @id @default(cuid())
  userId          String    @unique
  totalPrice      Decimal   @default(0) @db.Decimal(15, 2)
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  items           CartItem[]
  
  updatedAt       DateTime  @updatedAt
}

model CartItem {
  id              String    @id @default(cuid())
  cartId          String
  productId       String
  variantId       String?
  quantity        Int
  unitPrice       Decimal   @db.Decimal(15, 2)
  
  // Relations
  cart            Cart      @relation(fields: [cartId], references: [id], onDelete: Cascade)
  product         Product   @relation(fields: [productId], references: [id])
  variant         ProductVariant? @relation(fields: [variantId], references: [id])
  
  createdAt       DateTime  @default(now())

  @@index([cartId])
  @@index([productId])
}

model Order {
  id              String          @id @default(cuid())
  orderCode       String          @unique
  userId          String
  totalPrice      Decimal         @db.Decimal(15, 2)
  shippingPrice   Decimal         @default(0) @db.Decimal(10, 2)
  taxPrice        Decimal         @default(0) @db.Decimal(10, 2)
  paymentMethod   PaymentMethod
  paymentStatus   PaymentStatus   @default(PENDING)
  shippingStatus  ShippingStatus  @default(NOT_SHIPPED)
  shippingAddress String          @db.Text
  trackingNumber  String?
  notes           String?
  
  // Relations
  user            User            @relation(fields: [userId], references: [id])
  items           OrderItem[]
  returnRequest   ReturnRequest?
  payment         Payment?
  notifications   Notification[]
  
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  @@index([userId])
  @@index([orderCode])
  @@index([paymentStatus])
  @@index([shippingStatus])
}

enum PaymentMethod {
  COD
  STRIPE
  WALLET
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum ShippingStatus {
  NOT_SHIPPED
  SHIPPED
  IN_DELIVERY
  DELIVERED
  CANCELLED
  RETURNED
}

model OrderItem {
  id              String          @id @default(cuid())
  orderId         String
  productId       String
  variantId       String?
  quantity        Int
  unitPrice       Decimal         @db.Decimal(15, 2)
  subtotal        Decimal         @db.Decimal(15, 2)
  sellerId        String
  
  // Relations
  order           Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product         Product         @relation(fields: [productId], references: [id])
  variant         ProductVariant? @relation(fields: [variantId], references: [id])
  
  createdAt       DateTime        @default(now())

  @@index([orderId])
}

model Review {
  id              String    @id @default(cuid())
  productId       String
  userId          String
  orderId         String    // FK to verify customer purchased product
  rating          Int       // 1-5
  title           String
  content         String    @db.Text
  images          String[]  // up to 3 URLs
  aspectRatings   Json      // {quality: 5, shipping: 4, package: 5}
  helpfulCount    Int       @default(0)
  unhelpfulCount  Int       @default(0)
  sellerReply     String?   @db.Text
  sellerReplyAt   DateTime?
  status          ReviewStatus @default(PUBLISHED)
  
  // Relations
  product         Product   @relation(fields: [productId], references: [id])
  user            User      @relation(fields: [userId], references: [id])
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@index([productId])
  @@index([userId])
  @@index([status])
}

enum ReviewStatus {
  PUBLISHED
  PENDING
  DELETED
  HIDDEN
}

model ReturnRequest {
  id                String    @id @default(cuid())
  returnCode        String    @unique
  orderId           String    @unique
  userId            String
  reason            String
  description       String    @db.Text
  images            String[]
  status            ReturnStatus @default(PENDING)
  refundAmount      Decimal   @db.Decimal(15, 2)
  refundMethod      RefundMethod
  sellerApprovedAt  DateTime?
  sellerApprovedBy  String?
  returnTrackingNumber String?
  returnedAt        DateTime?
  refundedAt        DateTime?
  rejectionReason   String?
  
  // Relations
  order             Order     @relation(fields: [orderId], references: [id])
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@index([orderId])
  @@index([status])
}

enum ReturnStatus {
  PENDING
  APPROVED
  REJECTED
  IN_TRANSIT
  RECEIVED
  REFUNDED
  CANCELLED
}

enum RefundMethod {
  ORIGINAL_PAYMENT
  WALLET
  BANK_TRANSFER
}

model Address {
  id              String    @id @default(cuid())
  userId          String
  name            String
  phone           String
  street          String
  ward            String
  district        String
  city            String
  postalCode      String?
  isDefault       Boolean   @default(false)
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime  @default(now())

  @@index([userId])
}

model Payment {
  id                      String    @id @default(cuid())
  orderId                 String?
  userId                  String
  amount                  Decimal   @db.Decimal(15, 2)
  paymentMethod           PaymentMethod
  status                  PaymentStatus @default(PENDING)
  stripePaymentIntentId   String?
  
  // Relations
  order                   Order?    @relation(fields: [orderId], references: [id])
  user                    User      @relation(fields: [userId], references: [id])
  
  createdAt               DateTime  @default(now())

  @@index([orderId])
  @@index([userId])
}

model Notification {
  id              String    @id @default(cuid())
  userId          String
  title           String
  message         String    @db.Text
  type            NotificationType
  relatedId       String?   // order_id, product_id, etc
  isRead          Boolean   @default(false)
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  order           Order?    @relation(fields: [relatedId], references: [id])
  
  createdAt       DateTime  @default(now())

  @@index([userId])
  @@index([isRead])
}

enum NotificationType {
  ORDER
  PROMO
  SYSTEM
  CHAT
  SELLER
}

model ChatSession {
  id                String    @id @default(cuid())
  userId            String?
  startedAt         DateTime  @default(now())
  endedAt           DateTime?
  topic             String?
  escalatedToHuman  Boolean   @default(false)
  humanAgentId      String?
  
  // Relations
  user              User?     @relation(fields: [userId], references: [id])
  messages          ChatMessage[]
  
  @@index([userId])
}

model ChatMessage {
  id              String    @id @default(cuid())
  chatSessionId   String
  userId          String?
  sender          ChatSender
  message         String    @db.Text
  intent          ChatIntent?
  confidence      Float?    // 0-100
  metadata        Json?     // {product_id, order_id}
  
  // Relations
  chatSession     ChatSession @relation(fields: [chatSessionId], references: [id], onDelete: Cascade)
  user            User?     @relation(fields: [userId], references: [id])
  
  createdAt       DateTime  @default(now())

  @@index([chatSessionId])
}

enum ChatSender {
  USER
  BOT
}

enum ChatIntent {
  PRODUCT_SEARCH
  TRACK_ORDER
  FAQ
  GENERAL
  COMPLAINT
  SELLER_INFO
}

model Wishlist {
  id              String    @id @default(cuid())
  userId          String
  productId       String
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  product         Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  addedAt         DateTime  @default(now())

  @@unique([userId, productId])
  @@index([userId])
}

model Promotion {
  id              String    @id @default(cuid())
  code            String    @unique
  description     String?
  discountType    DiscountType
  discountValue   Decimal   @db.Decimal(10, 2)
  minOrderValue   Decimal?  @db.Decimal(15, 2)
  maxUses         Int?
  timesUsed       Int       @default(0)
  validFrom       DateTime
  validUntil      DateTime
  status          PromotionStatus @default(ACTIVE)
  
  createdAt       DateTime  @default(now())

  @@index([code])
  @@index([status])
}

enum DiscountType {
  PERCENTAGE
  FIXED
}

enum PromotionStatus {
  ACTIVE
  INACTIVE
  EXPIRED
}

model OTP {
  id              String    @id @default(cuid())
  userId          String
  code            String    // 6 digits
  purpose         OTPPurpose
  expiresAt       DateTime
  isUsed          Boolean   @default(false)
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime  @default(now())

  @@index([userId])
  @@index([expiresAt])
}

enum OTPPurpose {
  EMAIL_VERIFICATION
  PASSWORD_RESET
}

model Session {
  id              String    @id @default(cuid())
  userId          String
  jwtToken        String    @unique
  refreshToken    String    @unique
  expiresAt       DateTime
  ipAddress       String?
  userAgent       String?
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime  @default(now())

  @@index([userId])
}

model SellerCommission {
  id              String    @id @default(cuid())
  sellerId        String
  orderId         String
  orderAmount     Decimal   @db.Decimal(15, 2)
  commissionRate  Decimal   @db.Decimal(5, 2)
  commissionAmount Decimal  @db.Decimal(15, 2)
  status          CommissionStatus @default(PENDING)
  paidAt          DateTime?
  
  // Relations
  seller          Seller    @relation(fields: [sellerId], references: [id])
  
  createdAt       DateTime  @default(now())

  @@index([sellerId])
  @@index([status])
}

enum CommissionStatus {
  PENDING
  PAID
  FAILED
}

model SellerRating {
  id              String    @id @default(cuid())
  sellerId        String
  userId          String
  orderId         String
  rating          Int       // 1-5
  aspectRatings   Json      // {shipping: 4, communication: 5}
  
  // Relations
  seller          Seller    @relation(fields: [sellerId], references: [id])
  
  createdAt       DateTime  @default(now())

  @@index([sellerId])
}

model Banner {
  id              String    @id @default(cuid())
  title           String
  imageUrl        String
  linkUrl         String?
  position        BannerPosition
  isActive        Boolean   @default(true)
  startsAt        DateTime
  endsAt          DateTime
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@index([isActive])
}

enum BannerPosition {
  HOMEPAGE_TOP
  HOMEPAGE_MIDDLE
  HOMEPAGE_BOTTOM
  CATEGORY_PAGE
  SEARCH_RESULTS
}

model AuditLog {
  id              String    @id @default(cuid())
  userId          String?
  action          AuditAction
  entityType      String
  entityId        String
  changes         Json      // {before: {}, after: {}}
  ipAddress       String?
  
  createdAt       DateTime  @default(now())

  @@index([userId])
  @@index([entityType])
}

enum AuditAction {
  CREATE
  UPDATE
  DELETE
}
```

---

## 3.3. API Endpoints Design

### 3.3.1. API Routes Hierarchy

```
BASE_URL: https://api.shopdoan.com/v1

├─ /auth
│  ├─ POST /register                    - Register new user
│  ├─ POST /login                       - Login with email/password
│  ├─ POST /verify-otp                  - Verify email with OTP
│  ├─ POST /refresh-token               - Get new JWT token
│  ├─ POST /logout                      - Logout
│  ├─ POST /forgot-password             - Send password reset email
│  ├─ POST /reset-password              - Reset password with token
│  └─ POST /resend-otp                  - Resend OTP

├─ /users
│  ├─ GET /me                           - Get current user profile
│  ├─ PUT /me                           - Update profile
│  ├─ PUT /me/password                  - Change password
│  ├─ GET /me/addresses                 - Get user addresses
│  ├─ POST /me/addresses                - Add new address
│  ├─ PUT /me/addresses/:id             - Update address
│  ├─ DELETE /me/addresses/:id          - Delete address
│  └─ GET /me/orders                    - Get order history

├─ /products
│  ├─ GET /                             - List all products (paginated, filtered)
│  ├─ GET /search                       - Search products (Elasticsearch)
│  ├─ GET /categories                   - Get all categories
│  ├─ GET /categories/:id/products      - Get products by category
│  ├─ GET /:id                          - Get product detail
│  ├─ GET /:id/reviews                  - Get product reviews
│  ├─ POST /:id/reviews                 - Create product review
│  └─ GET /:id/recommendations          - Get similar products

├─ /cart
│  ├─ GET /                             - Get cart
│  ├─ POST /items                       - Add item to cart
│  ├─ PUT /items/:id                    - Update cart item quantity
│  ├─ DELETE /items/:id                 - Remove item from cart
│  └─ DELETE /clear                     - Clear entire cart

├─ /orders
│  ├─ GET /                             - Get user orders
│  ├─ POST /                            - Create order (checkout)
│  ├─ GET /:id                          - Get order detail
│  ├─ GET /:id/tracking                 - Get order tracking
│  ├─ PUT /:id/confirm-delivery         - Confirm delivery
│  └─ POST /:id/return-request          - Request return

├─ /sellers
│  ├─ POST /register                    - Register as seller
│  ├─ GET /me                           - Get my seller profile
│  ├─ PUT /me                           - Update seller profile
│  ├─ GET /me/products                  - Get my products
│  ├─ POST /me/products                 - Create product
│  ├─ PUT /me/products/:id              - Update product
│  ├─ DELETE /me/products/:id           - Delete product
│  ├─ GET /me/orders                    - Get my orders
│  ├─ PUT /me/orders/:id                - Update order status
│  ├─ GET /me/analytics                 - Get analytics
│  ├─ GET /me/analytics/revenue         - Revenue chart
│  ├─ GET /me/analytics/top-products    - Top products
│  ├─ POST /me/bank-account             - Update bank account
│  └─ GET /:slug                        - Get public seller profile

├─ /payment
│  ├─ POST /create-intent               - Create Stripe payment intent
│  ├─ POST /confirm                     - Confirm payment
│  ├─ GET /status/:intentId             - Check payment status
│  └─ POST /webhook                     - Stripe webhook

├─ /chat
│  ├─ POST /sessions                    - Create chat session
│  ├─ GET /sessions/:id                 - Get chat history
│  ├─ POST /sessions/:id/messages       - Send message
│  ├─ GET /sessions/:id/messages        - Get messages
│  └─ PUT /sessions/:id/close           - Close session

├─ /wishlist
│  ├─ GET /                             - Get wishlist
│  ├─ POST /:productId                  - Add to wishlist
│  └─ DELETE /:productId                - Remove from wishlist

├─ /returns
│  ├─ GET /                             - Get return requests
│  ├─ GET /:id                          - Get return detail
│  ├─ GET /:id/label                    - Get return shipping label
│  └─ PUT /:id/tracking                 - Update return tracking

├─ /admin
│  ├─ GET /users                        - List all users
│  ├─ PUT /users/:id                    - Update user
│  ├─ GET /sellers/pending              - Pending seller approvals
│  ├─ PUT /sellers/:id/approve          - Approve seller
│  ├─ PUT /sellers/:id/reject           - Reject seller
│  ├─ GET /products                     - All products (for moderation)
│  ├─ PUT /products/:id                 - Moderate product
│  ├─ GET /orders                       - All orders
│  ├─ GET /analytics                    - Platform analytics
│  └─ POST /promotions                  - Create promotion

└─ /health
   └─ GET /                             - Health check endpoint
```

---

# CHƯƠNG 4: TÍCH HỢP TRÍ TUỆ NHÂN TẠO

## 4.1. Vai Trò của AI trong ShopDoan

### 4.1.1. Use Cases của AI

```
┌─────────────────────────────────────────────────────────────────┐
│              AI USE CASES IN SHOPDOAN                           │
└─────────────────────────────────────────────────────────────────┘

1. AI CHATBOT - Hỗ trợ khách hàng 24/7
   ├─ Product search & recommendations
   ├─ Order tracking
   ├─ FAQ answering
   ├─ Return/refund guidance
   └─ Escalation to human agent

2. PRODUCT RECOMMENDATIONS - Gợi ý cá nhân hóa
   ├─ Collaborative filtering
   ├─ Content-based filtering
   ├─ Trending products
   └─ Similar products

3. SEARCH OPTIMIZATION - Tìm kiếm thông minh
   ├─ Semantic search
   ├─ Typo correction
   ├─ Query expansion
   └─ Personalized search results

4. SENTIMENT ANALYSIS - Phân tích cảm xúc
   ├─ Review sentiment
   ├─ Customer feedback analysis
   ├─ Issue detection
   └─ Customer satisfaction scoring

5. FRAUD DETECTION - Phát hiện gian lận
   ├─ Suspicious payment patterns
   ├─ Fake review detection
   ├─ Seller abuse detection
   └─ Chargebacks prediction

6. DEMAND FORECASTING - Dự báo nhu cầu (Phase 2)
   ├─ Inventory optimization
   ├─ Price optimization
   ├─ Seasonal trends
   └─ Stock-out prevention

7. PERSONALIZATION - Cá nhân hóa trải nghiệm
   ├─ Personalized homepage
   ├─ Dynamic pricing
   ├─ Custom offers
   └─ Content recommendations
```

## 4.2. So Sánh Các Phương Pháp AI

### 4.2.1. Decision Matrix - Chọn Phương Pháp Tối Ưu

```
┌──────────────────────────────────────────────────────────────────┐
│         AI METHODS COMPARISON FOR SHOPDOAN                       │
└──────────────────────────────────────────────────────────────────┘

OPTION 1: Rule-Based System
─────────────────────────────
Cách thức: Viết rules cứng (if-then)
Ví dụ:
  if user_said("áo thun") → Search for áo thun
  if contains("order") → Track order

Ưu điểm:
  ✓ Đơn giản, dễ implement
  ✓ Nhanh, không cần training
  ✓ Dễ debug & maintain
  ✓ Chi phí thấp

Nhược điểm:
  ✗ Cứng nhắc, không flexible
  ✗ Khó mở rộng cho 1000+ rules
  ✗ Không hiểu context
  ✗ Không học từ user interaction

Điểm: 3/10
Thích hợp cho: Chatbot đơn giản, FAQ


OPTION 2: Machine Learning (Custom Model)
──────────────────────────────────────────
Cách thức: Train custom NLP model (Intent classification)

Ưu điểm:
  ✓ Flexible, có thể học từ data
  ✓ Hiểu context tốt hơn
  ✓ Có thể tối ưu cho domain

Nhược điểm:
  ✗ Cần dataset lớn (10K+ samples)
  ✗ Cần data scientist để train
  ✗ Biến động ngoài training data
  ✗ Chi phí maintain cao
  ✗ Cold start problem

Điểm: 5/10
Thích hợp cho: Large-scale với data sẵn có


OPTION 3: LLM API (ChatGPT, Claude)
────────────────────────────────────
Cách thức: Sử dụng API từ third-party

ChatGPT (OpenAI):
  Cost: $0.0005 per 1K input tokens, $0.0015 per 1K output
  Speed: ~1-3 seconds latency
  Quality: Excellent, multilingual
  Availability: 99.9%+ uptime

Claude (Anthropic):
  Cost: $0.00300 per 1K input, $0.01500 per 1K output
  Speed: ~2-4 seconds latency
  Quality: Excellent, better at reasoning
  Availability: 99.5%+ uptime

Ưu điểm:
  ✓ State-of-the-art quality
  ✓ Không cần training
  ✓ Hoạt động ngay
  ✓ Hỗ trợ multiple languages
  ✓ Liên tục được improve
  ✓ 24/7 support

Nhược điểm:
  ✗ Chi phí API call (scale lên có thể cao)
  ✗ Phụ thuộc vào internet
  ✗ Latency ~2-4 giây
  ✗ Data privacy (gửi data to 3rd party)
  ✗ Rate limiting

Điểm: 8.5/10
ĐƯỢC CHỌN cho ShopDoan ✅


OPTION 4: Hybrid (LLM + RAG + Local Cache)
────────────────────────────────────────────
Cách thức: Combine LLM + Retrieval + Cache

Ưu điểm:
  ✓ Best of both worlds
  ✓ Fast response (cached answers)
  ✓ Accurate (LLM + context)
  ✓ Cost-effective (less API calls)
  ✓ Better privacy (local cache)

Nhược điểm:
  ✗ Phức tạp implement
  ✗ Cần maintain vector DB
  ✗ Vẫn có latency cho non-cached

Điểm: 9/10
RECOMMENDED cho future (Phase 2) ⭐

┌──────────────────────────────────────────────────────────────────┐
│                    FINAL DECISION                                │
├──────────────────────────────────────────────────────────────────┤
│  Phase 1 (Current):    Claude API 3.5 Sonnet (LLM)              │
│  Phase 2 (Next 6mo):   Claude API + RAG (Hybrid)                │
│  Phase 3 (Year 2):     Custom fine-tuned model (Optional)       │
└──────────────────────────────────────────────────────────────────┘
```

## 4.3. Claude AI Integration Architecture

### 4.3.1. Chatbot System Design

```
┌──────────────────────────────────────────────────────────────────┐
│              AI CHATBOT ARCHITECTURE (DETAILED)                  │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                           │
├─────────────────────────────────────────────────────────────────┤
│  • Chat UI Component                                            │
│  • User message input                                           │
│  • Message display with streaming                               │
│  • Suggestion buttons                                           │
└─────────────┬───────────────────────────────────────────────────┘
              │
         HTTP POST
      /api/chat/message
              │
┌─────────────▼───────────────────────────────────────────────────┐
│                  BACKEND API (NestJS)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. MESSAGE RECEIVER                                            │
│     ├─ Validate user input                                      │
│     ├─ Save to Chat_Message DB                                 │
│     ├─ Add to chat session                                      │
│     └─ Generate tracking ID                                     │
│                                                                 │
│  2. INTENT DETECTION                                            │
│     ├─ Simple NLP / Regex                                       │
│     │  Product Search: "áo thun", "tìm sản phẩm"              │
│     │  Track Order: "đơn hàng", "tracking"                    │
│     │  FAQ: "trả hàng", "chính sách"                          │
│     │  General: other                                           │
│     └─ Confidence threshold                                     │
│                                                                 │
│  3. CONTEXT ASSEMBLY                                            │
│     ├─ Chat history (last 5 messages)                          │
│     ├─ User profile (if logged in)                             │
│     ├─ Recent orders                                            │
│     ├─ Previous searches                                        │
│     └─ Product catalog info                                     │
│                                                                 │
│  4. PROMPT ENGINEERING                                          │
│     ├─ System prompt (role definition)                         │
│     ├─ User context injection                                  │
│     ├─ Few-shot examples                                       │
│     ├─ Instruction for format                                  │
│     └─ Constraint specification                                │
│                                                                 │
│  5. EXTERNAL DATA RETRIEVAL                                     │
│     ├─ Product database query                                  │
│     │  If intent = PRODUCT_SEARCH:                             │
│     │    → Search products by keyword                          │
│     │    → Get top 3 products                                  │
│     │    → Format for Claude                                   │
│     │                                                           │
│     ├─ Order database query                                    │
│     │  If intent = TRACK_ORDER:                                │
│     │    → Fetch user orders                                   │
│     │    → Get shipping status                                 │
│     │                                                           │
│     ├─ FAQ database                                            │
│     │  If intent = FAQ:                                        │
│     │    → Search relevant FAQ                                 │
│     │    → Include in context                                  │
│     │                                                           │
│     └─ Elasticsearch (semantic search for Phase 2)             │
│                                                                 │
│  6. CLAUDE API CALL                                             │
│     ├─ Model: claude-3.5-sonnet-latest                        │
│     ├─ Max tokens: 1024                                        │
│     ├─ Temperature: 0.7                                        │
│     └─ Stream: true (for real-time response)                  │
│                                                                 │
│  7. RESPONSE PROCESSING                                         │
│     ├─ Parse streaming chunks                                  │
│     ├─ Add formatting (markdown)                               │
│     ├─ Extract entities (product links, etc)                   │
│     ├─ Generate suggestions                                    │
│     └─ Filter sensitive info                                   │
│                                                                 │
│  8. SAVE & FEEDBACK                                             │
│     ├─ Save bot response to DB                                 │
│     ├─ Log metrics (confidence, intent)                        │
│     ├─ Track user feedback (helpful/not)                       │
│     └─ Send to analytics                                        │
│                                                                 │
└─────────────┬───────────────────────────────────────────────────┘
              │
         DATABASES
              │
    ┌─────────┼──────────┐
    │         │          │
    ▼         ▼          ▼
┌─────────┐ ┌──────┐  ┌───────┐
│PostgreSQL│ │Redis │  │ Claude│
│  Chat DB  │ │Cache │  │ API   │
└─────────┘ └──────┘  └───────┘
```

### 4.3.2. Claude API Integration Code

```typescript
// src/modules/chat/claude.service.ts

import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class ClaudeService {
  private client: Anthropic;
  private logger = new Logger(ClaudeService.name);

  constructor(
    private configService: ConfigService,
    private productService: ProductService,
    private orderService: OrderService,
  ) {
    this.client = new Anthropic({
      apiKey: this.configService.get('CLAUDE_API_KEY'),
    });
  }

  async processMessage(
    userMessage: string,
    userId: string | null,
    chatHistory: ChatMessage[],
  ): Promise<string> {
    try {
      // 1. INTENT DETECTION
      const intent = this.detectIntent(userMessage);
      this.logger.log(`Detected intent: ${intent}`);

      // 2. CONTEXT ASSEMBLY
      const context = await this.assembleContext(intent, userId, userMessage);

      // 3. PROMPT ENGINEERING
      const messages = this.buildMessages(
        userMessage,
        chatHistory,
        context,
        intent,
      );

      // 4. CLAUDE API CALL
      this.logger.log(`Calling Claude API...`);
      const response = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        temperature: 0.7,
        messages: messages,
        system: this.getSystemPrompt(intent),
      });

      // 5. EXTRACT RESPONSE
      const botMessage = response.content[0];
      if (botMessage.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      return botMessage.text;
    } catch (error) {
      this.logger.error(`Error calling Claude: ${error.message}`);
      return this.getFallbackResponse();
    }
  }

  /**
   * Detect user intent from message
   */
  private detectIntent(message: string): ChatIntent {
    const lowerMessage = message.toLowerCase();

    // Product search keywords
    if (
      /tìm|search|áo|quần|giày|sách|điện|máy|cần|muốn mua/.test(
        lowerMessage,
      )
    ) {
      return ChatIntent.PRODUCT_SEARCH;
    }

    // Order tracking keywords
    if (
      /đơn hàng|order|tracking|track|giao|vận chuyển|hàng đã|shipper/.test(
        lowerMessage,
      )
    ) {
      return ChatIntent.TRACK_ORDER;
    }

    // FAQ keywords
    if (
      /trả hàng|return|hoàn tiền|refund|chính sách|policy|fee|phí|đổi/.test(
        lowerMessage,
      )
    ) {
      return ChatIntent.FAQ;
    }

    // Complaint keywords
    if (
      /lỗi|hỏng|không tốt|tệ|xấu|phàn nàn|complaint|issue/.test(
        lowerMessage,
      )
    ) {
      return ChatIntent.COMPLAINT;
    }

    return ChatIntent.GENERAL;
  }

  /**
   * Assemble context for Claude based on intent
   */
  private async assembleContext(
    intent: ChatIntent,
    userId: string | null,
    userMessage: string,
  ): Promise<any> {
    const context = {
      user: null,
      products: [],
      orders: [],
      faq: [],
    };

    if (intent === ChatIntent.PRODUCT_SEARCH) {
      // Search products based on user message
      context.products = await this.productService.search({
        query: userMessage,
        limit: 3,
      });
    }

    if (intent === ChatIntent.TRACK_ORDER && userId) {
      // Get user orders
      context.orders = await this.orderService.getUserOrders(userId);
    }

    if (intent === ChatIntent.FAQ) {
      // Get relevant FAQ
      context.faq = await this.getFAQs(userMessage);
    }

    if (userId) {
      // Get user profile if logged in
      context.user = await this.userService.findById(userId);
    }

    return context;
  }

  /**
   * Build message array for Claude API
   */
  private buildMessages(
    userMessage: string,
    chatHistory: ChatMessage[],
    context: any,
    intent: ChatIntent,
  ): Anthropic.MessageParam[] {
    const messages: Anthropic.MessageParam[] = [];

    // Include chat history (last 5 messages)
    const historyToInclude = chatHistory.slice(-5);
    for (const msg of historyToInclude) {
      if (msg.sender === 'USER') {
        messages.push({
          role: 'user',
          content: msg.message,
        });
      } else {
        messages.push({
          role: 'assistant',
          content: msg.message,
        });
      }
    }

    // Add context as system information in user message
    let enhancedMessage = userMessage;

    if (context.products.length > 0) {
      enhancedMessage += `\n\n[Available Products for Search]:\n`;
      for (const product of context.products) {
        enhancedMessage += `- ${product.name}: ${product.price}VND (Rating: ${product.rating})\n`;
      }
    }

    if (context.orders.length > 0) {
      enhancedMessage += `\n\n[User Orders]:\n`;
      for (const order of context.orders) {
        enhancedMessage += `- Order #${order.code}: Status ${order.status}\n`;
      }
    }

    // Current message
    messages.push({
      role: 'user',
      content: enhancedMessage,
    });

    return messages;
  }

  /**
   * Get system prompt based on intent
   */
  private getSystemPrompt(intent: ChatIntent): string {
    const basePrompt = `You are ShopDoan AI Assistant, a helpful shopping assistant for a Vietnamese e-commerce platform. 
You are friendly, professional, and helpful. Always respond in Vietnamese unless the user writes in English.
Current time: ${new Date().toISOString()}

Guidelines:
- Be concise and clear
- Provide actionable information
- If you don't know, offer to escalate to human agent
- Suggest relevant products when appropriate
- Always be honest about order status and policies`;

    switch (intent) {
      case ChatIntent.PRODUCT_SEARCH:
        return (
          basePrompt +
          `\n\nYou are helping the user search for products. Provide product recommendations based on their query.`
        );

      case ChatIntent.TRACK_ORDER:
        return (
          basePrompt +
          `\n\nYou are helping the user track their order. Provide accurate order status and shipping information.`
        );

      case ChatIntent.FAQ:
        return (
          basePrompt +
          `\n\nYou are answering frequently asked questions about return policy, shipping, payment methods, etc.`
        );

      case ChatIntent.COMPLAINT:
        return (
          basePrompt +
          `\n\nYou are handling a customer complaint. Be empathetic and offer solutions. If complex, recommend escalating to support team.`
        );

      default:
        return basePrompt;
    }
  }

  /**
   * Get fallback response when API fails
   */
  private getFallbackResponse(): string {
    return `Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc chat với agent để được hỗ trợ trực tiếp.`;
  }

  /**
   * Get relevant FAQ articles
   */
  private async getFAQs(query: string): Promise<any[]> {
    // TODO: Implement FAQ search
    return [];
  }
}

// src/modules/chat/chat.service.ts

@Injectable()
export class ChatService {
  constructor(
    private claudeService: ClaudeService,
    private prisma: PrismaService,
    private logger: Logger,
  ) {}

  async processUserMessage(
    chatSessionId: string,
    userId: string | null,
    message: string,
  ): Promise<string> {
    // 1. SAVE USER MESSAGE
    const userMsg = await this.prisma.chatMessage.create({
      data: {
        chatSessionId,
        userId,
        sender: ChatSender.USER,
        message,
      },
    });

    // 2. GET CHAT HISTORY
    const history = await this.prisma.chatMessage.findMany({
      where: { chatSessionId },
      orderBy: { createdAt: 'asc' },
    });

    // 3. PROCESS WITH CLAUDE
    const botResponse = await this.claudeService.processMessage(
      message,
      userId,
      history,
    );

    // 4. SAVE BOT RESPONSE
    await this.prisma.chatMessage.create({
      data: {
        chatSessionId,
        sender: ChatSender.BOT,
        message: botResponse,
      },
    });

    return botResponse;
  }
}
```

### 4.3.3. Frontend Chat Component

```typescript
// src/components/ChatBot.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, X, MessageCircle } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

interface Message {
  id: string;
  sender: 'USER' | 'BOT';
  message: string;
  timestamp: Date;
}

export function ChatBot() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to UI
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'USER',
      message: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call backend API
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          userId: user?.id,
        }),
      });

      const data = await response.json();

      // Add bot response to UI
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'BOT',
        message: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'BOT',
          message: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <div className="w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">ShopDoan Support Bot</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4" ref={scrollRef}>
              {messages.length === 0 && (
                <div className="text-center text-gray-400 text-sm mt-8">
                  Xin chào! Tôi có thể giúp bạn tìm sản phẩm, theo dõi đơn hàng
                  hoặc trả lời các câu hỏi.
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'USER' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'USER'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4 flex gap-2">
            <Input
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

# CHƯƠNG 5: KIỂM THỬ HỆ THỐNG

## 5.1. Test Pyramid & Strategy

### 5.1.1. Test Pyramid Architecture

```
                          ▲
                         /│\
                        / │ \
                       /  │  \
                      / E2E\  \
                     /      \  \       (5%)
                    /        \  \    Low volume
                   /──────────\──\  slow, expensive
                  /            \  \
                 /   Integration \  \
                /    Tests        \  \   (15%)
               /                   \  \ Medium volume
              /─────────────────────\──\ moderate speed
             /                       \  \
            /      Unit Tests          \  \  (80%)
           /     (Fast, Cheap)           \  \ High volume
          /                               \  \fast, easy
         /___________________________________\__\

Test Coverage Distribution:
- Unit Tests: 50-60% coverage
- Integration Tests: 20-30% coverage
- E2E Tests: 5-10% coverage
```

### 5.1.2. Testing Levels

```
┌──────────────────────────────────────────────────────┐
│              TESTING PYRAMID - SHOPDOAN              │
└──────────────────────────────────────────────────────┘

LEVEL 1: UNIT TESTS (70% - Fast & Cheap)
═════════════════════════════════════════
Scope: Individual functions, methods, services
Framework: Jest
Examples:
  ✓ AuthService.hashPassword()
  ✓ ProductService.searchByKeyword()
  ✓ CartService.calculateTotal()
  ✓ OrderService.generateOrderCode()
  
Run time: < 1 second
CI/CD: Runs on every commit
Coverage target: >= 80%


LEVEL 2: INTEGRATION TESTS (20% - Moderate)
═════════════════════════════════════════════
Scope: Multiple modules working together
Framework: Jest + Supertest + Test Database
Examples:
  ✓ Auth flow: Register → Verify Email → Login
  ✓ Product: Create → Search → Add to Cart
  ✓ Order: Create Cart → Checkout → Payment confirmation
  ✓ Return: Request → Approval → Refund
  
Database: Test PostgreSQL instance
Setup: Test data seeding
Run time: 5-10 seconds
CI/CD: Runs on PR
Coverage target: >= 60%


LEVEL 3: E2E TESTS (10% - Slow but Important)
═════════════════════════════════════════════════
Scope: Complete user journeys
Framework: Playwright / Cypress
Examples:
  ✓ Customer: Browse → Search → Add to cart → Checkout
  ✓ Seller: Register → Create product → Manage orders
  ✓ Admin: Verify seller → Moderate products
  ✓ ChatBot: Ask question → Get response
  
Browser: Real browser simulation
Environment: Staging environment
Run time: 30-60 seconds (per test)
CI/CD: Nightly run
Coverage: Critical paths only
```

## 5.2. Test Cases Chi Tiết (20+ Test Cases)

### 5.2.1. Authentication Test Cases

```
FEATURE: User Authentication
═════════════════════════════

TEST CASE 1: User Registration - Happy Path
─────────────────────────────────────────────
Given: New user with valid email
When: User submits registration form
Then: 
  ✓ User account created in database
  ✓ OTP sent to email
  ✓ Email is marked as unverified
  ✓ Status code 201 returned
  
Code:
describe('AuthService.register', () => {
  it('should register user and send OTP', async () => {
    const result = await authService.register({
      email: 'test@gmail.com',
      password: 'SecurePass123!',
      fullName: 'John Doe',
    });

    expect(result).toHaveProperty('id');
    expect(result.status).toBe('UNVERIFIED');
    
    // Verify email was sent
    expect(emailService.sendVerificationEmail).toHaveBeenCalled();
  });
});


TEST CASE 2: User Registration - Email Already Exists
──────────────────────────────────────────────────────
Given: Email already registered
When: User tries to register with same email
Then:
  ✓ Error thrown: "Email already exists"
  ✓ Status code 400
  ✓ No new user created
  
Code:
it('should throw error if email exists', async () => {
  await expect(
    authService.register({
      email: 'existing@gmail.com',
      password: 'Pass123!',
      fullName: 'Jane',
    })
  ).rejects.toThrow('Email already registered');
});


TEST CASE 3: OTP Verification - Valid OTP
──────────────────────────────────────────
Given: User registered with valid OTP sent
When: User enters correct OTP
Then:
  ✓ User status = VERIFIED
  ✓ JWT token returned
  ✓ Session created
  ✓ User can login
  
Code:
it('should verify email with correct OTP', async () => {
  // Setup: Create user
  const user = await authService.register({...});
  const otp = '123456'; // Mock OTP
  
  const result = await authService.verifyOTP(user.id, otp);
  
  expect(result.user.status).toBe('VERIFIED');
  expect(result.token).toBeDefined();
});


TEST CASE 4: OTP Verification - Invalid OTP
─────────────────────────────────────────────
Given: Valid user, invalid OTP
When: User enters wrong OTP
Then:
  ✓ Error: "Invalid OTP"
  ✓ User status still UNVERIFIED
  ✓ Max 3 attempts enforced
  
Code:
it('should reject invalid OTP', async () => {
  await expect(
    authService.verifyOTP(userId, 'WRONG')
  ).rejects.toThrow('Invalid OTP');
});


TEST CASE 5: Login - Valid Credentials
───────────────────────────────────────
Given: Verified user with correct credentials
When: User logs in
Then:
  ✓ JWT token + Refresh token returned
  ✓ Session created
  ✓ Status code 200
  
Code:
it('should login with valid credentials', async () => {
  const result = await authService.login({
    email: 'user@gmail.com',
    password: 'SecurePass123!',
  });

  expect(result.accessToken).toBeDefined();
  expect(result.refreshToken).toBeDefined();
});


TEST CASE 6: Login - Invalid Password
──────────────────────────────────────
Given: Valid user, wrong password
When: User tries to login with wrong password
Then:
  ✓ Error: "Invalid credentials"
  ✓ No token returned
  ✓ Failed attempt logged
  
Code:
it('should reject invalid password', async () => {
  await expect(
    authService.login({
      email: 'user@gmail.com',
      password: 'WrongPassword',
    })
  ).rejects.toThrow('Invalid credentials');
});
```

### 5.2.2. Product Management Test Cases

```
FEATURE: Product Search & Filter
═════════════════════════════════

TEST CASE 7: Product Search - Basic Keyword
────────────────────────────────────────────
Given: 100+ products in database
When: User searches for "áo thun"
Then:
  ✓ Returns >= 1 matching products
  ✓ Results sorted by relevance
  ✓ Pagination works (20 per page)
  ✓ Response time < 500ms
  
Code:
it('should search products by keyword', async () => {
  const results = await productService.search({
    query: 'áo thun',
    limit: 20,
    offset: 0,
  });

  expect(results.data.length).toBeGreaterThan(0);
  expect(results.data[0].name).toContain('áo thun');
  expect(results.total).toBeGreaterThanOrEqual(1);
});


TEST CASE 8: Product Search - With Filters
────────────────────────────────────────────
Given: Products with price, category, rating
When: User searches with filters (price: 100K-500K, rating >= 4)
Then:
  ✓ Only products matching all filters returned
  ✓ Correct count
  ✓ Facet counts accurate
  
Code:
it('should filter products correctly', async () => {
  const results = await productService.search({
    query: 'áo',
    filters: {
      priceMin: 100000,
      priceMax: 500000,
      minRating: 4,
      categoryId: 'cat-001',
    },
  });

  results.data.forEach(product => {
    expect(product.price).toBeGreaterThanOrEqual(100000);
    expect(product.price).toBeLessThanOrEqual(500000);
    expect(product.rating).toBeGreaterThanOrEqual(4);
  });
});


TEST CASE 9: Product Detail - Variants
───────────────────────────────────────
Given: Product with color and size variants
When: User views product detail
Then:
  ✓ All variants displayed correctly
  ✓ Price adjusted for variant
  ✓ Stock checked per variant
  
Code:
it('should display product variants', async () => {
  const product = await productService.getDetail('prod-001');
  
  expect(product.variants).toBeDefined();
  expect(product.variants.length).toBeGreaterThan(0);
  
  const redVariant = product.variants.find(v => v.color === 'red');
  expect(redVariant.price).toBe(299000);
  expect(redVariant.stock).toBeGreaterThan(0);
});
```

### 5.2.3. Shopping Cart Test Cases

```
FEATURE: Shopping Cart Management
══════════════════════════════════

TEST CASE 10: Add Product to Cart - Stock Available
───────────────────────────────────────────────────
Given: Product with 10 stock available
When: User adds 3 items to cart
Then:
  ✓ Item added to cart
  ✓ Quantity = 3
  ✓ Unit price correct
  ✓ Cart total updated
  
Code:
it('should add product to cart', async () => {
  const cart = await cartService.addItem(userId, {
    productId: 'prod-001',
    variantId: null,
    quantity: 3,
  });

  expect(cart.items.length).toBe(1);
  expect(cart.items[0].quantity).toBe(3);
  expect(cart.totalPrice).toBe(3 * 100000);
});


TEST CASE 11: Add Product to Cart - Stock Insufficient
───────────────────────────────────────────────────────
Given: Product with 5 stock, user wants 10
When: User tries to add 10 items
Then:
  ✓ Error thrown: "Only 5 in stock"
  ✓ Cart not updated
  ✓ No item added
  
Code:
it('should reject if insufficient stock', async () => {
  await expect(
    cartService.addItem(userId, {
      productId: 'prod-002',
      quantity: 10,
    })
  ).rejects.toThrow('Only 5 items available');
});


TEST CASE 12: Update Cart Item Quantity
────────────────────────────────────────
Given: Cart with item (quantity: 2)
When: User updates quantity to 5
Then:
  ✓ Quantity updated to 5
  ✓ Cart total recalculated
  
Code:
it('should update item quantity', async () => {
  let cart = await cartService.addItem(userId, {
    productId: 'prod-001',
    quantity: 2,
  });

  cart = await cartService.updateItem(
    userId,
    cart.items[0].id,
    { quantity: 5 }
  );

  expect(cart.items[0].quantity).toBe(5);
});


TEST CASE 13: Remove Product from Cart
───────────────────────────────────────
Given: Cart with 2 items
When: User removes 1 item
Then:
  ✓ Item removed
  ✓ Cart total updated
  ✓ Cart has 1 item
  
Code:
it('should remove item from cart', async () => {
  let cart = await cartService.addItem(userId, {
    productId: 'prod-001',
    quantity: 1,
  });

  cart = await cartService.removeItem(userId, cart.items[0].id);

  expect(cart.items.length).toBe(0);
});
```

### 5.2.4. Order & Payment Test Cases

```
FEATURE: Order Creation & Payment
═════════════════════════════════

TEST CASE 14: Create Order - COD (Cash on Delivery)
─────────────────────────────────────────────────────
Given: Cart with items, user has address
When: User clicks checkout with COD
Then:
  ✓ Order created with status PENDING
  ✓ Payment status = PENDING
  ✓ Order code generated (UC-XXXXX)
  ✓ Confirmation email sent
  ✓ Cart cleared
  
Code:
it('should create order with COD', async () => {
  const order = await orderService.createOrder(userId, {
    shippingAddressId: 'addr-001',
    paymentMethod: PaymentMethod.COD,
    shippingMethod: ShippingMethod.STANDARD,
  });

  expect(order.paymentStatus).toBe(PaymentStatus.PENDING);
  expect(order.orderCode).toMatch(/^UC-\d+$/);
  expect(await cartService.getCart(userId)).toEqual(null);
});


TEST CASE 15: Create Order - Stripe Payment (Success)
───────────────────────────────────────────────────────
Given: Valid cart, Stripe payment intent
When: User completes Stripe payment
Then:
  ✓ Order created with status PENDING
  ✓ Payment status = PAID
  ✓ Order code generated
  ✓ Confirmation email sent
  
Code:
it('should create order with Stripe payment', async () => {
  const paymentIntent = await stripeService.createPaymentIntent({
    amount: 500000,
    userId: userId,
  });

  const order = await orderService.createOrder(userId, {
    shippingAddressId: 'addr-001',
    paymentMethod: PaymentMethod.STRIPE,
    stripePaymentIntentId: paymentIntent.id,
  });

  expect(order.paymentStatus).toBe(PaymentStatus.PAID);
});


TEST CASE 16: Create Order - Out of Stock During Checkout
───────────────────────────────────────────────────────────
Given: Item in cart becomes out of stock
When: User tries to checkout
Then:
  ✓ Error: "Item out of stock"
  ✓ Order not created
  ✓ User can remove item and retry
  
Code:
it('should fail if product out of stock', async () => {
  // Simulate product going out of stock
  await productService.updateStock('prod-001', 0);

  await expect(
    orderService.createOrder(userId, {...})
  ).rejects.toThrow('Product out of stock');
});


TEST CASE 17: Track Order - Status Updates
────────────────────────────────────────────
Given: Order created and being shipped
When: Shipping status changes
Then:
  ✓ Order status updated correctly
  ✓ Customer notified
  ✓ Timeline shows all status changes
  
Code:
it('should track order status', async () => {
  const order = await orderService.getOrder(orderId);
  
  expect(order.shippingStatus).toBe(ShippingStatus.NOT_SHIPPED);
  
  // Simulate shipping update
  await orderService.updateShippingStatus(orderId, ShippingStatus.SHIPPED);
  
  const updated = await orderService.getOrder(orderId);
  expect(updated.shippingStatus).toBe(ShippingStatus.SHIPPED);
});
```

### 5.2.5. AI Chatbot Test Cases

```
FEATURE: AI Chatbot Support
════════════════════════════

TEST CASE 18: Chatbot - Product Search Intent
───────────────────────────────────────────────
Given: User message "Tôi cần áo thun"
When: Chatbot processes message
Then:
  ✓ Intent detected: PRODUCT_SEARCH
  ✓ Products retrieved from DB
  ✓ Response includes product recommendations
  ✓ Response quality score > 0.8
  
Code:
it('should detect product search intent', async () => {
  const response = await chatService.processMessage({
    message: 'Tôi cần áo thun',
    userId: 'user-001',
  });

  expect(response.intent).toBe(ChatIntent.PRODUCT_SEARCH);
  expect(response.products.length).toBeGreaterThan(0);
  expect(response.confidence).toBeGreaterThan(0.8);
});


TEST CASE 19: Chatbot - Order Tracking Intent
───────────────────────────────────────────────
Given: User message "Đơn hàng tôi đâu?"
When: Chatbot processes message
Then:
  ✓ Intent detected: TRACK_ORDER
  ✓ User orders fetched
  ✓ Tracking info included in response
  ✓ Response is accurate
  
Code:
it('should handle order tracking', async () => {
  const response = await chatService.processMessage({
    message: 'Đơn hàng tôi đâu?',
    userId: 'user-001',
  });

  expect(response.intent).toBe(ChatIntent.TRACK_ORDER);
  expect(response.orders).toBeDefined();
  expect(response.orders[0]).toHaveProperty('status');
});


TEST CASE 20: Chatbot - Multi-language Support
────────────────────────────────────────────────
Given: User sends message in English
When: Chatbot processes message
Then:
  ✓ Language detected correctly
  ✓ Response in English
  ✓ No translation errors
  
Code:
it('should support English queries', async () => {
  const response = await chatService.processMessage({
    message: 'Show me red T-shirts',
    userId: 'user-001',
  });

  expect(response.language).toBe('en');
  expect(response.message).toContain('red');
});
```

### 5.2.6. Return & Refund Test Cases

```
FEATURE: Return & Refund Management
════════════════════════════════════

TEST CASE 21: Return Request - Within Window
──────────────────────────────────────────────
Given: Order delivered 5 days ago (within 15-day window)
When: User requests return
Then:
  ✓ Return request created
  ✓ Status = PENDING
  ✓ Return code generated (RT-XXXXX)
  ✓ Seller notified
  
Code:
it('should create return request', async () => {
  const returnReq = await returnService.createReturn(orderId, {
    reason: 'Product defective',
    description: 'Color faded',
    images: [],
  });

  expect(returnReq.status).toBe(ReturnStatus.PENDING);
  expect(returnReq.returnCode).toMatch(/^RT-\d+$/);
});


TEST CASE 22: Return Request - Outside Window
───────────────────────────────────────────────
Given: Order delivered 20 days ago (outside 15-day window)
When: User tries to request return
Then:
  ✓ Error: "Return window expired"
  ✓ Return not created
  
Code:
it('should reject return outside window', async () => {
  await expect(
    returnService.createReturn(oldOrderId, {...})
  ).rejects.toThrow('Return window expired');
});


TEST CASE 23: Return Request - Seller Approval
────────────────────────────────────────────────
Given: Seller receives return request
When: Seller approves return
Then:
  ✓ Status = APPROVED
  ✓ Return shipping address provided
  ✓ Return label generated
  ✓ Customer notified
  
Code:
it('should approve return request', async () => {
  const returnReq = await returnService.approveReturn(returnId);

  expect(returnReq.status).toBe(ReturnStatus.APPROVED);
  expect(returnReq.returnTrackingLabel).toBeDefined();
});
```

---

Tôi sẽ tiếp tục với Chương 6 & 7 dưới đây...

(Chương 6: Triển khai hệ thống và Chương 7: Kết luận sẽ được thêm vào file để đủ 45+ trang)
