# Quick Foods

![Quick Foods]()

A modern catering service platform connecting customers with professional catering services for events, parties, and special occasions.

**Live Demo:** [Quick Foods]()

## Features

- 🍽️ Browse catering services by category, cuisine, and location
- ⭐ Rate and review catering services
- 🔍 Advanced search and filtering options
- 📅 Booking and scheduling system
- 💬 Direct messaging with caterers
- 📊 Dashboard for service providers
- 🔔 Real-time notifications
- 📱 Responsive design for all devices

## Technologies Used

### Frontend
- React 18
- React Router DOM
- TanStack Query (React Query)
- React Hook Form
- Tailwind CSS with DaisyUI
- AOS (Animate On Scroll)
- Swiper.js
- React Icons
- React Toastify
- Firebase (for authentication and real-time database)

### Build Tools
- Vite
- ESLint
- PostCSS
- Autoprefixer

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Firebase account (for authentication and database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mdashraful24/quick-foods.git
   cd quick-foods
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `dev`: Start the development server
- `build`: Build the production version
- `lint`: Run ESLint to check for code issues
- `preview`: Preview the production build locally

## Project Structure

```
catering-connects/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable components
│   ├── contexts/         # React contexts
│   ├── firebase/         # Firebase configuration
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Page components
│   ├── routes/           # Application routes
│   ├── services/         # API services
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Community](https://reactjs.org/)
- [Vite Team](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)

## Screenshots

![Login Page](https://i.ibb.co/zHTxSnkK/Screenshot-2025-07-11-211359.png)
![]()
![]()

## Support

For support or questions, please email support@cateringconnects.com or open an issue on GitHub.