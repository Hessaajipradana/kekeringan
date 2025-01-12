# 🌱 Aplikasi Monitoring Kekeringan

[![Status Lisensi](https://img.shields.io/badge/lisensi-MIT-blue.svg)](LICENSE)
[![Terbuka untuk PR](https://img.shields.io/badge/PR-diterima-brightgreen.svg)](CONTRIBUTING.md)
[![Dibuat dengan Cinta](https://img.shields.io/badge/Dibuat%20dengan-❤️-red.svg)](https://github.com/namakamu)

> 📊 Solusi modern untuk pemantauan dan pelaporan kekeringan berbasis web

## ✨ Fitur Unggulan

🔐 **Sistem Autentikasi**
- Sistem Masuk & Daftar
- Autentikasi JWT
- Rute Terproteksi

📝 **Pengelolaan Laporan**
- Operasi CRUD
- Penyaringan tingkat kekeringan
- Lokasi berbasis koordinat
- Unggah gambar (opsional)

🎨 **Antarmuka Modern**
- Desain responsif
- Notifikasi toast
- Status loading
- Penanganan kesalahan
- Konfirmasi tindakan

## 🚀 Mulai Cepat

### Penyiapan Frontend

```bash
# Masuk ke direktori frontend
cd frontend

# Pasang dependensi
npm install

# Buat file .env
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Jalankan aplikasi
npm run dev
```

### Penyiapan Backend

```bash
# Masuk ke direktori backend
cd backend

# Pasang dependensi
npm install

# Buat file .env
cat << EOF > .env
PORT=5000
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/monitoring-kekeringan
JWT_SECRET=rahasiakunci123
NODE_ENV=development
EOF

# Jalankan server
npm start
```

## 🏗️ Struktur Aplikasi

```plaintext
aplikasi-kekeringan/
├── 🎨 frontend/          # React + Vite
└── ⚙️ backend/           # Express.js + MongoDB
```

### Struktur Frontend

```plaintext
frontend/
├── src/
│   ├── 🧩 components/    # Komponen React
│   ├── 🛠️ lib/          # Utilitas
│   ├── 📄 pages/        # Halaman utama
│   └── 🏪 store/        # State Redux
```

### Struktur Backend

```plaintext
backend/
├── 📊 models/           # Model MongoDB
├── 🛣️ routes/          # Rute API
└── 🚀 server.js        # Titik masuk
```

## 🔌 Endpoint API

### 🔐 Autentikasi

```plaintext
POST /api/pengguna/daftar    # Pendaftaran
POST /api/pengguna/masuk     # Masuk
GET  /api/pengguna/profil    # Ambil profil
```

### 📝 Laporan

```plaintext
GET    /api/laporan          # Ambil semua
POST   /api/laporan          # Buat baru
PUT    /api/laporan/:id      # Perbarui
DELETE /api/laporan/:id      # Hapus
```

## 🎮 Perintah Penting

```bash
# 🎨 Frontend
npm run dev        # Mode pengembangan
npm run build      # Build produksi
npm run preview    # Pratinjau build

# ⚙️ Backend
npm start          # Jalankan server
npm run dev        # Mode pengembangan
```

## 🛡️ Keamanan

- ✅ Autentikasi JWT
- 🔒 Enkripsi Kata Sandi
- 🚧 Pembatasan Rate
- 🧹 Sanitasi Input
- 🛡️ Proteksi XSS
- 🔰 Proteksi CSRF

## 🚧 Pemecahan Masalah

### Masalah Frontend

**🔴 Error CORS**
1. Periksa `VITE_API_URL` di `.env`
2. Verifikasi pengaturan proxy di `vite.config.js`

**🔴 Error Autentikasi**
1. Periksa token di localStorage
2. Cek format header Authorization

### Masalah Backend

**🔴 Koneksi MongoDB**
1. Validasi `MONGODB_URI` di `.env`
2. Periksa whitelist IP di MongoDB Atlas

**🔴 Masalah JWT**
1. Verifikasi `JWT_SECRET` di `.env`
2. Cek masa berlaku token

## 🎯 Rencana Pengembangan

- [ ] 📸 Unggah gambar laporan
- [ ] 📊 Ekspor ke Excel/PDF
- [ ] 📈 Visualisasi data
- [ ] 🗺️ Integrasi peta
- [ ] 🔔 Notifikasi real-time

## 🤝 Kontribusi

Kontribusi adalah yang membuat komunitas open source menjadi tempat yang luar biasa untuk belajar, menginspirasi, dan berkreasi. Setiap kontribusi yang Anda berikan akan sangat dihargai.

1. Fork Proyek ini
2. Buat Branch Fitur (`git checkout -b fitur/FiturKeren`)
3. Commit Perubahan (`git commit -m 'Menambah FiturKeren'`)
4. Push ke Branch (`git push origin fitur/FiturKeren`)
5. Buka Pull Request

## 📝 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## 📬 Kontak

Nama Anda - [@twitteranda](https://twitter.com/twitteranda) - email@contoh.com

Link Proyek: [https://github.com/namakamu/aplikasi-kekeringan](https://github.com/namakamu/aplikasi-kekeringan)

---


  
  ⭐ Beri kami bintang di GitHub — ini sangat membantu!
  
  Dibuat dengan ❤️ di Indonesia oleh hesa aji pradana 
