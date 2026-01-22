## Proje Kurulumu

Bu proje, Vue 3 + Vite ile geliştirilmiş bir web uygulamasıdır ve Express.js üzerinden çalıştırılmaktadır. Uygulamayı çalıştırmak için öncelikle projeyi **statik hale getirmeniz** gerekir.

### Adımlar:

1. **Frontend’i derleyin (statik dosya üretimi):**

```sh
cd atmSimulator/client
npm install
npm run build

Bu işlem, dist/ klasöründe statik dosyaları oluşturur.

2. Statik dosyaları Express sunucusuna taşıyın:

dist/ klasöründeki tüm dosyaları server/public/ klasörünün içine kopyalayın.

3. Express sunucusunu çalıştırın:

cd atmSimulator/server
node server.js