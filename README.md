![Proje Ekran Görüntüsü](https://github.com/user-attachments/assets/efea5241-9197-4c8a-8c2f-40770da76188)

# 🎓 Staj Final Projeleri

Bu repository, staj sürecim boyunca geliştirdiğim web projelerini içermektedir. Projeler **Node.js** ve **Express.js** kullanılarak geliştirilmiş, istemci tarafındaki statik dosyalar `public/` klasörü altında yapılandırılmıştır.

Tüm projeler hem **masaüstü** hem de **mobil cihazlar** için uyumlu hâle getirilmiş ve canlı ortamda yayınlanmıştır.

🌐 **Canlı Website:**  
https://guray-topagac.onrender.com

📂 **GitHub Repository:**  
https://github.com/guraytopagac/internship-final-projects

---

## ⚡ Proje Hakkında

Bu çalışma kapsamında, staj süresince geliştirilen tüm projeler tek bir Express sunucusu altında toplanmıştır. Her proje bağımsız olacak şekilde tasarlanmış, kullanıcı deneyimi ve responsive (mobil uyumlu) arayüz ön planda tutulmuştur.

Kaynak kodların daha rahat incelenebilmesi için:
- Çalışan (build edilmiş) dosyalar `public/` klasöründe,
- Ham (build edilmemiş) kaynak kodlar `source-codes/` klasöründe tutulmuştur.

---


## 🗂 Proje Dosya Yapısı

```bash
internship-final-projects/
├── public/                # Statik HTML, CSS ve JavaScript dosyaları
├── source-codes/          # Projelerin ham (build edilmemiş) kaynak kodları
│                           # Her proje kendi içinde bağımsızdır
├── package.json           # Proje bağımlılıkları ve scriptler
├── package-lock.json      # Kilitli bağımlılık versiyonları
├── server.js              # Express.js sunucu dosyası
└── README.md              # Proje dokümantasyonu
```


## 🛠 Kullanılan Teknolojiler


### Backend
- Node.js
- Express.js

### Frontend
- Vue.js
- HTML
- CSS
- JavaScript

### Paket Yönetimi
- NPM

### Dağıtım
- Render.com

## 🗄 Veritabanı Yapılandırması

Bu projede MongoDB kullanılmaktadır.

Projeyi çalıştırmadan önce:

1. Proje kök dizininde `.env` dosyası oluşturun
2. `.env.example` dosyasını referans alarak aşağıdaki değişkeni tanımlayın:

   ATM_DB_URI=BURAYA_KENDI_MONGODB_ATLAS_ADRESINIZI_YAZIN

3. MongoDB servisinin çalıştığından emin olun

> Not: `.env` dosyası güvenlik nedeniyle repository’e eklenmemiştir.

## 🚀 Kurulum ve Çalıştırma

1. Repository’yi klonlayın:
   
   ```bash
   git clone https://github.com/guraytopagac/internship-final-projects.git
   
2. Proje dizinine girin:
   
   ```bash
   cd internship-final-projects

3. Gerekli bağımlılıkları yükleyin:
   
   ```bash
   npm install

4. Sunucuyu başlatın:
   
   ```bash
   node server.js

5. Tarayıcıdan projeyi görüntüleyin:
   
   ```bash
   http://localhost:3000
