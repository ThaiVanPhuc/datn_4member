# GIẢI THÍCH CODE CHI TIẾT CHO BEGINNER - DỰ ÁN SHOPDOAN

> Tài liệu này giải thích từng dòng code, logic, luồng hoạt động để beginner có thể hiểu rõ dự án.

---

## MỤC LỤC

1. [Architecture Tổng Quát](#architecture)
2. [Backend - Authentication (Đăng nhập)](#backend-auth)
3. [Backend - Products (Sản phẩm)](#backend-products)
4. [Backend - Cart (Giỏ hàng)](#backend-cart)
5. [Backend - Orders (Đơn hàng)](#backend-orders)
6. [Frontend - Homepage](#frontend-homepage)
7. [Luồng Dữ Liệu Toàn Hệ Thống](#data-flow)
8. [Các Khái Niệm Quan Trọng](#concepts)

---

## 1. ARCHITECTURE TỔNG QUÁT {#architecture}

Dự án SHOPDOAN có 3 phần chính:

```
┌─────────────────────────────────────────────────────┐
│                    NGƯỜI DÙNG                        │
│              (Trình duyệt, Mobile)                   │
└────────────────────┬────────────────────────────────┘
                     │
                HTTP/HTTPS (gửi yêu cầu)
                     │
        ┌────────────▼────────────┐
        │    FRONTEND (Next.js)    │
        │   (shopdoan-ui/user)     │
        │                          │
        │  - Homepage              │
        │  - Product listing       │
        │  - Shopping cart         │
        │  - Checkout              │
        │  - User profile          │
        └────────────┬────────────┘
                     │
                API calls (REST)
                     │
        ┌────────────▼────────────┐
        │   BACKEND (NestJS)       │
        │  (shopdoan-api)          │
        │                          │
        │  - Authentication        │
        │  - Product management    │
        │  - Order processing      │
        │  - Cart operations       │
        │  - Chatbot              │
        │  - Payments             │
        └────────────┬────────────┘
                     │
               Database (Prisma)
                     │
        ┌────────────▼────────────┐
        │   DATABASE (PostgreSQL)  │
        │                          │
        │  - Users                 │
        │  - Products              │
        │  - Orders                │
        │  - Cart items            │
        │  - Categories            │
        │  - Reviews               │
        └──────────────────────────┘
```

### Tech Stack:
- **Frontend**: Next.js 14 (React framework)
- **Backend**: NestJS (Node.js framework)
- **Database**: PostgreSQL
- **ORM**: Prisma (kết nối database)
- **Authentication**: JWT (JSON Web Token)
- **Styling**: Tailwind CSS

---

## 2. BACKEND - AUTHENTICATION (Đăng nhập) {#backend-auth}

### File: `shopdoan-api/src/auth/auth.service.ts`

#### Lý thuyết trước:
- **JWT (JSON Web Token)**: Một chuỗi text được mã hóa, giúp server xác nhận người dùng
- **Hashing**: Quá trình chuyển password thành một chuỗi không thể đảo ngược (bảo mật)
- **Access Token**: Token dùng để gọi API (hết hạn sau 1 giờ)
- **Refresh Token**: Token dùng để lấy access token mới (hết hạn sau 7 ngày)

#### 1. validateUser - Kiểm tra email và password

```typescript
async validateUser(email: string, password: string) {
  // Bước 1: Tìm user trong database bằng email
  const user = await this.usersService.findByEmail(
    email.trim().toLowerCase(),  // Chuyển email thành chữ thường, loại bỏ khoảng trắng
  );

  // Bước 2: Nếu không tìm thấy user, trả về null
  if (!user) return null;

  // Bước 3: So sánh password người dùng nhập với password đã lưu trong database
  // comparePasswordHelper() sẽ giải mã và so sánh
  const isMatch = await comparePasswordHelper(password, user.password);

  // Bước 4: Nếu password không khớp, trả về null
  if (!isMatch) return null;

  // Bước 5: Nếu tất cả đều đúng, trả về user
  return user;
}
```

**Ví dụ thực tế:**
```
Email: john@gmail.com
Password: MyPassword123

1. Tìm user với email john@gmail.com -> tìm thấy user John
2. So sánh password "MyPassword123" với password đã hash trong DB
3. Password khớp? -> Trả về user John
   Password không khớp? -> Trả về null (lỗi)
```

---

#### 2. login - Tạo token đăng nhập

```typescript
async login(user: AuthUser) {
  // Gọi getTokens để tạo access token và refresh token
  return this.getTokens(user);
}

private async getTokens(user: AuthUser) {
  // Bước 1: Lấy tên vai trò của user (admin, customer, seller)
  const legacyRole = this.getLegacyRoleName(user);
  const roleName = this.getMarketplaceRoleName(user);

  // Bước 2: Tạo ACCESS TOKEN (dùng gọi API)
  const accessToken = await this.jwtService.signAsync(
    {
      sub: user.id,              // subject: ID của user
      email: user.email,         // Email của user
      role: roleName,            // Vai trò (admin, customer, seller)
      legacyRole,
    },
    {
      secret: this.configService.get<string>('JWT_SECRET')!,  // Key bí mật để mã hóa
      expiresIn: '1h',  // Hết hạn sau 1 giờ
    },
  );

  // Bước 3: Tạo REFRESH TOKEN (dùng để lấy access token mới)
  const refreshToken = await this.jwtService.signAsync(
    {
      sub: user.id,
    },
    {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
      expiresIn: '7d',  // Hết hạn sau 7 ngày
    },
  );

  // Bước 4: Mã hóa refresh token (bảo mật thêm)
  const hashedRefreshToken = await hashTokenHelper(refreshToken);
  
  // Bước 5: Lưu refresh token vào database
  await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

  // Bước 6: Trả về tokens và thông tin user
  return {
    accessToken,      // Token dùng gọi API
    refreshToken,     // Token dùng lấy access token mới
    user: {
      id: user.id,
      email: user.email,
      name: user.fullName || user.name,
      role: roleName,
    },
  };
}
```

**Ví dụ:**
```
Input: User John (id=5, email=john@gmail.com, role=customer)

Output:
{
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  user: {
    id: 5,
    email: "john@gmail.com",
    role: "customer"
  }
}

Frontend sẽ:
- Lưu accessToken vào browser
- Gửi accessToken trong header khi gọi API
- Sau 1h, dùng refreshToken để lấy accessToken mới
```

---

#### 3. refreshToken - Làm mới token

```typescript
async refreshToken(token: string) {
  // Bước 1: Kiểm tra token có tồn tại không
  if (!token) {
    throw new UnauthorizedException('Refresh token is required');
  }

  let payload: RefreshTokenPayload;
  try {
    // Bước 2: Xác minh refresh token (kiểm tra chữ ký, hết hạn)
    payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  } catch {
    // Token không hợp lệ hoặc hết hạn
    throw new UnauthorizedException('Invalid refresh token');
  }

  // Bước 3: Lấy user từ database dùng ID trong token
  const user = await this.usersService.findById(payload.sub);
  if (!user || !user.refreshToken) {
    throw new UnauthorizedException('Refresh token not found');
  }

  // Bước 4: So sánh refresh token frontend gửi với refresh token lưu trong DB
  const tokenMatches = await compareTokenHelper(token, user.refreshToken);
  if (!tokenMatches) {
    throw new UnauthorizedException('Refresh token mismatch');
  }

  // Bước 5: Tất cả đều đúng, tạo tokens mới
  return this.getTokens(user);
}
```

**Luồng thực tế:**
```
Sau 1 giờ:
1. Frontend gọi API với accessToken cũ
2. Server trả về lỗi 401 (token hết hạn)
3. Frontend gửi refreshToken đến endpoint refreshToken
4. Server kiểm tra refreshToken:
   - Token hợp lệ? Có trong DB? Khớp?
5. Nếu OKay -> tạo accessToken mới
6. Frontend dùng accessToken mới để tiếp tục gọi API
```

---

## 3. BACKEND - PRODUCTS (Sản phẩm) {#backend-products}

### File: `shopdoan-api/src/modules/products/products.service.ts`

#### 1. create - Tạo sản phẩm mới

```typescript
async create(dto: CreateProductDto, actor: Actor) {
  // Bước 1: Kiểm tra seller có quyền tạo sản phẩm không
  const seller = await this.resolveWritableSeller(dto.sellerId, actor);

  // Bước 2: Kiểm tra category có tồn tại không
  await this.assertCategoryExists(dto.categoryId);

  // Bước 3: Tạo slug URL-friendly (ví dụ: "iPhone 14" -> "iphone-14")
  const slug = await this.uniqueSlug(dto.slug || dto.name);

  // Bước 4: Kiểm tra quyền để quyết định status (DRAFT hay ACTIVE)
  const status = this.resolveWritableStatus(dto.status, actor);

  // Bước 5: Tạo sản phẩm trong database
  const product = await this.prisma.product.create({
    data: {
      sellerId: seller.id,
      categoryId: dto.categoryId,
      name: dto.name.trim(),
      slug,
      description: dto.description?.trim() || null,
      price: dto.price,  // Giá gốc
      salePrice: dto.salePrice ?? null,  // Giá khuyến mại (nếu có)
      stock: dto.stock ?? 0,  // Số lượng tồn kho
      status,
      // Bước 6: Tạo hình ảnh sản phẩm nếu có
      images: dto.images?.length
        ? {
            create: dto.images.map((image, index) => ({
              imageUrl: image.imageUrl.trim(),
              sortOrder: index,  // Thứ tự hiển thị hình
            })),
          }
        : undefined,
      // Bước 7: Tạo biến thể sản phẩm (màu, size, v.v.)
      variants: dto.variants?.length
        ? {
            create: dto.variants.map((variant) => ({
              name: variant.name.trim(),  // Ví dụ: "Red", "128GB"
              value: variant.value?.trim() || null,
              sku: variant.sku?.trim() || null,  // Mã hàng
              priceDelta: variant.priceDelta ?? 0,  // Chênh lệch giá
              stock: variant.stock ?? 0,
            })),
          }
        : undefined,
    },
    include: this.include(),  // Include dữ liệu liên quan
  });

  // Bước 8: Xóa cache (sẽ load lại từ DB)
  this.clearPublicListCache();

  // Bước 9: Trả về kết quả
  return this.response('Product created successfully', product);
}
```

**Ví dụ tạo sản phẩm:**
```
Input:
{
  sellerId: 1,
  name: "iPhone 14",
  categoryId: "cat-1",
  price: 25000000,          // Giá gốc: 25 triệu
  salePrice: 23000000,      // Giá bán: 23 triệu
  stock: 50,                // 50 cái
  images: [
    { imageUrl: "https://...iphone1.jpg" },
    { imageUrl: "https://...iphone2.jpg" },
  ],
  variants: [
    { name: "Color", value: "Black", stock: 30 },
    { name: "Color", value: "White", stock: 20 },
  ]
}

Database sẽ có:
- Product: name="iPhone 14", price=25000000, salePrice=23000000
- ProductImage (2 bản ghi): các URL hình ảnh
- ProductVariant (2 bản ghi): Black (30 cái), White (20 cái)
```

---

#### 2. findAll - Lấy danh sách sản phẩm

```typescript
async findAll(query: ProductsQueryDto) {
  // Bước 1: Tạo cache key (dùng để lưu dữ liệu vào memory)
  const cacheKey = this.cacheKey('all', query);

  // Bước 2: Kiểm tra xem dữ liệu có trong cache không
  const cached = this.getCachedList(cacheKey);
  if (cached) return cached;  // Nếu có, trả về luôn (nhanh hơn)

  // Bước 3: Chuẩn bị từ khóa tìm kiếm
  const keyword = query.keyword?.trim().slice(0, 100);

  // Bước 4: Xây dựng điều kiện WHERE cho database
  const where = {
    status: 'ACTIVE' as const,  // Chỉ lấy sản phẩm ACTIVE
    
    // Nếu có categoryId, lọc theo category
    ...(query.categoryId ? { categoryId: query.categoryId } : {}),
    
    // Nếu có sellerId, lọc theo seller
    ...(query.sellerId ? { sellerId: query.sellerId } : {}),
    
    // Nếu có price range, lọc theo giá
    ...(query.minPrice !== undefined || query.maxPrice !== undefined
      ? {
          OR: [
            {
              salePrice: {
                ...(query.minPrice !== undefined
                  ? { gte: query.minPrice }  // >= minPrice
                  : {}),
                ...(query.maxPrice !== undefined
                  ? { lte: query.maxPrice }  // <= maxPrice
                  : {}),
              },
            },
            {
              salePrice: null,
              price: {
                ...(query.minPrice !== undefined
                  ? { gte: query.minPrice }
                  : {}),
                ...(query.maxPrice !== undefined
                  ? { lte: query.maxPrice }
                  : {}),
              },
            },
          ],
        }
      : {}),
    
    // Nếu có keyword, tìm trong name, description, category, seller
    ...(keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: 'insensitive' } },
            { description: { contains: keyword, mode: 'insensitive' } },
            { category: { name: { contains: keyword, mode: 'insensitive' } } },
            { seller: { shopName: { contains: keyword, mode: 'insensitive' } } },
          ],
        }
      : {}),
  };

  // Bước 5: Chạy 2 query cùng lúc (Promise.all)
  const [products, total] = await Promise.all([
    // Query 1: Lấy danh sách sản phẩm với pagination
    this.prisma.product.findMany({
      where,
      skip: query.skip,        // Bỏ qua N bản ghi đầu (pagination)
      take: query.take,        // Lấy N bản ghi
      include: this.listInclude(),  // Include dữ liệu liên quan
      orderBy: this.orderBy(query.sortBy),  // Sắp xếp theo loại
    }),
    // Query 2: Đếm tổng số sản phẩm
    this.prisma.product.count({ where }),
  ]);

  // Bước 6: Tạo response với metadata (tổng số, trang, v.v.)
  const response = this.response('Products retrieved successfully', {
    products,
    meta: this.meta(total, query.page, query.limit),
  });

  // Bước 7: Lưu vào cache (30 giây)
  this.publicListCache.set(cacheKey, {
    expiresAt: Date.now() + this.cacheTtlMs,
    value: response,
  });

  return response;
}
```

**Ví dụ gọi API:**
```
GET /api/products?
  keyword=iphone&
  categoryId=cat-1&
  minPrice=20000000&
  maxPrice=30000000&
  sortBy=price&
  page=1&
  limit=20

Database sẽ:
1. Tìm sản phẩm có:
   - status = 'ACTIVE'
   - name hoặc description chứa 'iphone'
   - categoryId = 'cat-1'
   - giá (salePrice hoặc price) từ 20M đến 30M
2. Sắp xếp theo giá
3. Bỏ qua 0, lấy 20 sản phẩm
4. Trả về danh sách + tổng số
```

---

## 4. BACKEND - CART (Giỏ hàng) {#backend-cart}

### File: `shopdoan-api/src/modules/cart/cart.service.ts`

#### 1. getCart - Lấy giỏ hàng

```typescript
async getCart(userId: number) {
  // Bước 1: Đảm bảo user có cart (nếu không, tạo mới)
  const cart = await this.ensureCart(userId);

  // Bước 2: Lấy tất cả cart items của user
  const items = await this.prisma.cartItem.findMany({
    where: { userId, cartId: cart.id },
    include: this.cartInclude(),  // Include product, variant, v.v.
    orderBy: { updatedAt: 'desc' },  // Mục mới nhất trước
  });

  // Bước 3: Tính tổng tiền
  const totalAmount = items.reduce(
    (sum, item) => sum + this.getItemPrice(item) * item.quantity,
    0,
  );

  // Bước 4: Trả về cart
  return this.response('Cart retrieved successfully', {
    id: cart.id,
    items: items.map((item) => this.serializeCartItem(item)),
    totalAmount,
  });
}
```

**Ví dụ:**
```
User có 2 sản phẩm trong cart:
1. iPhone 14 - Giá 23 triệu - Số lượng 1
2. AirPods Pro - Giá 5 triệu - Số lượng 2

Tính toán:
totalAmount = (23000000 * 1) + (5000000 * 2)
            = 23000000 + 10000000
            = 33000000 (33 triệu)

Response:
{
  id: "cart-1",
  items: [
    { productId: 1, name: "iPhone 14", price: 23000000, quantity: 1 },
    { productId: 2, name: "AirPods Pro", price: 5000000, quantity: 2 },
  ],
  totalAmount: 33000000
}
```

---

#### 2. addItem - Thêm vào giỏ hàng

```typescript
async addItem(userId: number, dto: ValidateCartItemDto) {
  // Bước 1: Đảm bảo user có cart
  const cart = await this.ensureCart(userId);

  // Bước 2: Kiểm tra sản phẩm có tồn tại, còn stock không
  const validated = await this.validateItem(dto);
  const validatedItem = validated.item as any;
  
  // Bước 3: Lấy số lượng (tối thiểu 1)
  const quantity = Math.max(1, dto.quantity || 1);

  // Bước 4: UPSERT - nếu item đã có, tăng số lượng; nếu chưa, tạo mới
  await this.prisma.cartItem.upsert({
    where: {
      userId_cartKey: {
        userId,
        cartKey: validatedItem.id,  // ID duy nhất của item
      },
    },
    update: {
      // Nếu đã có, tăng số lượng
      quantity: { increment: quantity },
      priceAtTime: validatedItem.price,
      note: dto.note?.trim() || null,
    },
    create: {
      // Nếu chưa có, tạo mới
      userId,
      cartId: cart.id,
      productId: validatedItem.productId || null,
      variantId: validatedItem.variantId || null,
      cartKey: validatedItem.id,
      quantity,
      priceAtTime: validatedItem.price,
      note: dto.note?.trim() || null,
    },
  });

  return this.response('Cart item added successfully', {
    item: { ...validatedItem, quantity },
  });
}
```

**Ví dụ 1 - Thêm lần đầu:**
```
Input: { productId: 1, quantity: 1 }

Database:
- Kiểm tra: product 1 có tồn tại, giá bao nhiêu, còn stock không?
- Kiểm tra: cartItem với (userId=5, cartKey="prod-1") có không?
- Không có -> CREATE
- Kết quả: CartItem (userId=5, productId=1, quantity=1)
```

**Ví dụ 2 - Thêm lần thứ 2:**
```
Input: { productId: 1, quantity: 2 }

Database:
- Kiểm tra: product 1 có tồn tại, giá bao nhiêu, còn stock không?
- Kiểm tra: cartItem với (userId=5, cartKey="prod-1") có không?
- Có rồi -> UPDATE
- quantity: 1 + 2 = 3
- Kết quả: CartItem (userId=5, productId=1, quantity=3)
```

---

#### 3. updateItem - Cập nhật số lượng

```typescript
async updateItem(userId: number, cartKey: string, quantity: number) {
  // Bước 1: Tìm cart item
  const current = await this.prisma.cartItem.findFirst({
    where: { userId, cartKey },
  });

  // Bước 2: Nếu không tìm thấy, throw error
  if (!current) throw new NotFoundException('Cart item not found');

  // Bước 3: Nếu quantity <= 0, xóa item (vì không muốn mua nữa)
  if (quantity <= 0) {
    await this.prisma.cartItem.delete({ where: { id: current.id } });
    return this.getCart(userId);  // Trả về cart cập nhật
  }

  // Bước 4: Nếu quantity > 0, cập nhật
  await this.prisma.cartItem.update({
    where: { id: current.id },
    data: { quantity },
  });

  return this.getCart(userId);
}
```

**Ví dụ:**
```
Input: quantity = 0 -> Xóa item
Input: quantity = 5 -> Cập nhật quantity = 5
Input: quantity = -1 -> Xóa item (vì <= 0)
```

---

## 5. BACKEND - ORDERS (Đơn hàng) {#backend-orders}

### File: `shopdoan-api/src/modules/orders/orders.service.ts`

#### create - Tạo đơn hàng

```typescript
async create(dto: CreateOrderDto, userId: number) {
  // Bước 1: Kiểm tra type đơn hàng (marketplace hay legacy)
  const marketplaceItems = dto.items || dto.details?.filter((item) => item.productId);
  
  if (marketplaceItems?.length) {
    return this.createMarketplaceOrder(dto, userId, marketplaceItems);
  }

  // Bước 2: Lấy thông tin giao hàng
  const customerName = dto.customerName?.trim();
  const phone = dto.phone?.trim();
  const address = dto.address?.trim();

  // Bước 3: Kiểm tra thông tin giao hàng có đủ không
  if (!customerName || !phone || !address) {
    throw new BadRequestException(
      'Customer name, phone, and address are required',
    );
  }

  // Bước 4: Lấy ID của các menu items và options
  const ids = dto.details
    .map((detail) => detail.menuItemId)
    .filter((id): id is number => Boolean(id));
  const optionIds = dto.details
    .map((detail) => detail.menuItemOptionId)
    .filter((id): id is number => Boolean(id));

  // Bước 5: Lấy details của items từ database
  const [items, options] = await Promise.all([
    this.prisma.menuItem.findMany({
      where: { id: { in: ids }, isAvailable: true },
      include: { menu: true },
    }),
    this.prisma.menuItemOption.findMany({
      where: { id: { in: optionIds }, isAvailable: true },
    }),
  ]);

  // Bước 6: Tính giá cho từng item trong đơn hàng
  const orderDetails = dto.details.map((detail) => {
    // Tìm item
    const item = items.find((entry) => entry.id === detail.menuItemId);
    if (!item)
      throw new NotFoundException(`Menu item ${detail.menuItemId} not found`);

    // Tìm option (nếu có)
    const option = detail.menuItemOptionId
      ? options.find(
          (entry) =>
            entry.id === detail.menuItemOptionId &&
            entry.menuItemId === item.id,
        )
      : null;

    if (detail.menuItemOptionId && !option) {
      throw new NotFoundException(
        `Menu item option ${detail.menuItemOptionId} not found`,
      );
    }

    // Tính giá
    const optionPrice = option?.additionalPrice || 0;
    const unitPrice = item.basePrice + optionPrice;
    const quantity = Math.max(1, detail.quantity);

    // Kiểm tra stock
    if (item.stock < quantity) {
      throw new BadRequestException(`${item.title} is out of stock`);
    }

    return {
      menuItemId: item.id,
      shopId: item.shopId,
      menuItemOptionId: option?.id,
      quantity,
      itemTitle: item.title,
      optionTitle: option?.title,
      itemPrice: item.basePrice,
      optionPrice,
      unitPrice,
      totalPrice: unitPrice * quantity,
      note: detail.note || null,
    };
  });

  // Bước 7: Tính tổng tiền đơn hàng
  const totalPrice = orderDetails.reduce(
    (sum, detail) => sum + detail.totalPrice,
    0,
  );

  // Bước 8: Tạo đơn hàng trong database
  const order = await this.prisma.order.create({
    data: {
      userId,
      totalPrice,
      customerName,
      phone,
      address,
      note: dto.note?.trim() || null,
      paymentProvider: dto.paymentProvider === 'stripe' ? 'stripe' : 'cash',
      details: { create: orderDetails },
    },
    include: this.orderInclude(),
  });

  // Bước 9: Giảm stock của từng item
  await Promise.all(
    orderDetails.map((detail) =>
      this.prisma.menuItem.update({
        where: { id: detail.menuItemId },
        data: { stock: { decrement: detail.quantity } },
      }),
    ),
  );

  // Bước 10: Xóa cache orders
  await this.cacheService.del('orders:all');

  // Bước 11: Gửi notification cho user
  await this.notificationsService.createForUser(userId, {
    title: 'Đặt hàng thành công',
    message: `Đơn hàng #${order.id} đã được tạo.`,
    type: 'order',
    actionUrl: `/orders/${order.id}`,
    metadata: { orderId: order.id },
  });

  return order;
}
```

**Ví dụ tạo đơn hàng:**
```
Input:
{
  details: [
    { menuItemId: 1, quantity: 2, note: "No sugar" },
    { menuItemId: 2, menuItemOptionId: 10, quantity: 1 },
  ],
  customerName: "John",
  phone: "0123456789",
  address: "123 Main St",
  note: "Please call before delivery"
}

Luồng:
1. Kiểm tra menuItem 1 và 2 có tồn tại không
2. Kiểm tra option 10 có tồn tại không
3. Tính giá:
   - Item 1: basePrice=50000, qty=2 -> 100000
   - Item 2: basePrice=30000, option+price=5000, qty=1 -> 35000
   - Tổng: 135000
4. Kiểm tra stock đủ không
5. Tạo Order trong DB
6. Giảm stock: Item 1 stock-2, Item 2 stock-1
7. Gửi notification cho user
8. Trả về Order

Database sau khi tạo:
- Order: id=123, userId=5, totalPrice=135000, status="pending"
- OrderDetail (2): detail 1 và detail 2
- MenuItem: Item 1 stock-2, Item 2 stock-1
- Notification: "Đặt hàng thành công"
```

---

## 6. FRONTEND - HOMEPAGE {#frontend-homepage}

### File: `shopdoan-ui/apps/user/src/app/page.tsx`

#### Cấu trúc:

```typescript
'use client';  // Chạy ở client (browser), không phải server

import { useEffect, useMemo, useState } from 'react';  // React hooks
import Link from 'next/link';  // Dùng cho navigation
import Header from '@/components/layout/Header';  // Phần header
import Footer from '@/components/layout/Footer';  // Phần footer
import ProductCard from '@/components/product/ProductCard';  // Component sản phẩm
import { getCategories, getHomeRecommendations, getProducts } from '@/services/marketplaceService';

export default function Home() {
  // Bước 1: Declare state (biến có thể thay đổi)
  const [categories, setCategories] = useState<Category[]>([]);
  const [bestSelling, setBestSelling] = useState<Product[]>([]);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Bước 2: useEffect - Chạy khi component mount (lần đầu load)
  useEffect(() => {
    let mounted = true;  // Flag để kiểm tra component có còn mounted không

    // Gọi 3 API cùng lúc
    Promise.all([
      getCategories(10),  // Lấy 10 category
      getProducts({ sortBy: 'best_selling', limit: 8 }),  // Lấy 8 sản phẩm best-selling
      getHomeRecommendations(8),  // Lấy 8 sản phẩm được recommend
    ])
      .then(([categoryData, bestSellingData, recommendationData]) => {
        // Khi tất cả API trả về
        if (!mounted) return;  // Nếu component đã unmount, không cập nhật state
        
        // Cập nhật state
        setCategories(categoryData);
        setBestSelling(bestSellingData.products);
        setRecommended(recommendationData);
      })
      .catch(() => {
        // Nếu API lỗi
        if (!mounted) return;
        setCategories([]);
        setBestSelling([]);
        setRecommended([]);
      })
      .finally(() => {
        // Sau cùng (dù thành công hay lỗi)
        if (mounted) setLoading(false);  // Kết thúc loading
      });

    return () => {
      mounted = false;  // Cleanup khi component unmount
    };
  }, []);  // Chỉ chạy lần đầu

  // Bước 3: useMemo - Tính toán lại chỉ khi bestSelling thay đổi
  const flashSaleProducts = useMemo(
    () => bestSelling.filter((product) => product.salePrice).slice(0, 4),
    [bestSelling],
  );
  // flashSaleProducts = sản phẩm best-selling có salePrice (khuyến mại), lấy 4 cái đầu

  // Bước 4: Render UI
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      {/* Header */}
      <Header />

      <main>
        {/* Section 1: Hero Banner */}
        <section className="bg-orange-500 text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
            {/* Hero Content */}
            <div
              className="flex min-h-[320px] flex-col justify-between overflow-hidden rounded-lg bg-slate-900 p-6"
              style={{
                backgroundImage: "linear-gradient(...), url('...')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded bg-white/15 px-3 py-2 text-sm font-semibold backdrop-blur">
                  <Zap className="h-4 w-4 text-amber-300" />
                  Sàn thương mại điện tử ShopDoan
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                  Mua sắm đa ngành hàng, giao nhanh, giá tốt mỗi ngày
                </h1>

                {/* Description */}
                <p className="mt-4 max-w-xl text-base leading-7 text-orange-50">
                  Khám phá sản phẩm từ nhiều shop, săn ưu đãi, theo dõi đơn hàng và hỏi chatbot.
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-50"
                >
                  Mua sắm ngay
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Categories */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold">Danh mục sản phẩm</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?categoryId=${category.id}`}
                className="group rounded-lg bg-white p-4 shadow transition hover:shadow-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="mb-4 h-32 w-full object-cover rounded transition group-hover:scale-105"
                />
                <h3 className="font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3: Best Selling Products */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold">Sản phẩm bán chạy</h2>
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {bestSelling.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Section 4: Recommended Products */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold">Gợi ý cho bạn</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
```

**Giải thích chi tiết:**

```
Khi user vào trang homepage:

1. Browser load component Home()
2. Component sử dụng useEffect để gọi 3 API:
   - getCategories(10) -> trả về 10 categories
   - getProducts({...}) -> trả về 8 best-selling products
   - getHomeRecommendations(8) -> trả về 8 recommended products

3. Khi API trả về, cập nhật state:
   setCategories([...])
   setBestSelling([...])
   setRecommended([...])
   setLoading(false)

4. Component re-render với dữ liệu mới

5. Render UI:
   - Header
   - Hero banner
   - Category list (map qua categories array)
   - Best-selling products (map qua bestSelling array)
   - Recommended products (map qua recommended array)
   - Footer
   - Chatbot widget
```

---

## 7. LUỒNG DỮ LIỆU TOÀN HỆ THỐNG {#data-flow}

### Ví dụ: Người dùng mua sản phẩm

```
┌─────────────────────────────────────────────────────────────┐
│                    BƯỚC 1: DUYỆT SẢN PHẨM                     │
└─────────────────────────────────────────────────────────────┘

User:
1. Vào trang homepage
2. Nhìn thấy danh sách sản phẩm

Frontend:
1. Load component Home()
2. useEffect gọi getProducts()
3. API call: GET /api/products?limit=8&sortBy=best_selling

Backend:
1. Controller nhận request
2. ProductsService.findAll(query)
3. Xây dựng WHERE clause:
   - status = 'ACTIVE'
   - sortBy = 'best_selling'
   - take = 8
4. Query database:
   SELECT * FROM products
   WHERE status = 'ACTIVE'
   ORDER BY totalSold DESC
   LIMIT 8
5. Trả về products array

Frontend:
1. setState(bestSelling) với dữ liệu từ API
2. Re-render, hiển thị ProductCard cho mỗi product

Database:
- Không thay đổi


┌─────────────────────────────────────────────────────────────┐
│                   BƯỚC 2: CLICK VÀO SẢN PHẨM                 │
└─────────────────────────────────────────────────────────────┘

User:
1. Click vào ProductCard

Frontend:
1. next/link push router tới /products/{productId}
2. Trong page.tsx của products, gọi getProductDetail(productId)
3. API call: GET /api/products/{productId}

Backend:
1. ProductsService.findById(productId)
2. Query database:
   SELECT * FROM products
   WHERE id = {productId}
   INCLUDE images, variants, reviews, seller
3. Trả về product detail

Frontend:
1. setState với product detail
2. Render product images, name, price, variants, reviews

Database:
- Không thay đổi


┌─────────────────────────────────────────────────────────────┐
│                   BƯỚC 3: THÊM VÀO GIỎ HÀNG                  │
└─────────────────────────────────────────────────────────────┘

User:
1. Chọn variant (nếu có): màu Black
2. Chọn số lượng: 1
3. Click nút "Thêm vào giỏ hàng"

Frontend:
1. Gọi cartService.addToCart({
     productId: "prod-1",
     variantId: "var-10",
     quantity: 1
   })
2. API call: POST /api/cart/items
   Body: { productId, variantId, quantity }

Backend:
1. CartService.addItem(userId, dto)
2. Validate item:
   - Kiểm tra product tồn tại
   - Kiểm tra variant tồn tại
   - Kiểm tra stock đủ không
3. UPSERT cartItem:
   - Nếu đã có cartItem -> tăng quantity
   - Nếu chưa có -> tạo mới
   UPDATE cartItem
   SET quantity = quantity + 1
   WHERE userId = 5 AND productId = 1 AND variantId = 10
4. Trả về updated cart

Frontend:
1. Cập nhật CartContext
2. Hiển thị toast: "Đã thêm vào giỏ hàng"
3. Update cart badge

Database:
CartItem:
{
  userId: 5,
  productId: 1,
  variantId: 10,
  quantity: 1,
  priceAtTime: 23000000
}


┌─────────────────────────────────────────────────────────────┐
│                    BƯỚC 4: ĐI ĐẾN GIỎ HÀNG                    │
└─────────────────────────────────────────────────────────────┘

User:
1. Click vào icon giỏ hàng hoặc vào /cart

Frontend:
1. Gọi cartService.getCart()
2. API call: GET /api/cart

Backend:
1. CartService.getCart(userId)
2. Query database:
   SELECT * FROM cartItems
   WHERE userId = 5
   INCLUDE product, variant
3. Tính tổng:
   totalAmount = sum(price * quantity)

Frontend:
1. Render cart items
2. Hiển thị tổng tiền

Database:
- Không thay đổi


┌─────────────────────────────────────────────────────────────┐
│                    BƯỚC 5: THANH TOÁN                        │
└─────────────────────────────────────────────────────────────┘

User:
1. Click "Thanh toán"
2. Nhập địa chỉ giao hàng
3. Chọn phương thức thanh toán
4. Click "Xác nhận đơn hàng"

Frontend:
1. Gọi ordersService.createOrder({
     items: [...cartItems],
     shippingAddress: {...},
     paymentMethod: "cod"
   })
2. API call: POST /api/orders
   Body: {...order data}

Backend:
1. OrdersService.create(dto, userId)
2. Validate:
   - Kiểm tra mỗi cartItem trong details
   - Kiểm tra stock đủ không
3. Tính tổng:
   totalPrice = sum(item.price * quantity)
4. Tạo Order:
   INSERT INTO orders (userId, totalPrice, ...)
   VALUES (5, 33000000, ...)
5. Tạo OrderDetails:
   INSERT INTO orderDetails (orderId, productId, quantity, ...)
6. Cập nhật stock:
   UPDATE products
   SET stock = stock - quantity
   WHERE id IN ([1, 2, ...])
7. Xóa cache
8. Gửi notification
9. Trả về order

Frontend:
1. Xóa cart (hoặc clear)
2. Redirect tới /orders/{orderId}
3. Hiển thị "Đơn hàng được tạo"

Database:
Orders:
{
  id: 1234,
  userId: 5,
  totalPrice: 33000000,
  status: 'PENDING'
}

OrderDetails (2 records):
{
  orderId: 1234,
  productId: 1,
  variantId: 10,
  quantity: 1,
  price: 23000000
},
{
  orderId: 1234,
  productId: 2,
  quantity: 2,
  price: 5000000
}

CartItems: Xóa tất cả
Products: Stock giảm
```

---

## 8. CÁC KHÁI NIỆM QUAN TRỌNG {#concepts}

### A. JWT (JSON Web Token)

**Là gì:**
Token là một chuỗi text được mã hóa, chứa thông tin người dùng.

**Ví dụ:**
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifQ.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ

Cấu trúc:
header.payload.signature

Payload (phần giữa) khi decode:
{
  "sub": 5,
  "email": "john@gmail.com",
  "role": "customer"
}
```

**Cách dùng:**
```
Frontend:
1. Login -> nhận access token
2. Lưu token vào localStorage/sessionStorage
3. Mỗi request tới API, thêm token vào header:
   Authorization: Bearer {token}

Backend:
1. Nhận request với token
2. Verify token (kiểm tra chữ ký, hết hạn)
3. Extract data từ token (user id, role)
4. Sử dụng data để authorize request
```

---

### B. Prisma ORM

**Là gì:**
Prisma giúp code TypeScript/JavaScript có thể làm việc với database dễ dàng.

**Ví dụ:**
```typescript
// Thay vì viết SQL:
// SELECT * FROM products WHERE id = 1

// Dùng Prisma:
const product = await prisma.product.findUnique({
  where: { id: 1 },
  include: { images: true, variants: true }
});

// Kết quả:
{
  id: 1,
  name: "iPhone 14",
  price: 25000000,
  images: [...],
  variants: [...]
}
```

---

### C. Caching

**Là gì:**
Lưu dữ liệu vào memory thay vì query database lần nữa.

**Tại sao:**
- Query database chậm (network latency)
- Memory nhanh hơn 1000x
- Giảm tải cho database

**Ví dụ:**
```typescript
async findAll(query) {
  // Kiểm tra cache
  const cacheKey = 'products:' + JSON.stringify(query);
  const cached = cache.get(cacheKey);
  if (cached) return cached;  // Nhanh!

  // Nếu không có cache, query database
  const products = await db.products.findMany(query);

  // Lưu vào cache (30 giây)
  cache.set(cacheKey, products, 30000);

  return products;
}
```

---

### D. Hash (Mã hóa)

**Là gì:**
Chuyển password thành một chuỗi không thể đảo ngược.

**Ví dụ:**
```
Password: MyPassword123
Hashed: $2b$10$wfJ8L7K9...  (không thể đảo ngược)

Khi user login:
1. Nhập: MyPassword123
2. Hash nhập -> $2b$10$wfJ8L7K9...
3. So sánh với hash lưu trong DB
4. Nếu giống -> login thành công
```

---

### E. API Response Format

**Frontend và Backend sử dụng format chung:**

```typescript
// Success
{
  success: true,
  message: "Products retrieved successfully",
  data: {
    products: [...],
    meta: { total: 100, page: 1, pages: 5 }
  }
}

// Error
{
  success: false,
  message: "Product not found",
  error: "NOT_FOUND"
}
```

---

### F. Pagination

**Là gì:**
Chia dữ liệu thành nhiều trang.

**Ví dụ:**
```
API: GET /api/products?page=2&limit=20

page=2, limit=20 có nghĩa:
- Bỏ qua 20 bản ghi đầu (page 1)
- Lấy 20 bản ghi tiếp theo (page 2)

SQL:
SELECT * FROM products
LIMIT 20
OFFSET 20

Response:
{
  products: [...],  // 20 products
  meta: {
    total: 500,    // Tổng 500 products
    page: 2,
    pages: 25,     // 500 / 20 = 25 trang
    limit: 20
  }
}
```

---

### G. State Management (React)

**useState:**
```typescript
const [loading, setLoading] = useState(true);

// loading = true (state hiện tại)
// setLoading(false) = hàm cập nhật state
```

**useEffect:**
```typescript
useEffect(() => {
  // Code chạy khi component mount hoặc dependencies thay đổi
  console.log("Component đã mount");

  return () => {
    // Cleanup code chạy khi component unmount
    console.log("Component đã unmount");
  };
}, [dependencies]);  // Chỉ re-run khi dependencies thay đổi
```

**useMemo:**
```typescript
const flashSaleProducts = useMemo(
  () => bestSelling.filter((p) => p.salePrice),
  [bestSelling]  // Chỉ re-calculate khi bestSelling thay đổi
);
```

---

## KẾT LUẬN

Hiểu được:
1. **Architecture**: 3 tầng (Frontend, Backend, Database)
2. **Authentication**: JWT tokens, password hashing
3. **CRUD Operations**: Create, Read, Update, Delete products, cart, orders
4. **Data Flow**: User action -> Frontend -> API -> Backend -> Database -> Response
5. **Caching**: Tối ưu performance
6. **React Hooks**: useState, useEffect, useMemo
7. **Prisma**: ORM để query database dễ dàng
8. **Pagination**: Chia dữ liệu thành trang

Chúc bạn học tốt dự án này!
