# 📚 Book Finder

**Book Finder** is a full-stack web application that allows users to **search, explore, and view book details** using the **Google Books API**.  
The system is built with a **Flask backend** and a **React (Vite)** frontend - designed for **clarity, performance, and modern UX**.

---

##  Overview

Book Finder provides a seamless book search experience:
- Secure user authentication with Firebase.
- Real-time search powered by Google Books.
- Elegant, responsive UI with Material UI (MUI) and custom CSS fine-tuning.
- Smooth animations, consistent theming, and accessibility in design.

---

##  System Architecture

Below is a summary of the main technologies and their roles:


| Layer             | Technology                                 | Description                                                                    |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------------------------ |
| **Backend (API)** | Flask, Flask-CORS, Flask-Limiter, Requests | RESTful API integrating with Google Books, includes caching and rate limiting. |
| **Frontend (UI)** | React (Vite), Material UI, Axios           | Search interface with authentication and animated components.                  |
| **Testing**       | Pytest, unittest.mock                      | Automated unit and integration tests.                                          |
| **API**           | Google Books API                           | External data source for book search and details.                              |



---

##  Core Features

### 🔹 Backend
- **Google Books API integration** - retrieves and normalizes book data (title, authors, cover, description).
- **Caching layer** - reduces repeated external API calls with TTL-based caching.
- **Rate limiting** - IP-based throttling to prevent abuse.
- **Structured error handling** - centralized error responses with user-friendly messages.
- **Clean architecture** - separated into `core`, `services`, and `routers` for maintainability.
- **Unit and integration tests** - implemented using `pytest` and mocks.

### 🔹 Frontend
- **Authentication (Firebase)** - Sign up, Sign in, Password reset.
- **Protected routes** - User must be authenticated to access main pages.
- **Search experience** - Query books by title, author, or keyword.
- **Responsive design** - Fully optimized for mobile and desktop layouts.
- **Custom MUI theme** - Consistent color palette, typography, spacing, and hover effects.
- **Elegant UI details** - Subtle shadows, transitions, glassmorphism effects, and smooth interactions.

---

##  Design & Theme

The interface is built with **Material UI (MUI)** as the foundation, combined with **custom CSS** for visual refinement and micro-interactions.  
The design focuses on simplicity, clarity, and consistency across all components.

Core UI behaviors such as hover transitions, blur effects, and responsive layouts are implemented through a blend of **MUI theming** and **custom class-based styling**, maintaining a clean, modern appearance while ensuring accessibility and usability.


---


##  **Frontend Structure**

```
frontend/
│
├── src/
│   ├── api/                # Axios clients & API calls
│   ├── app/                # React Query configuration
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Spinner, Alerts, FormContainer, BooksGrid
│   ├── hooks/              # Custom hooks (useAuth)
│   ├── pages/              # App pages (SignIn, SignUp, Results, etc.)
│   ├── services/           # Auth & Firebase services
│   ├── theme/              # MUI theme customization
│   ├── assets/             # Static assets (placeholder image)
│   │   └── placeholderCover.png # Default cover for books with no image
│   ├── firebase.js         # Firebase config
│   ├── App.jsx             # Main route structure
│   ├── main.jsx            # Entry point
│   ├── index.css           # Global styles
│   └── ...
│
└── public/
    └── favicon.ico         # Book logo favicon
```

---

##  Backend Structure


```

backend/
│
├── app/
│   ├── core/               # Config, caching, error handling
│   ├── routers/            # Flask route definitions
│   ├── services/           # Business logic (Google Books)
│   ├── extensions.py       # CORS, Limiter, Logger setup
│   └── main.py             # Entry point
│
├── tests/                  # Unit & integration tests
└── requirements.txt

```
---

##  Authentication Flow

1. **User signs up** with name, email, and password → handled via Firebase Auth SDK.  
2. **Session persistence** (`browserLocalPersistence`) ensures users remain logged in after refresh.  
3. **Protected routes** automatically redirect unauthenticated users to `/signin`.  
4. **Forgot password** allows email-based password reset with built-in Firebase support.

---

##  Search Flow

1. User types a query in the **hero search bar**.  
2. Request sent via Axios to Flask endpoint `/api/books/search?q=...`.  
3. Flask calls Google Books API, normalizes response, and caches it.  
4. React Query updates state and re-renders results grid.  
5. Clicking a book opens a **Book Details page**, with description, author, and cover image.

---

##  API Endpoints

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/health` | GET | Server health check |
| `/api/books/search?q=python` | GET | Search books by keyword |
| `/api/books/<id>` | GET | Fetch book details by ID |

---

##  Environment Variables

### 🔸 Backend `.env`
```env
ENV=dev
GOOGLE_BOOKS_BASE_URL=https://www.googleapis.com/books/v1
REQUEST_TIMEOUT=10
CORS_ORIGINS=http://localhost:5173
```

### 🔸 Frontend `.env`

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
VITE_FB_API_KEY=your_firebase_api_key
VITE_FB_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FB_PROJECT_ID=your_firebase_project_id
VITE_FB_APP_ID=your_firebase_app_id
```

---

##  Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/CohenNaama/book-finder.git
cd book-finder
```

### 2️⃣ Backend setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate      # (Windows)
pip install -r requirements.txt
python -m app.main
```

**Server runs at:**
➡️ [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

### 3️⃣ Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

**Frontend runs at:**
➡️ [http://localhost:5173](http://localhost:5173)

---


## Testing

Run backend tests with:

```bash
pytest -v
```

**Tests include:**

* Unit tests for caching, Google Books services, and data serialization.
* Integration tests for Flask routes using a test client fixture.
* Mocked external API calls for isolated, reliable testing.

Configuration is managed via `pytest.ini` for verbosity and path setup.

Example output on success:

```
tests/test_books.py::test_clean_description_removes_html PASSED
tests/test_books.py::test_search_books_returns_serialized PASSED
tests/test_routes.py::test_health_endpoint PASSED
tests/test_routes.py::test_search_books_endpoint PASSED
```

All tests pass successfully ✅


---

##  Development Guidelines

* Follow **PEP8** (Python) and **ESLint** (JavaScript) conventions.
* Keep components **small, pure, and reusable**.
* Maintain **clean commits** (`feat:`, `fix:`, `docs:`, `style:`, `test:`).
* Avoid committing `.env`, build files, or virtual environments.

---

## Design Philosophy

The frontend design focuses on clarity, consistency, and ease of use.  
It combines Material UI’s theming with lightweight custom CSS for smooth interaction and clean presentation,  
keeping the interface simple, accessible, and user-friendly.

---

##  Deployment (Optional)

The system can be deployed as:

* **Flask backend →** Render / Railway / Heroku
* **React frontend →** Netlify / Vercel

CORS setup ensures seamless API ↔ client communication.

---

##  Project Status

| Layer           | Status      | Notes                       |
| --------------- | ----------- | --------------------------- |
| **Backend**     | ✅ Complete  | Fully tested & documented   |
| **Frontend**    | ✅ Complete  | Auth, UI, search, routing   |
| **Design & UX** | ✅ Finalized | Theme + custom CSS tuned    |
| **Testing**     | ✅ Complete  | Pytest suite successful |
| **Deployment**  | ⚙️ Ready    | Environment-ready structure |


---
