# API To-Do List

API ini memungkinkan pengguna untuk mengelola daftar tugas (to-do list) dan item checklist dengan mudah. API ini mendukung autentikasi pengguna, pembuatan, pembaruan, dan penghapusan checklist serta item-itemnya.

## Fitur

- **Autentikasi Pengguna**
  - Daftar pengguna baru.
  - Login untuk mendapatkan token Bearer untuk akses yang aman.
- **Manajemen Checklist**
  - Membuat, mendapatkan, dan menghapus checklist.
- **Manajemen Item Checklist**
  - Menambahkan, memperbarui, mengganti nama, dan menghapus item checklist.
  - Mengubah status item checklist (selesai/belum selesai).

## Dokumentasi API

Dokumentasi API Swagger tersedia di: `/api-docs`

---

## Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/your-repo/todolist-api.git
   cd todolist-api
   
2. Instal dependensi:
   ```bash
   npm install
   
3. Buat file `.env`:
   ```bash
   PORT=5000
   MONGODB_URI=<mongodb_uri>
   JWT_SECRET=<secret>
   
3. Jalankan server:
   ```bash
   npm start
   
