# todo-list-app

Jelaskan apa itu REST API?
- Rest API adalah kepanjangan dari Representational State Transfer Application yang dimana REST API adalah sebuah arsitektur yang digunakan untuk komunikasi antara client dan server(backend). REST API menggunakan protokol HTTP untuk mengirim dan menerima data dalam format JSON atau XML. Rest API mempunyai beberapa method yaitu GET, POST, PUT, PATCH, dan DELETE. Masing2 method ini mempunyai tujuan yang berbeda.
Biasanya GET digunakan untuk mengambil data, POST digunakan untuk membuat data, PUT digunakan untuk mengupdate data, PATCH digunakan untuk mengupdate data tertentu, dan DELETE digunakan untuk menghapus data. Perbedaan antara PUT dan PATCH adalah metode PUT biasanya digunakan untuk mengupdate banyak data, sedangkan PATCH digunakan untuk mengupdate data tertentu.


Apa itu CORS dan bagaimana cara menanganinya di backend?
CORS (Cross-Origin Resource Sharing) adalah mekanisme keamanan di browser yang mengatur apakah suatu aplikasi web boleh mengakses resource dari origin yang berbeda. Jika tidak ada mekanisme ini, maka browser akan menolak akses resource dari origin yang berbeda. Karena ada aturan same-origin policy, browser hanya mengizinkan akses jika server mengirim header CORS yang sesuai, misalnya Access-Control-Allow-Origin. Di backend, CORS dapat ditangani dengan menambahkan konfigurasi seperti menambahkan headers Access-Control-Allow-Origin supaya ketika browser request dengan headers sutau headers dan backend menerima headers yang sesuai dengan konfigurasian maka browser dinyatakan boleh untuk mendapatkan resource dari origin tersebut, dengan analogy lain, client boleh untuk mengakses system backend.

Jelaskan perbedaan antara SQL dan NoSQL database
SQL (Structured Query Language) adalah relational database yang menyimpan data dalam bentuk schema yang terstruktur dan menggunakan bahasa SQL untuk meng query data. Sedangkan NoSQL adalah non-relational database yang mencakup beberapa model seperti key-value, document, column-family, dan graph. NoSQL database lebih fleksibel dan skalabel dibandingkan SQL database.
Database populer SQL yang sering digunakan adalah MySql dan PostgreSQL. Sedangkan database populer NoSQL yang sering digunakan adalah MongoDB dan Redis. Untuk decision making kapan kita harus memakai database SQL atau NoSQL, kita harus mempertimbangkan beberapa faktor seperti:

1. Struktur data yang akan disimpan. Jika data yang akan disimpan memiliki struktur yang kompleks dan relasional, maka SQL database lebih sesuai. Sedangkan jika data yang akan disimpan memiliki struktur yang tidak berstruktur, atau tidak beraturan, maka NoSQL database lebih sesuai.

2. Skalabilitas. SQL database lebih mudah di skalakan vertikal dibandingkan NoSQL database. Sedangkan NoSQL database lebih mudah di skalakan horizontal dibandingkan SQL database.

3. Keterbacaan dan penulisan query. SQL database memiliki keterbacaan dan penulisan query yang lebih mudah dibandingkan NoSQL database. Sedangkan NoSQL database memiliki keterbacaan dan penulisan query yang lebih kompleks.

Apa yang anda ketahui tentang middleware?
Middleware adalah fungsi yang dieksekusi di tengah-tengah alur request sebelum request masuk ke handler utama (biasanya controller). Middleware dapat digunakan untuk melakukan berbagai tugas seperti modifikasi data, logging, authentication, authorization, validasi dan hal lainnya.

Buat REST API sederhana untuk
A. register dan login user (gunakan JWT)
B. CRUD untuk tabel todos dengan field: id, title, description, is_done, user_id
C. Hanya user yang login boleh CRUD datanya sendiri
D. Pilihan database : MySql, MongoDB, PostgreSQL
E. Gunakan bahasa atau framework yang biasa anda gunakan



Untuk mengirim jawab, buat sebuah repository di github, buat readme.md untuk menulis jawaban yang membutuhkan keterangan seperti nomor 1 - 4. Untuk nomor 5, code bisa langsung gabungkan di repository yang sama.

Bagikan tautan repository ke email HRD. dengan format NAMA_TEST_NAGA


