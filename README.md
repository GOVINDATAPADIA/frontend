# Frontend Application

React-based frontend with landing page and admin panel.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Configure `.env` file

3. Start development server:
```bash
npm start
```

Build for production:
```bash
npm run build
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production, update this to your deployed backend URL.

## Pages

### Landing Page (/)
- Hero section
- Projects display
- Client testimonials
- Contact form
- Newsletter subscription

### Admin Panel (/admin)
- Add/manage projects
- Add/manage clients
- View contact submissions
- View newsletter subscriptions

## Features

- Responsive design
- Form validation
- Image upload with preview
- Real-time feedback
- Clean and modern UI

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Folder Structure

```
src/
├── pages/
│   ├── LandingPage.js
│   ├── LandingPage.css
│   ├── AdminPanel.js
│   └── AdminPanel.css
├── services/
│   └── api.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## Styling

The application uses vanilla CSS with a modern color scheme:
- Primary: #667eea
- Secondary: #764ba2
- Background: #f8f9fa

All components are fully responsive and mobile-friendly.
