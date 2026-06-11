# E-Commerce-Luxe


```
Ecommerce
├─ Client
│  ├─ .env
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.svg
│  │  └─ icons.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ api
│  │  │  └─ axios.js
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ images
│  │  │     ├─ hero.png
│  │  │     └─ hero2.png
│  │  ├─ components
│  │  │  ├─ accounts
│  │  │  │  ├─ AccountsCompoents.jsx
│  │  │  │  └─ OrderRow.jsx
│  │  │  ├─ auth
│  │  │  │  ├─ LoginPage.jsx
│  │  │  │  └─ SignupPage.jsx
│  │  │  ├─ cart
│  │  │  │  ├─ CartItem.jsx
│  │  │  │  └─ CheckoutPage.jsx
│  │  │  ├─ ContactBottomCards.jsx
│  │  │  ├─ ContactCard.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Header.jsx
│  │  │  ├─ home
│  │  │  ├─ ScrollToTop.jsx
│  │  │  ├─ shop
│  │  │  │  ├─ CategoryFilter.jsx
│  │  │  │  ├─ HeroStrip.jsx
│  │  │  │  ├─ Pagination.jsx
│  │  │  │  ├─ ProductCard.jsx
│  │  │  │  └─ RelatedProductsSlider.jsx
│  │  │  └─ ThemeToggle.jsx
│  │  ├─ data
│  │  │  ├─ contact.jsx
│  │  │  └─ home.js
│  │  ├─ features
│  │  │  ├─ admin
│  │  │  │  ├─ adminCustomerSlice.js
│  │  │  │  ├─ adminOrderSlice.js
│  │  │  │  └─ adminOverviewSlice.js
│  │  │  ├─ auth
│  │  │  │  └─ authSlice.js
│  │  │  ├─ cart
│  │  │  │  └─ cartSlice.js
│  │  │  └─ products
│  │  │     ├─ productApi.js
│  │  │     └─ productsSlice.js
│  │  ├─ index.css
│  │  ├─ layouts
│  │  │  ├─ AdminLayout.jsx
│  │  │  ├─ AuthLayout.jsx
│  │  │  └─ MainLayout.jsx
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ account
│  │  │  │  └─ OrderCancelPage.jsx
│  │  │  ├─ AccountPage.jsx
│  │  │  ├─ admin
│  │  │  │  ├─ AddProductForm.jsx
│  │  │  │  ├─ AdminInquiries.jsx
│  │  │  │  ├─ AdminLoginPage.jsx
│  │  │  │  ├─ AdminSettings.jsx
│  │  │  │  ├─ CustomerManagementPage.jsx
│  │  │  │  ├─ EditProductForm.jsx
│  │  │  │  ├─ HomeContentPage.jsx
│  │  │  │  ├─ OrderManagementPage.jsx
│  │  │  │  ├─ OverviewPage.jsx
│  │  │  │  └─ ProductsManagementPage.jsx
│  │  │  ├─ CartPage.jsx
│  │  │  ├─ ContactPage.jsx
│  │  │  ├─ footer
│  │  │  │  ├─ AboutUsPage.jsx
│  │  │  │  ├─ CareerPage.jsx
│  │  │  │  ├─ CookiesPolicy.jsx
│  │  │  │  ├─ FAQPage.jsx
│  │  │  │  ├─ PressPage.jsx
│  │  │  │  ├─ PrivacyPolicy.jsx
│  │  │  │  ├─ ReturnsExchanges.jsx
│  │  │  │  ├─ ShipingPolicy.jsx
│  │  │  │  ├─ SustainabilityPage.jsx
│  │  │  │  └─ TermsOfService.jsx
│  │  │  ├─ Home.jsx
│  │  │  ├─ OrderSuccessPage.jsx
│  │  │  ├─ ProductPage.jsx
│  │  │  ├─ ShopPage.jsx
│  │  │  ├─ SummaryRow.jsx
│  │  │  ├─ T&CPage.jsx
│  │  │  └─ WishlistPage.jsx
│  │  ├─ router
│  │  │  └─ router.jsx
│  │  ├─ sections
│  │  │  ├─ Categories.jsx
│  │  │  ├─ Deals.jsx
│  │  │  ├─ FAQ.jsx
│  │  │  ├─ Hero.jsx
│  │  │  ├─ Offers.jsx
│  │  │  ├─ States.jsx
│  │  │  └─ Testimonials.jsx
│  │  ├─ services
│  │  │  ├─ adminCustomerApi.js
│  │  │  ├─ adminOrderApi.js
│  │  │  ├─ adminOverviewApi.js
│  │  │  ├─ authApi.js
│  │  │  ├─ homeContentApi.js
│  │  │  ├─ inquiryApi.js
│  │  │  ├─ orderApi.js
│  │  │  └─ productApi.js
│  │  ├─ store.jsx
│  │  └─ utils
│  │     └─ localStorage.js
│  ├─ vercel.json
│  └─ vite.config.js
├─ README.md
└─ Server
   ├─ .env
   ├─ package-lock.json
   ├─ package.json
   ├─ server.js
   ├─ src
   │  ├─ app.js
   │  ├─ config
   │  │  └─ db.js
   │  ├─ controllers
   │  │  ├─ admin.order.controller.js
   │  │  ├─ admin.overview.controller.js
   │  │  ├─ admin.user.controller..js
   │  │  ├─ auth.controller.js
   │  │  ├─ homecontent.controller.js
   │  │  ├─ inquiry.controller.js
   │  │  ├─ order.controller.js
   │  │  └─ product.controller.js
   │  ├─ middleware
   │  │  ├─ auth.middleware.js
   │  │  ├─ multerConfig.js
   │  │  └─ validateRequest.js
   │  ├─ models
   │  │  ├─ homeContentSchema.js
   │  │  ├─ inquirySchema.js
   │  │  ├─ orderSchema.js
   │  │  ├─ productSchema.js
   │  │  └─ userSchema.js
   │  ├─ routes
   │  │  ├─ admin.order.routes.js
   │  │  ├─ auth.routes.js
   │  │  ├─ homecontent.routes.js
   │  │  ├─ inquiry.routes.js
   │  │  ├─ order.routes.js
   │  │  └─ product.routes.js
   │  ├─ scripts
   │  │  ├─ seedProduct.js
   │  │  └─ tempCodeRunnerFile.js
   │  ├─ util
   │  │  ├─ productUtil.js
   │  │  └─ util.js
   │  └─ validators
   │     ├─ authValidators.js
   │     └─ productValidator.js
   └─ vercel.json

```