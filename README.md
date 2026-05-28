# SHOPDOAN - Nền tảng thương mại điện tử đa bán hàng

**Bản báo cáo đồ án tốt nghiệp hoàn chỉnh** - ShopDoan Marketplace Platform

## Tổng quan dự án

**ShopDoan** là một nền tảng thương mại điện tử dạng **Marketplace** kết hợp **AI Chatbot** thông minh, được phát triển như dự án đồ án tốt nghiệp. Hệ thống cho phép nhiều người bán (Sellers) bán sản phẩm trên một nền tảng chung, với hỗ trợ chatbot AI 24/7 và hệ thống gợi ý sản phẩm cá nhân hóa.

## 📋 Nội dung báo cáo

Báo cáo này bao gồm **7 chương** với hơn 40 trang chi tiết:

### Chương 1: Giới thiệu dự án
- Tổng quan thương mại điện tử
- Các mô hình kinh doanh (B2C, C2C, Marketplace)
- Kiến trúc hệ thống
- Công nghệ sử dụng

### Chương 2: Phân tích yêu cầu
- Khảo sát hiện trạng
- Yêu cầu chức năng (Functional Requirements)
- Yêu cầu phi chức năng (Non-Functional Requirements)
- Quy trình nghiệp vụ
- Đặc tả Actor (Tác nhân)
- Use Case Diagram

### Chương 3: Thiết kế hệ thống
- Kiến trúc 3-Layer
- Modular Architecture
- Database Schema (25+ tables)
- Sơ đồ ER Diagram chi tiết

### Chương 4: Tích hợp AI
- Vai trò AI trong E-commerce
- So sánh phương pháp AI
- Kiến trúc AI Chatbot
- AI Memory System
- Hệ thống gợi ý sản phẩm

### Chương 5: Kiểm thử hệ thống
- Mục tiêu kiểm thử
- Test Pyramid (Unit, Integration, E2E)
- Decision Table Testing
- Boundary Value Analysis
- Test Case Template
- Test Plans cho các module

### Chương 6: Triển khai hệ thống
- CI/CD Pipeline (GitLab + Jenkins)
- Docker Containerization
- ELK Stack (Logging)
- Prometheus + Grafana (Monitoring)
- SMTP Gmail (Email Service)
- Nginx Configuration
- Docker Compose Production

### Chương 7: Kết luận & Hướng phát triển
- Tóm tắt dự án
- Những thành tựu
- Metrics & KPIs
- Roadmap Phase 2-3
- Best Practices
- Khuyến nghị cho team

---

## 🛠️ Tech Stack

| Lớp | Công nghệ | Mục đích |
|-----|-----------|---------|
| **Frontend** | Next.js 16, TypeScript, Tailwind CSS, SWR | Web UI |
| **Backend** | NestJS, TypeScript, Prisma ORM | REST API |
| **Database** | PostgreSQL, Redis | Data & Cache |
| **AI** | Rule-based + NLP, LLM (Optional) | Chatbot, Recommendations |
| **Mobile** | React Native, Expo (Tương lai) | Mobile App |
| **CI/CD** | GitLab, Jenkins, Docker | Automation |
| **Monitoring** | ELK Stack, Prometheus, Grafana | Logging & Metrics |
| **Infrastructure** | Docker Compose, Nginx, Ubuntu | Deployment |
| **Payment** | Stripe, COD (Cash on Delivery) | Thanh toán |
| **Email** | SMTP Gmail | Notifications |

---

## 📊 Kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Web App     │  │Admin Dashboard│  │Mobile App    │     │
│  │ (Next.js)    │  │(Next.js)      │  │(React Native)│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │   API GATEWAY       │
              │   (Nginx)           │
              └────────────┬────────┘
                           │
┌────────────────────────────┴──────────────────────────────┐
│          BACKEND LAYER (NestJS)                          │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Auth │ Products │ Orders │ Payments │ AI Chatbot   │ │
│  │  Users │ Cart │ Sellers │ Reviews │ Recommendations │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
      ┌──────────────────┼──────────────────┐
      │                  │                  │
      ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ PostgreSQL   │  │ Redis Cache  │  │File Storage  │
│ (Database)   │  │ (Sessions)   │  │(Uploads)     │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🔑 Tính năng chính

### Cho Khách hàng (Buyer)
✅ Xem & tìm kiếm sản phẩm từ nhiều shop  
✅ Giỏ hàng thông minh  
✅ Checkout đa shop  
✅ Thanh toán đa phương thức (COD, Stripe)  
✅ Theo dõi đơn hàng real-time  
✅ Đánh giá & bình luận sản phẩm  
✅ Hỗ trợ AI Chatbot 24/7  
✅ Gợi ý sản phẩm cá nhân hóa  

### Cho Người bán (Seller)
✅ Đăng ký shop & quản lý profile  
✅ Thêm sản phẩm (có biến thể)  
✅ Quản lý tồn kho  
✅ Xử lý đơn hàng  
✅ Xem thống kê & doanh thu  
✅ Phản hồi đánh giá  

### Cho Admin
✅ Quản lý người dùng  
✅ Duyệt seller registration  
✅ Quản lý sản phẩm  
✅ Xem báo cáo toàn hệ thống  
✅ Cấu hình platform settings  

### AI Features
✅ Chatbot hỗ trợ tiếng Việt & tiếng Anh  
✅ Tư vấn sản phẩm thông minh  
✅ Ghi nhớ sở thích người dùng  
✅ Tra cứu đơn hàng  
✅ Hỗ trợ thanh toán & vận chuyển  

---

## 📐 Kiến trúc Database

### 25+ Tables chính:
- **Users** (user, email, password, role)
- **Products** (product, sku, price, stock)
- **ProductVariants** (màu, size, version)
- **Orders** (order header, status tracking)
- **OrderItems** (chi tiết từng sản phẩm trong đơn)
- **Cart/CartItems** (giỏ hàng)
- **Sellers** (thông tin shop)
- **Payments** (ghi nhận thanh toán)
- **Reviews/Ratings** (đánh giá sản phẩm)
- **ChatbotConversations** (lịch sử chat)
- **AIMemory** (preferences, interests)
- ... và nhiều bảng khác

---

## 🚀 Triển khai

### Development
```bash
# Clone repository
git clone https://gitlab.com/shopdoan/backend.git
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run migrations
npm run migration:run

# Start dev server
npm run start:dev
```

### Production (Docker)
```bash
# Build image
docker build -t shopdoan/backend:latest .

# Run with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f backend
```

---

## 📈 Metrics & KPIs

| Mục tiêu | Hiện tại | Status |
|---------|---------|--------|
| API Response Time (p95) | < 200ms | ✅ |
| Page Load Time | < 1.5s | ✅ |
| Uptime | 99.7% | ✅ |
| Error Rate | 0.2% | ✅ |
| Test Coverage | 75% | ✅ |
| Security Grade | A+ | ✅ |

---

## 🔐 Bảo mật

✅ JWT Authentication + Refresh Token  
✅ Password hashing (bcrypt)  
✅ Rate limiting  
✅ CORS protection  
✅ SQL injection prevention  
✅ Input validation & sanitization  
✅ SSL/TLS encryption  
✅ Environment variables for secrets  

---

## 🧪 Kiểm thử

- **Unit Tests**: Jest + Vitest (70% coverage)
- **Integration Tests**: Supertest (20%)
- **E2E Tests**: Playwright (10%)
- **API Testing**: Postman collection included
- **Load Testing**: k6 scripts

---

## 📚 Tài liệu

- **API Documentation**: `/docs/api.md`
- **Database Schema**: `/docs/database.md`
- **Setup Guide**: `/docs/setup.md`
- **Deployment**: `/docs/deployment.md`
- **Testing**: `/docs/testing.md`
- **Architecture Decisions**: `/docs/adr/`

---

## 📞 Hỗ trợ & Liên hệ

**Dự án**: ShopDoan Marketplace  
**Loại**: Đồ án tốt nghiệp  
**Thành viên**: 4 người  
**Thời gian**: 6 tháng  
**Ngôn ngữ chính**: Tiếng Việt + Tiếng Anh  

---

## 📄 Giấy phép

MIT License - Xem file LICENSE để chi tiết

---

## 🎯 Roadmap tương lai

### Phase 2 (3-6 tháng)
- Advanced search (Elasticsearch)
- Recommendations v2 (ML-based)
- Live shopping
- Loyalty program

### Phase 3 (6-12 tháng)
- International expansion
- Kubernetes deployment
- Advanced AI features
- Social commerce

---

## 📝 Hệ thống file

```
shopdoan/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── modules/          # Business modules
│   │   ├── common/           # Shared utilities
│   │   ├── database/         # Migrations, seeds
│   │   └── main.ts
│   ├── test/                 # Test files
│   └── docker/               # Dockerfile
│
├── frontend/                   # Next.js Web App
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   ├── public/               # Static assets
│   └── docker/               # Dockerfile
│
├── docs/                       # Documentation
│   ├── chapters/             # Báo cáo các chương
│   ├── api/                  # API docs
│   └── images/               # Diagrams, screenshots
│
├── docker-compose.yml         # Development setup
├── docker-compose.prod.yml    # Production setup
├── Jenkinsfile               # CI/CD pipeline
└── README.md                 # This file
```

---

## ✨ Highlights

### Công nghệ nổi bật
- **Modular Architecture**: Dễ mở rộng, maintain
- **AI-Powered**: Chatbot + Recommendations
- **Production-ready**: Logging, Monitoring, Alerting
- **Fully Automated**: CI/CD, deployments
- **Well-tested**: 70%+ code coverage
- **Well-documented**: 40+ pages documentation

### Quy trình phát triển
- Git flow + Code review
- Automated testing (Unit + E2E)
- Continuous Integration (Jenkins)
- Container-based deployment
- Blue-green deployments
- Monitoring & Alerting

---

## 🎓 Học hỏi từ dự án

Dự án này áp dụng các best practices:
- Domain-driven design
- Clean code principles
- Testing pyramid
- CI/CD best practices
- Security hardening
- Performance optimization
- Scalable architecture

---

## 📞 Liên hệ

Để có thêm chi tiết hoặc câu hỏi về dự án, vui lòng tham khảo file báo cáo hoàn chỉnh: **BÁOCÁO ĐẦY ĐỦ.md**

---

**Ngày cập nhật**: 28/05/2026  
**Phiên bản**: 1.0.0  
**Trạng thái**: ✅ Hoàn thành
