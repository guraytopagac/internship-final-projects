<template>
    <header>
        <b>Staj Sonu Final Projelerim</b>
    </header>
    <div class="page">
        <div class="button-row" v-for="(row, index) in rows" :key="index">
            <button v-for="project in row" :key="project.title" @click="openProject(project.path)" class="project-card">
                <div class="icon">{{ project.icon }}</div>
                <div class="title">{{ project.title }}</div>
                <div class="desc">{{ project.desc }}</div>
            </button>
        </div>
    </div>

    <footer>
        © 2026 Staj Sonu Final Projelerim | Geliştiren: Güray Topağaç
    </footer>
</template>

<script setup>
    const projects = [
        { title: "ATM Simülasyonu", path: "/atm", icon: "🏦", desc: "Para yatırma, çekme ve bakiye görüntüleme işlemlerini içeren ATM sistemi" },
        { title: "Başardım mı?", path: "/basardimmi", icon: "📝", desc: "Üniversite ortalaması hesaplayan sistem" },
        { title: "Bunu Mu Arıyordun?", path: "/bunumuariyordun", icon: "🛒", desc: "Ürünleri isme ve kategoriye göre filtreleyen sistem" },
        { title: "Dostum Diyen Asal Sayı Kontrolcüsü", path: "/asal", icon: "🔢", desc: "Girilen sayının asal olup olmadığını analiz eden sistem" },
        { title: "Döviz Dönüştürücü", path: "/doviz", icon: "💱", desc: "Güncel kur mantığıyla döviz hesaplayan sistem" },
        { title: "Akaryakıt Otomasyonu", path: "/akaryakit", icon: "⛽", desc: "Yakıt satış ve fişleme işlemlerini yöneten sistem" },
        { title: "Kitabım Nerede?", path: "/kitap", icon: "📚", desc: "Kitapların yerini bulan sistem" },
        { title: "Ne Yesem?", path: "/neyesem", icon: "🍝", desc: "Yemek tariflerini filtreleyen sistem" },
        { title: "Oyun Delisi", path: "/oyun", icon: "🎮", desc: "Sevdiğim oyunları listeleyen kişisel oyun arşivi" },
    ];

    const rows = [
        projects.slice(0, 3),
        projects.slice(3, 6),
        projects.slice(6, 9),
    ];

    function openProject(path) {
        window.open(path, "_blank");
    }
</script>