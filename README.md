# Next.js Haiku CRUD Application with Authentication

A full-stack application built with Next.js 14 that allows users to create, read, update, and delete haikus with authentication, featuring a clean UI powered by DaisyUI and Tailwind CSS.

## Features

- User registration and authentication
- Create, read, update, and delete haikus
- Form validation with syllable counting
- Success notifications using toast messages
- Protected routes and user-specific content
- MongoDB database integration
- Responsive UI with DaisyUI components

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
│   ├── userController.js    # Server actions for auth
│   └── haikuController.js   # Server actions for haiku CRUD
├── app/
│   ├── login/              # Login page
│   ├── edit-haiku/        # Edit haiku page
│   ├── globals.css        # Global styles
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Home page
├── components/
│   ├── Header.jsx         # Navigation header
│   ├── Dashboard.jsx      # User's haiku dashboard
│   ├── RegisterForm.jsx   # Registration form
│   └── HaikuForm.jsx      # Haiku inputs
└── lib/
    ├── db.js             # MongoDB connection
    └── getUser.js        # User authentication utilities
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

- **Haiku Management:**
  - Create new haikus with syllable validation
  - Edit existing haikus
  - Delete haikus
  - View all haikus in a personal dashboard
  - Basic punctuation and alphanumeric validation

- **UI/UX:**
  - Clean, modern interface with DaisyUI
  - Responsive design
  - Form validation feedback
  - Success/error notifications using toast messages
  - User-friendly dashboard layout

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
