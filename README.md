# StockSphere Commerce

A full-stack e-commerce order and inventory management platform built using **React.js, Node.js, Express.js, and SQLite**.

## Project Overview

StockSphere Commerce is a professional e-commerce platform where customers can browse products, add items to cart, place orders, and track order status. Admins can manage products, stock, and monitor dashboard analytics.

---

## Features

### Customer Features

- Browse products
- Search products
- Filter by category and price
- Product details page
- Add to cart
- Checkout system
- Coupon discount system
- Invoice PDF generation
- Order tracking
- Order history

### Admin Features

- Add products
- Update products
- Delete products
- Manage stock
- Dashboard analytics
- Low stock monitoring

### Order Management

- Stock validation before order placement
- Multiple product order support
- Auto stock reduction
- Order cancellation with stock rollback
- Order flow:

```txt
Placed → Packed → Shipped → Delivered → Cancelled
