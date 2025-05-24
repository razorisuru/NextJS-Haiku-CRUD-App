# Next.js Authentication System with DaisyUI

A modern authentication system built with Next.js 14, featuring a clean UI powered by DaisyUI and Tailwind CSS, with MongoDB as the database backend.

## Features

- User registration with validation
- Secure login system
- JWT-based authentication
- HTTP-only cookie session management
- MongoDB database integration
- Responsive UI with DaisyUI components
- Form validation and error handling

## Tech Stack

- **Frontend:**
  - Next.js 14
  - React 18
  - Tailwind CSS
  - DaisyUI
- **Backend:**

  - Next.js Server Actions
  - MongoDB
  - bcrypt for password hashing
  - JSON Web Tokens (JWT)

- **Database:**
  - MongoDB

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/razorisuru/NextJS-Haiku-CRUD-App
cd daisy-login
```

2. Install dependencies:

```bash
npm install
```

3. Copy the `.env.example` file as `.env` in the root directory with the variables:

```env
copy .env.example .env
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── actions/
│   └── userController.js    # Server actions for auth
├── app/
│   ├── login/              # Login page
│   ├── globals.css         # Global styles
│   ├── layout.jsx         # Root layout
│   └── page.jsx          # Home page
├── components/
│   ├── Header.jsx        # Navigation header
│   └── RegisterForm.jsx  # Registration form
└── lib/
    ├── db.js            # MongoDB connection
    └── getUser.js       # User authentication utilities
```

## Features in Detail

- **User Registration:**

  - Username validation (alphanumeric, 3-30 characters)
  - Password requirements (minimum 8 characters)
  - Duplicate username checking
  - Secure password hashing

- **Authentication:**

  - JWT-based authentication
  - Secure HTTP-only cookies
  - Protected routes
  - Automatic redirects

- **UI/UX:**
  - Clean, modern interface with DaisyUI
  - Responsive design
  - Form validation feedback
  - Success/error notifications

## Environment Variables

```env
CONNECTIONSTRING=      # MongoDB connection string
JWTSECRET=            # Secret key for JWT signing
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [package.json](package.json) file for details.
