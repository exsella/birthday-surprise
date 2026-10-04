# Birthday Surprise ♡

Website ulang tahun interaktif (Vue 3 + Vite).

## Menjalankan
```bash
npm install
npm run dev        # buka alamat yang tampil (juga bisa dari HP lewat Wi-Fi yang sama)
npm run build      # hasil di folder dist/, siap diunggah ke Netlify / Vercel / GitHub Pages
```

## Yang perlu kamu ganti
Semua teks ada di `src/data/birthday.js`: nama, usia, password (default `0510`), isi surat, caption, pesan akhir.

| Isi | Taruh di |
|---|---|
| Foto kenangan | `public/images/memories/` lalu ubah daftar `memories` di birthday.js |
| Musik | `public/music/birthday-song.mp3` |
| Video | `public/videos/our-story.mp4` |

Kalau musik/video belum ada, website tetap jalan dan menampilkan placeholder.
