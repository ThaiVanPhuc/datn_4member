// Use Case Diagram
export const useCaseDiagram = `
flowchart TB
    subgraph Actors
        Guest((Guest))
        Buyer((Buyer))
        Seller((Seller))
        Admin((Admin))
    end

    subgraph "Guest Use Cases"
        UC1[Xem danh sach san pham]
        UC2[Tim kiem san pham]
        UC3[Xem chi tiet san pham]
        UC4[Xem cua hang]
        UC5[Dang ky tai khoan]
        UC6[Dang nhap]
        UC7[Chat voi AI Chatbot]
        UC8[Nhan goi y san pham]
    end

    subgraph "Buyer Use Cases"
        UC9[Them vao gio hang]
        UC10[Quan ly gio hang]
        UC11[Dat hang - Checkout]
        UC12[Chon phuong thuc thanh toan]
        UC13[Xem lich su don hang]
        UC14[Theo doi trang thai don]
        UC15[Huy don hang]
        UC16[Danh gia san pham]
        UC17[Danh gia cua hang]
        UC18[Cap nhat thong tin ca nhan]
        UC19[Dang ky tro thanh Seller]
        UC20[Xem thong bao]
    end

    subgraph "Seller Use Cases"
        UC21[Quan ly ho so cua hang]
        UC22[Them san pham moi]
        UC23[Cap nhat san pham]
        UC24[Xoa/An san pham]
        UC25[Quan ly bien the san pham]
        UC26[Xem danh sach don hang]
        UC27[Cap nhat trang thai don]
        UC28[Xem thong ke ban hang]
        UC29[Phan hoi danh gia]
    end

    subgraph "Admin Use Cases"
        UC30[Quan ly nguoi dung]
        UC31[Duyet ho so Seller]
        UC32[Quan ly danh muc]
        UC33[Xem tat ca don hang]
        UC34[Quan ly danh gia]
        UC35[Xem cuoc tro chuyen chatbot]
        UC36[Ban/Unban san pham]
    end

    Guest --> UC1
    Guest --> UC2
    Guest --> UC3
    Guest --> UC4
    Guest --> UC5
    Guest --> UC6
    Guest --> UC7
    Guest --> UC8

    Buyer --> UC9
    Buyer --> UC10
    Buyer --> UC11
    Buyer --> UC12
    Buyer --> UC13
    Buyer --> UC14
    Buyer --> UC15
    Buyer --> UC16
    Buyer --> UC17
    Buyer --> UC18
    Buyer --> UC19
    Buyer --> UC20

    Seller --> UC21
    Seller --> UC22
    Seller --> UC23
    Seller --> UC24
    Seller --> UC25
    Seller --> UC26
    Seller --> UC27
    Seller --> UC28
    Seller --> UC29

    Admin --> UC30
    Admin --> UC31
    Admin --> UC32
    Admin --> UC33
    Admin --> UC34
    Admin --> UC35
    Admin --> UC36

    Guest -.->|extends| Buyer
    Buyer -.->|extends| Seller
`;

// Sequence Diagram - Registration
export const sequenceAuthDiagram = `
sequenceDiagram
    autonumber
    actor User
    participant AC as AuthController
    participant AS as AuthService
    participant US as UsersService
    participant DB as Database
    participant MS as MailService

    User->>AC: POST /auth/register
    AC->>AS: register(dto)
    AS->>US: findByEmail(email)
    US->>DB: user.findUnique
    DB-->>US: null or user
    
    alt Email exists & isActive
        AS-->>User: Error: Email da ton tai
    else Email not exists
        AS->>AS: hashPassword()
        AS->>AS: generateCode()
        AS->>DB: user.create(isActive:false)
        DB-->>AS: unverified user
        AS->>MS: sendVerificationEmail(code)
        MS-->>AS: sent
        AS-->>User: Success: Ma xac thuc da gui
    end

    User->>AC: POST /auth/verify-registration
    AC->>AS: verifyRegistration(email, code)
    AS->>US: findByEmail(email)
    AS->>AS: validateCode()
    
    alt Code valid
        AS->>DB: user.update(isActive:true)
        AS-->>User: Success: Xac thuc thanh cong
    else Code invalid/expired
        AS-->>User: Error: Ma khong dung
    end
`;

// Sequence Diagram - Order
export const sequenceOrderDiagram = `
sequenceDiagram
    autonumber
    actor Buyer
    participant OC as OrdersController
    participant OS as OrdersService
    participant CS as CartService
    participant DB as Database
    participant NS as NotificationService
    participant PS as PaymentsService
    participant Stripe

    Buyer->>OC: POST /orders
    OC->>OS: create(dto, userId)
    OS->>OS: validate receiver info
    
    OS->>DB: $transaction start
    
    loop For each item
        OS->>DB: product.findMany
        OS->>DB: variant.findMany
        OS->>OS: validate stock
        OS->>OS: calculate price
    end
    
    OS->>OS: generateOrderCode()
    OS->>DB: order.create + orderItems
    OS->>DB: payment.create(UNPAID)
    
    loop Update stock
        OS->>DB: product.update(stock--, soldCount++)
    end
    
    OS->>DB: cartItem.deleteMany
    OS->>NS: createNotification
    OS->>DB: $transaction commit
    
    OS-->>Buyer: Order created
    
    alt Payment = STRIPE
        Buyer->>PS: POST /payments/stripe/checkout
        PS->>Stripe: checkout.sessions.create
        Stripe-->>PS: sessionUrl
        PS-->>Buyer: Redirect to Stripe
        Buyer->>Stripe: Complete payment
        Stripe-->>Buyer: Redirect success
    end
`;

// Sequence Diagram - Chatbot
export const sequenceChatbotDiagram = `
sequenceDiagram
    autonumber
    actor User
    participant CC as ChatbotController
    participant CS as ChatbotService
    participant DB as Database
    participant AI as AI Memory

    User->>CC: POST /chatbot/send
    CC->>CS: sendMessage(msg, userId)
    
    CS->>CS: getOrCreateSession()
    alt Has sessionId
        CS->>DB: chatSession.findUnique
    else No sessionId
        CS->>DB: chatSession.create
    end
    
    CS->>DB: chatMessage.create(USER)
    CS->>CS: getConversationContext()
    CS->>DB: chatMessage.findMany(last 10)
    CS->>DB: aiMemory.findUnique(preferences)
    
    CS->>CS: parseMessage()
    Note over CS: detectLanguage()<br/>detectIntent()<br/>extractKeyword()<br/>extractPrice()
    
    CS->>CS: buildBotPayload()
    
    alt Intent = product_search
        CS->>DB: product.findMany(filters)
        CS->>CS: score & rank products
    else Intent = order_tracking
        CS->>DB: order.findFirst(userId)
    else Intent = add_to_cart
        CS->>CS: resolveCartProduct()
    end
    
    CS->>DB: chatMessage.create(BOT)
    CS->>CS: learnFromConversation()
    CS->>DB: aiMemory.upsert(preferences)
    
    CS-->>User: Response + Products + QuickReplies
`;

// Sequence Diagram - Seller Registration
export const sequenceSellerDiagram = `
sequenceDiagram
    autonumber
    actor Buyer
    actor Admin
    participant SC as SellersController
    participant SS as SellersService
    participant DB as Database

    Buyer->>SC: POST /sellers/register
    SC->>SS: register(userId, dto)
    SS->>DB: user.findUnique(include:sellerProfile)
    
    alt Status = APPROVED
        SS-->>Buyer: Error: Da duoc duyet
    else Status = PENDING
        SS-->>Buyer: Error: Dang cho duyet
    else Status = SUSPENDED
        SS-->>Buyer: Error: Bi dinh chi
    else No profile OR REJECTED
        SS->>SS: generateUniqueSlug()
        SS->>DB: sellerProfile.upsert(PENDING)
        SS-->>Buyer: Success: Da gui ho so
    end

    Note over Admin: Admin Dashboard

    Admin->>SC: GET /admin/sellers?filter=pending
    SC->>SS: findAll(pending)
    SS->>DB: sellerProfile.findMany
    SS-->>Admin: Pending sellers list

    Admin->>SC: POST /admin/sellers/:id/approve
    SC->>SS: approve(id)
    SS->>DB: $transaction start
    SS->>DB: role.findUnique(SELLER)
    SS->>DB: user.update(roleId, accountRole)
    SS->>DB: sellerProfile.update(APPROVED)
    SS->>SS: syncLegacyShop()
    SS->>DB: shop.upsert(active)
    SS->>DB: $transaction commit
    SS-->>Admin: Success: Da duyet
`;

// Activity Diagram - Purchase Flow
export const activityPurchaseDiagram = `
flowchart TD
    Start([Start]) --> Browse[Xem san pham]
    Browse --> Search[Tim kiem/Loc]
    Search --> Detail[Xem chi tiet]
    Detail --> CheckStock{Con hang?}
    
    CheckStock -->|Khong| OutOfStock[Hien Het hang]
    OutOfStock --> Browse
    
    CheckStock -->|Co| SelectVariant[Chon bien the]
    SelectVariant --> AddCart[Them vao gio]
    AddCart --> ContinueShopping{Mua tiep?}
    
    ContinueShopping -->|Co| Browse
    ContinueShopping -->|Khong| ViewCart[Xem gio hang]
    
    ViewCart --> CartEmpty{Gio trong?}
    CartEmpty -->|Co| Browse
    CartEmpty -->|Khong| Checkout[Tien hanh dat hang]
    
    Checkout --> LoggedIn{Da dang nhap?}
    LoggedIn -->|Khong| Login[Dang nhap/Dang ky]
    Login --> EnterInfo
    LoggedIn -->|Co| EnterInfo[Nhap thong tin nhan]
    
    EnterInfo --> ValidInfo{Thong tin hop le?}
    ValidInfo -->|Khong| EnterInfo
    ValidInfo -->|Co| SelectPayment[Chon thanh toan]
    
    SelectPayment --> PaymentMethod{Phuong thuc?}
    
    PaymentMethod -->|COD| CreateOrderCOD[Tao don COD]
    PaymentMethod -->|Stripe| CreateOrderStripe[Tao don Stripe]
    PaymentMethod -->|Momo| CreateOrderMomo[Tao don Momo]
    
    CreateOrderStripe --> RedirectStripe[Chuyen Stripe]
    RedirectStripe --> StripeSuccess{Thanh toan OK?}
    StripeSuccess -->|Co| OrderPaid[Don da thanh toan]
    StripeSuccess -->|Khong| OrderFailed[Don that bai]
    
    CreateOrderCOD --> OrderPending[Don cho xu ly]
    CreateOrderMomo --> OrderPending
    
    OrderPaid --> SendNotification[Gui thong bao]
    OrderPending --> SendNotification
    OrderFailed --> SendNotification
    
    SendNotification --> ClearCart[Xoa gio hang]
    ClearCart --> End([Ket thuc])
`;

// Activity Diagram - Order Processing
export const activityOrderProcessDiagram = `
flowchart TD
    Start([Nhan don moi]) --> ViewOrder[Xem chi tiet don]
    ViewOrder --> StatusPending{Trang thai PENDING}
    
    StatusPending --> ConfirmDecision{Xac nhan don?}
    
    ConfirmDecision -->|Khong| CancelOrder[Huy don hang]
    CancelOrder --> RestoreStock[Hoan lai ton kho]
    RestoreStock --> NotifyCancel[Thong bao huy]
    NotifyCancel --> End1([Ket thuc])
    
    ConfirmDecision -->|Co| Confirmed[CONFIRMED]
    Confirmed --> PreparePackage[Chuan bi hang]
    PreparePackage --> Packing[PACKING]
    
    Packing --> HandToShipper[Giao cho shipper]
    HandToShipper --> Shipping[SHIPPING]
    
    Shipping --> WaitDelivery[Cho giao hang]
    WaitDelivery --> DeliverySuccess{Giao thanh cong?}
    
    DeliverySuccess -->|Khong| HandleReturn[Xu ly hoan/giao lai]
    HandleReturn --> WaitDelivery
    
    DeliverySuccess -->|Co| Delivered[DELIVERED]
    Delivered --> NotifyDelivered[Thong bao giao thanh cong]
    
    NotifyDelivered --> IsCOD{Thanh toan COD?}
    IsCOD -->|Co| UpdatePaid[Cap nhat PAID]
    IsCOD -->|Khong| End2([Ket thuc])
    UpdatePaid --> End2
`;

// Class Diagram
export const classDiagram = `
classDiagram
    class User {
        +int id
        +string email
        +string password
        +string name
        +string phone
        +string address
        +UserRole accountRole
        +boolean isActive
        +validatePassword()
        +generateToken()
    }

    class SellerProfile {
        +int id
        +int userId
        +string shopName
        +string shopSlug
        +string description
        +SellerStatus status
    }

    class Category {
        +int id
        +int parentId
        +string name
        +string slug
        +boolean isActive
    }

    class Product {
        +int id
        +int sellerId
        +int categoryId
        +string name
        +float price
        +float salePrice
        +int stock
        +int soldCount
        +float ratingAverage
        +ProductStatus status
    }

    class ProductVariant {
        +int id
        +int productId
        +string name
        +float priceDelta
        +int stock
        +boolean isActive
    }

    class Cart {
        +int id
        +int userId
    }

    class CartItem {
        +int id
        +int cartId
        +int productId
        +int variantId
        +int quantity
    }

    class Order {
        +int id
        +int userId
        +string orderCode
        +float totalAmount
        +float shippingFee
        +float finalAmount
        +PaymentMethod paymentMethod
        +OrderStatus orderStatus
        +PaymentStatus paymentStatus
        +string receiverName
        +string receiverPhone
        +string receiverAddress
    }

    class OrderItem {
        +int id
        +int orderId
        +int sellerId
        +int productId
        +int quantity
        +float price
    }

    class Payment {
        +int id
        +int orderId
        +PaymentMethod method
        +float amount
        +PaymentStatus status
    }

    class Review {
        +int id
        +int userId
        +int productId
        +int orderItemId
        +float rating
        +string comment
        +string sellerReply
    }

    class ChatSession {
        +int id
        +int userId
    }

    class ChatMessage {
        +int id
        +int sessionId
        +ChatSender sender
        +string message
    }

    class Notification {
        +int id
        +int userId
        +string title
        +string message
        +datetime readAt
    }

    User "1" -- "0..1" SellerProfile : owns
    User "1" -- "0..1" Cart : has
    User "1" -- "*" Order : places
    User "1" -- "*" Review : writes
    User "1" -- "*" Notification : receives
    User "1" -- "*" ChatSession : has

    SellerProfile "1" -- "*" Product : sells
    SellerProfile "1" -- "*" OrderItem : receives

    Category "1" -- "*" Category : parent
    Category "1" -- "*" Product : contains

    Product "1" -- "*" ProductVariant : has
    Product "1" -- "*" CartItem : in
    Product "1" -- "*" OrderItem : ordered
    Product "1" -- "*" Review : receives

    Cart "1" -- "*" CartItem : contains
    CartItem "*" -- "0..1" ProductVariant : selects

    Order "1" -- "*" OrderItem : contains
    Order "1" -- "*" Payment : has
    OrderItem "1" -- "0..1" Review : reviewed

    ChatSession "1" -- "*" ChatMessage : contains
`;

// ERD Diagram
export const erdDiagram = `
erDiagram
    USERS {
        int id PK
        string email UK
        string password
        string name
        string phone
        string address
        enum accountRole
        int roleId FK
        boolean isActive
        string codeId
        datetime codeExpired
    }

    ROLES {
        int id PK
        string name UK
    }

    SELLER_PROFILES {
        int id PK
        int userId FK,UK
        string shopName
        string shopSlug UK
        string description
        string logo
        string banner
        enum status
    }

    CATEGORIES {
        int id PK
        int parentId FK
        string name
        string slug UK
        string description
        int sortOrder
        boolean isActive
    }

    PRODUCTS {
        int id PK
        int sellerId FK
        int categoryId FK
        string name
        string slug UK
        string description
        decimal price
        decimal salePrice
        int stock
        int soldCount
        decimal ratingAverage
        int ratingCount
        enum status
    }

    PRODUCT_IMAGES {
        int id PK
        int productId FK
        string imageUrl
        int sortOrder
    }

    PRODUCT_VARIANTS {
        int id PK
        int productId FK
        string sku
        string name
        decimal priceDelta
        int stock
        boolean isActive
    }

    CARTS {
        int id PK
        int userId FK,UK
    }

    CART_ITEMS {
        int id PK
        int userId FK
        int cartId FK
        int productId FK
        int variantId FK
        int quantity
        string cartKey UK
    }

    ORDERS {
        int id PK
        int userId FK
        string orderCode UK
        decimal totalAmount
        decimal shippingFee
        decimal finalAmount
        enum paymentMethod
        enum orderStatus
        enum paymentStatus
        string receiverName
        string receiverPhone
        string receiverAddress
    }

    ORDER_ITEMS {
        int id PK
        int orderId FK
        int sellerId FK
        int productId FK
        int variantId FK
        string productName
        int quantity
        decimal price
    }

    PAYMENTS {
        int id PK
        int orderId FK
        enum method
        decimal amount
        string transactionCode
        enum status
        datetime paidAt
    }

    REVIEWS {
        int id PK
        int userId FK
        int productId FK
        int orderItemId FK,UK
        enum targetType
        decimal rating
        string comment
        string sellerReply
        boolean isHidden
    }

    NOTIFICATIONS {
        int id PK
        int userId FK
        string title
        string message
        string type
        datetime readAt
    }

    CHAT_SESSIONS {
        int id PK
        int userId FK
    }

    CHAT_MESSAGES {
        int id PK
        int sessionId FK
        enum sender
        string message
    }

    AI_MEMORIES {
        int id PK
        int userId FK
        string key
        json value
    }

    SEARCH_HISTORY {
        int id PK
        int userId FK
        int productId FK
        string keyword
        string query
    }

    ROLES ||--o{ USERS : has
    USERS ||--o| SELLER_PROFILES : owns
    USERS ||--o| CARTS : has
    USERS ||--o{ ORDERS : places
    USERS ||--o{ REVIEWS : writes
    USERS ||--o{ NOTIFICATIONS : receives
    USERS ||--o{ CHAT_SESSIONS : has
    USERS ||--o{ AI_MEMORIES : has
    USERS ||--o{ SEARCH_HISTORY : has

    CATEGORIES ||--o{ CATEGORIES : parent
    CATEGORIES ||--o{ PRODUCTS : contains

    SELLER_PROFILES ||--o{ PRODUCTS : sells
    SELLER_PROFILES ||--o{ ORDER_ITEMS : receives

    PRODUCTS ||--o{ PRODUCT_IMAGES : has
    PRODUCTS ||--o{ PRODUCT_VARIANTS : has
    PRODUCTS ||--o{ CART_ITEMS : in
    PRODUCTS ||--o{ ORDER_ITEMS : ordered
    PRODUCTS ||--o{ REVIEWS : receives
    PRODUCTS ||--o{ SEARCH_HISTORY : found

    CARTS ||--o{ CART_ITEMS : contains
    PRODUCT_VARIANTS ||--o{ CART_ITEMS : selects

    ORDERS ||--o{ ORDER_ITEMS : contains
    ORDERS ||--o{ PAYMENTS : has
    ORDER_ITEMS ||--o| REVIEWS : reviewed

    CHAT_SESSIONS ||--o{ CHAT_MESSAGES : contains
`;

// System Architecture Diagram
export const architectureDiagram = `
flowchart TB
    subgraph "Client Layer"
        UserApp["User Web App<br/>(Next.js :3000)"]
        AdminApp["Admin Dashboard<br/>(Next.js :3001)"]
        Mobile["Mobile App<br/>(Future)"]
    end

    subgraph "API Gateway"
        NestJS["NestJS Backend<br/>REST + GraphQL<br/>:3005"]
    end

    subgraph "Authentication"
        JWT["JWT Auth<br/>Access + Refresh Token"]
        Guards["Guards<br/>JwtAuthGuard<br/>RolesGuard"]
    end

    subgraph "Business Modules"
        Auth["Auth Module"]
        Users["Users Module"]
        Products["Products Module"]
        Categories["Categories Module"]
        Cart["Cart Module"]
        Orders["Orders Module"]
        Payments["Payments Module"]
        Reviews["Reviews Module"]
        Sellers["Sellers Module"]
        Search["Search Module"]
        Recommend["Recommendation Module"]
        Chatbot["Chatbot Module"]
        Notifications["Notifications Module"]
    end

    subgraph "Data Layer"
        Prisma["Prisma ORM"]
        PostgreSQL[("PostgreSQL<br/>Database")]
        Cache["In-Memory Cache"]
        FileStorage["File Storage<br/>/uploads"]
    end

    subgraph "External Services"
        Stripe["Stripe<br/>Payments"]
        SMTP["SMTP<br/>Email Service"]
    end

    UserApp --> NestJS
    AdminApp --> NestJS
    Mobile --> NestJS

    NestJS --> JWT
    NestJS --> Guards
    
    NestJS --> Auth
    NestJS --> Users
    NestJS --> Products
    NestJS --> Categories
    NestJS --> Cart
    NestJS --> Orders
    NestJS --> Payments
    NestJS --> Reviews
    NestJS --> Sellers
    NestJS --> Search
    NestJS --> Recommend
    NestJS --> Chatbot
    NestJS --> Notifications

    Auth --> Prisma
    Users --> Prisma
    Products --> Prisma
    Products --> Cache
    Categories --> Prisma
    Cart --> Prisma
    Orders --> Prisma
    Payments --> Prisma
    Reviews --> Prisma
    Sellers --> Prisma
    Search --> Prisma
    Recommend --> Prisma
    Chatbot --> Prisma
    Notifications --> Prisma

    Prisma --> PostgreSQL
    
    Users --> FileStorage
    Products --> FileStorage
    Sellers --> FileStorage

    Payments --> Stripe
    Auth --> SMTP
    Notifications --> SMTP
`;
