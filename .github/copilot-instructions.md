---
applyTo: "**"
---
# Project Spec
This project is a jewelry inventory management system designed for efficient inventory management with the following features:

## Core System
* **User Roles**
    * Admin: Single business owner with full access to system features, user management and all stores
    * User: Store staff with access limited to assigned stores and specific permissions
* **Store Management**
    * Multi-store support for the single business owner
    * Granular permission system to assign users to specific stores
    * Centralized inventory management across all stores

## Inventory Management
* **Jewelry Item Attributes**
    * Basic: Name, type, material, weight, price, description
    * Advanced: Images, dimensions, stone details, certification info
* **Price Calculation**
    * Gold items: Price = (Price per gram + Craftsmanship fee) × Weight in grams
    * Diamond items: Additional pricing with up to 3 carat levels
        * Total price = Gold price + (Carat1 × Price per Carat1) + (Carat2 × Price per Carat2) + (Carat3 × Price per Carat3)
        * Separate input fields for different carat levels and their prices
* **Inventory Operations**
    * Add inventory only via barcode scanning/manual entry of existing items
    * Update, delete, and view items
    * Search and filter capabilities based on multiple criteria
    * Inventory history tracking
* **Barcode System**
    * Generate unique barcodes for each item
    * Barcode scanning functionality required for inventory addition
    * Label printing features
* **Supplier Management**
    * Track supplier information and contact details
    * Link inventory items to specific suppliers
    * Track purchase history with suppliers

## Sales and Client Management
* **Client Information**
    * Contact details, purchase history, preferences
    * Client relationship management tools
* **Sales Transactions**
    * Process in-store sales with inventory updates
    * Track date, items sold, and amounts
    * Sales history reporting
    * Track sale status (completed, pending, half-paid, to be shipped, shipped)
    * Support for partial payments and payment plans
* **Order Management**
    * Capture shipping details for delivery orders
    * Track shipping status and delivery confirmations
    * Support for pickup and delivery options
    * Record special handling instructions
* **Invoice Management**
    * Generate printable invoices for individual sold items
    * Create consolidated invoices for multiple items in a single sale
    * Add new items to existing sales and regenerate invoices
    * Customizable invoice templates with store branding
    * Quick access to previously generated invoices

## Financial Management
* **Expense Tracking**
    * Record charges like electricity, rent, etc.
    * Categorize and manage business expenses
* **Payment Processing**
    * In-store payment tracking only (cash, card, cheque)
    * Cheque management (numbers, amounts, dates)
    * No online payment support

## Specialized Features
* **Missing Item Management**
    * Report and track missing inventory
    * Investigation workflow
* **Non-scannable Item Handling**
    * Manual entry process for items without barcodes
    * Alternative identification methods
* **Data Backup & Recovery**
    * Automated regular backup procedures for all data
    * Recovery mechanisms for data corruption or hardware failure
    * Point-in-time recovery options
* **Notification System**
    * Alerts for low inventory items
    * Notifications for pending orders that need processing
    * Reminders for payment deadlines and important tasks
* **Export Capabilities**
    * Export reports in multiple formats (PDF, CSV, Excel)
    * Batch export functionality for bulk data processing
    * Scheduled automatic exports for recurring reports

## Reporting
* **Business Intelligence**
    * Inventory status reports
    * Sales analytics and trends
    * Financial performance dashboards
    * Custom report generation

## Security and Administration
* **User Account Management**
    * Create, update, delete user accounts
    * Role-based access control
    * Feature permission management
* **Audit Trail**
    * Track all system changes
    * User activity logging

## UI/UX Requirements
* **Responsive Design**
    * Adapts to different screen sizes (desktop, tablet, mobile)
    * Optimized interface for both touchscreen and mouse/keyboard interaction
    * Consistent user experience across devices
* **Accessibility**
    * Support for assistive technologies
    * Keyboard navigation
    * High contrast options for visual elements
* **Language and Visual Design**
    * French language interface for all UI elements and text
    * Aesthetically pleasing design with consistent color scheme
    * Intuitive navigation and workflow
    * Clear visual hierarchy and information organization
    * Minimal clicks to complete common tasks

# Technical Specification
## Technology Stack
* **Frontend**
    * SvelteKit without server-side rendering
    * DaisyUI as UI component library on top of Tailwind CSS
    * Modern CSS with responsive design principles
    * Progressive Web App (PWA) capabilities
* **Backend**
    * PocketBase for backend API and database
    * Simple username/password authentication only (no OAuth or complex authentication)
    * Role-based authorization aligned with user roles
    * File storage for images and documents
* **Testing**
    * End-to-end testing for all features
    * Unit testing for critical components
    * Integration testing for API endpoints
* **Deployment**
    * Single Go binary deployment packaging PocketBase, frontend assets, and all required components
    * Deploy as one complete unit to a single VPS server
    * Include only external components that cannot be encoded in the binary
* **Localization Structure**
    * Type-safe separation of UI text from code in translation files
    * Static analysis to catch missing translations at build time
    * French language implementation with standardized jewelry terminology
    * Structure that supports potential additional languages in the future
* **Security Implementation**
    * Input validation and sanitization for all user inputs
    * Protection against common vulnerabilities (XSS, CSRF, SQL injection)
    * Regular security audits and vulnerability scanning
    * Secure data handling practices for sensitive client information