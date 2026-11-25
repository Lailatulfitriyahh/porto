FOLDER SERTIFIKAT PORTOFOLIO LAILATUL FITRIYAH
=================================================

Cara Menambahkan Sertifikat Baru:
1. Masukkan file PDF sertifikat Anda ke dalam folder yang sesuai:
   - Untuk SMK: masukkan file PDF ke folder "assets/certificates/smk/"
   - Untuk Universitas: masukkan file PDF ke folder "assets/certificates/univ/"

2. Buka file "src/js/certificates.js"
3. Tambahkan nama sertifikat, tahun, dan nama file PDF pada daftar "CERTIFICATES_CONFIG".
   Contoh:
   {
     title: 'Sertifikat Nama Pelatihan Anda',
     year: '2024',
     file: 'assets/certificates/univ/nama-file-anda.pdf'
   }

Setiap institusi dapat menampung hingga maksimal 10 sertifikat.
