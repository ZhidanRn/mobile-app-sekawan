# React Native JSONPlaceholder App

Aplikasi React Native sederhana yang menggunakan API dari JSONPlaceholder untuk menampilkan daftar postingan dan detailnya.

## Fitur
- Menampilkan daftar postingan dari JSONPlaceholder.
- Melihat detail postingan.
- Menampilkan komentar terkait postingan.
- Menampilkan Photos dari Album.
- Menampilkan daftar user dan detail user.
- Navigasi antar halaman menggunakan Expo Router.

## Teknologi yang Digunakan
- React Native
- Expo
- Expo Router (untuk navigasi)
- Axios (untuk mengambil data dari API)
- JSONPlaceholder (sebagai API dummy)

## Instalasi
Pastikan Anda sudah menginstal Node.js dan Expo CLI.

1. Clone repositori ini:
``` bash
   git clone https://github.com/username/react-native-jsonplaceholder.git
   cd react-native-jsonplaceholder
```

2. Install dependencies:
```bash
   npm install
```

3. Jalankan aplikasi:
```bash
   npm start
```
## Download APK
Anda dapat mengunduh APK aplikasi ini melalui tautan berikut:
   https://expo.dev/artifacts/eas/vdJk6Rj9vU1fEMtWAyXNUA.apk

## Screenshot
### Light Mode

![Light Mode](/assets/images/light.png)

### Dark Mode

![Dark Mode](/assets/images/dark.png)

<div style="display: flex;">
  <img src="/assets/images/demoApp/1.1.jpg" width="200">
  <img src="gambar2.jpg" width="200">
</div>

## API Endpoint
Aplikasi ini menggunakan API dari JSONPlaceholder:
- Daftar Postingan: https://jsonplaceholder.typicode.com/posts
- Detail Postingan: https://jsonplaceholder.typicode.com/posts/{id}
- Komentar Postingan: https://jsonplaceholder.typicode.com/posts/{id}/comments
- Photos dari Album: https://jsonplaceholder.typicode.com/albums/{albumId}/photos
- Daftar Album: https://jsonplaceholder.typicode.com/albums
- Daftar User: https://jsonplaceholder.typicode.com/users
- Detail User: https://jsonplaceholder.typicode.com/users/{id}