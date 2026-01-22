<template>
    <header>Dostum Diyen Asal Sayı Kontrolcüsü</header>

    <div class="page">
        <div class="inputBox">
            <input type="text" v-model="inputValue" placeholder="Merak ettiğin sayı" @keyup.enter="checkFormat" />
        </div>

        <div id="bttn">
            <button id="primeButton" @click="checkFormat">
                Asal mı?
            </button>
        </div>

        <div class="screen">
            <p id="screenMessage">{{ screenMessage }}</p>
        </div>
    </div>

    <footer>© 2026 Dostum Diyen Asal Sayı Kontrolcüsü | Geliştiren: Güray Topağaç</footer>
</template>

<script setup>
    import { ref } from "vue";

    const inputValue = ref("");
    const screenMessage = ref(
        "Dostum bana bir asal sayı ver. Kimse beni uzun zamandır çalıştırmıyor."
    );

    function checkFormat() {
        const number = Number(inputValue.value);

        if (inputValue.value.trim() === "" || isNaN(number)) {
            screenMessage.value =
                "Dostum bu bir sayı bile değil??\nBana düzgün bir sayı vermelisin.";
            return;
        }

        if (!Number.isInteger(number)) {
            screenMessage.value =
                "Dostum sence ondalıklı bir sayı asal olabilir mi??\nSadece bir soru.";
            return;
        }

        if (number <= 1) {
            screenMessage.value =
                "Dostum 1 ve 1'den küçük sayılar asal değildir.";
            return;
        }

        checkPrime(number);
    }

    function checkPrime(number) {
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                screenMessage.value =
                    `Dostum ${number} asal bir sayı değildir.\n` +
                    `Çünkü ${i} sayısına tam bölünür.\n` +
                    `${i} x ${number / i} = ${number}\n` +
                    "Yeni bir işlem yapmak istersen buradayım Dostum.";
                return;
            }
        }

        screenMessage.value =
            `Dostum ${number} bir asal sayıdır.\n` +
            "Yeni bir işlem yapmak istersen buradayım Dostum.";
    }
</script>

<style src="./primeNumber.css"></style>