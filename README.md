# 📚 book_api_test

Backend & Frontend Technical Test

Project ini merupakan implementasi Fullstack sederhana menggunakan:

- ⚙️ Backend: Laravel (REST API)
- 💻 Frontend: React JS (Vite)
- 🗄️ Database: PostgreSQL

Struktur project:

```
book_api_test/
│
├── backend/    → Laravel REST API
└── frontend/   → React JS Application
```

---

# 🧰 REQUIREMENTS

Pastikan sudah terinstall:

- PHP ≥ 8.1
- Composer
- Node.js ≥ 18
- NPM atau Yarn
- PostgreSQL
- Git

Cek versi:

```bash
php -v
composer -v
node -v
npm -v
```

---

# 🚀 INSTALLATION GUIDE (STEP BY STEP)

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/book_api_test.git
cd book_api_test
```

---

# ⚙️ BACKEND SETUP (Laravel)

Masuk ke folder backend:

```bash
cd backend
```

---

## Step 1 — Install Dependencies

```bash
composer install
```

---

## Step 2 — Copy File Environment

Mac / Linux:

```bash
cp .env.example .env
```

Windows:

```bash
copy .env.example .env
```

---

## Step 3 — Generate Application Key

```bash
php artisan key:generate
```

---

## Step 4 — Konfigurasi Database

Buka file `.env`, lalu sesuaikan bagian berikut:

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=book_api
DB_USERNAME=postgres
DB_PASSWORD=
```

Pastikan kamu sudah membuat database dengan nama:

```
book_api
```

---

## Step 5 — Jalankan Migration

```bash
php artisan migrate
```

Jika ingin reset ulang:

```bash
php artisan migrate:fresh
```

---

## Step 6 — Jalankan Backend Server

```bash
php artisan serve
```

Backend akan berjalan di:

```
http://127.0.0.1:8000
```

API Base URL:

```
http://127.0.0.1:8000/api
```

⚠️ Jangan tutup terminal ini selama frontend digunakan.

---

# 💻 FRONTEND SETUP (React JS)

Buka terminal baru, lalu kembali ke root project:

```bash
cd ..
cd frontend
```

---

## Step 1 — Install Dependencies

```bash
npm install
```

atau jika menggunakan yarn:

```bash
yarn install
```

---

## Step 2 — Setup Environment Variable

Buat file `.env` di dalam folder frontend jika belum ada, lalu isi:

```
VITE_API_URL=http://127.0.0.1:8000/api
```

Pastikan URL sesuai dengan backend yang sedang berjalan.

---

## Step 3 — Jalankan Frontend

```bash
npm run dev
```

atau:

```bash
yarn dev
```

Frontend akan berjalan di:

```
http://localhost:5173
```

Buka URL tersebut di browser.

---

# 🔗 API ENDPOINTS

Base URL:

```
http://127.0.0.1:8000/api
```

| Method | Endpoint    | Deskripsi     |
| ------ | ----------- | ------------- |
| GET    | /books      | Get all books |
| POST   | /books      | Create book   |
| PUT    | /books/{id} | Update book   |
| DELETE | /books/{id} | Delete book   |

---

# 🧪 TESTING API (Optional)

Gunakan:

- Postman
- Insomnia
- Thunder Client (VS Code)

Contoh body POST:

```json
{
  "book_name": "Clean Code",
  "author": "Robert C. Martin",
  "description": "A Handbook of Agile Software Craftsmanship",
  "published_date": "2008-08-01"
}
```

---

# ⚠️ TROUBLESHOOTING

## Jika muncul error CORS:

Jalankan:

```bash
php artisan config:clear
php artisan cache:clear
```

Pastikan CORS sudah diaktifkan di Laravel.

---

## Jika migration gagal:

Pastikan:

- Database sudah dibuat
- Username & password benar
- MySQL service aktif

---

# 🏁 CARA MENJALANKAN PROJECT DARI AWAL (RINGKASAN CEPAT)

```bash
git clone https://github.com/your-username/book_api_test.git
cd book_api_test

# Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
# atur database di .env
php artisan migrate
php artisan serve

# Frontend (terminal baru)
cd ..
cd frontend
npm install
npm run dev
```

---

# 👨‍💻 PROJECT INFORMATION

Technical Test Fullstack  
Backend: Laravel REST API  
Frontend: React + Vite

Project ini dibuat untuk kebutuhan technical assessment backend & frontend developer.

---

# ✅ SELESAI

Jika semua step di atas berhasil, maka:

- Backend berjalan di http://127.0.0.1:8000
- Frontend berjalan di http://localhost:5173
- API sudah terhubung dengan benar
