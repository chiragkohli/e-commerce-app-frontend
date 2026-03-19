# E-Commerce App Frontend

A modern, responsive e-commerce application frontend built with React, TypeScript, and Tailwind CSS. This project showcases a complete shopping experience with product browsing, authentication, and a user-friendly interface.

## 🚀 Tech Stack

- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 3.4 with animations
- **UI Components**: Shadcn/ui (built on Radix UI)
- **Routing**: React Router 6
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: TanStack React Query
- **Testing**: Vitest + Playwright
- **Linting**: ESLint with TypeScript support

## 📦 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # Shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Footer section
│   ├── ProductCard.tsx # Product display card
│   ├── ProductGallery.tsx # Product gallery
│   ├── SearchOverlay.tsx # Search functionality
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── NavLink.tsx     # Navigation link component
│   └── ProtectedRoute.tsx # Route protection
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── LoginPage.tsx   # User login
│   ├── SignUpPage.tsx  # User registration
│   ├── ProductListPage.tsx # Product listing
│   ├── ProductDetailPage.tsx # Product details
│   ├── ComingSoonPage.tsx # Coming soon placeholder
│   └── NotFound.tsx    # 404 page
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx  # Mobile detection
│   └── use-toast.ts    # Toast notifications
├── lib/                # Utility functions
│   └── utils.ts        # Common utilities
├── data/               # Static data
│   └── products.ts     # Product data
├── assets/             # Static assets
│   └── products/       # Product images
├── App.tsx             # Root component
└── main.tsx            # Application entry point
```

## 🛠️ Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd e-commerce-app-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot module reload |
| `npm run build` | Build for production with TypeScript compilation |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## ✨ Key Features

- **Product Browsing**: Browse and search through product catalog
- **Product Details**: View detailed information about products with gallery
- **Authentication**: Secure login and signup system
- **User Context**: Persistent user state management with React Context
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Toast Notifications**: User feedback through Sonner toast notifications
- **Protected Routes**: Secure pages with route protection
- **Search Functionality**: Overlay search for quick product discovery
- **Advanced UI Components**: Rich component library including accordions, dialogs, dropdowns, carousels, and charts

## 🎨 Styling & UI

The project uses **Shadcn/ui** component library for consistent, accessible UI components. All components are built on top of Radix UI primitives and styled with Tailwind CSS.

### Tailwind Configuration
- Custom theme configuration in `tailwind.config.ts`
- CSS modules and animations enabled
- Typography plugin for rich text styling

## 🔐 Authentication

The app includes authentication features:
- User login and registration pages
- Protected routes that require authentication
- Auth context for managing user state across the application
- Secure session management

## 🔍 Component Highlights

- **ProductCard**: Displays product information in a card format
- **ProductGallery**: Image carousel for product photos
- **SearchOverlay**: Overlay search interface
- **LoadingSpinner**: Reusable loading indicator
- **ProtectedRoute**: Route wrapper for authentication
- **Header/Footer**: Persistent navigation and footer

## 🧪 Testing

The project includes testing infrastructure:
- **Unit & Component Testing**: Vitest configuration
- **E2E Testing**: Playwright for end-to-end tests
- **Testing Library**: React Testing Library for component testing

## 📱 Responsive Design

Built with mobile-first approach using Tailwind CSS breakpoints:
- Mobile optimization with custom mobile detection hook
- Responsive navigation and layouts
- Touch-friendly UI components

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📄 License

This project is part of the E-Commerce Application suite.

## 🤝 Contributing

When contributing to this project:
1. Follow the existing code structure and naming conventions
2. Use TypeScript for type safety
3. Ensure components are properly documented
4. Run ESLint before committing: `npm run lint`
5. Test your changes thoroughly

## 📞 Support

For questions or issues, please refer to the project documentation or contact the development team.
