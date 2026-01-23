# 🎓 Staj Final Projeleri

[![Proje Önizleme](https://github.com/user-attachments/assets/efea5241-9197-4c8a-8c2f-40770da76188)](https://guray-topagac.onrender.com)

<p align="center">
  <kbd>✨ Görsele tıklayarak canlı demoyu inceleyebilirsiniz.</kbd>
</p>

---

## 🔗 Hızlı Erişim

| 🌐 Canlı Website | 📂 Kaynak Kodlar |
| :--- | :--- |
| [guray-topagac.onrender.com](https://guray-topagac.onrender.com) | [GitHub Repository](https://github.com/guraytopagac/internship-final-projects) |

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
---

## 🛠 Kullanılan Teknolojiler

| Kategori | Teknolojiler |
| :--- | :--- |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) |
| **Frontend** | ![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) |
| **Veritabanı** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) |
| **Paket Yönetimi** | ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) |
| **Dağıtım** | ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) |

---
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
