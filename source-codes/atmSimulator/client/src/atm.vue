<template>
    <header>
        <h1>ATM</h1>
    </header>

    <div class="page">
        <div class="atm-container" :class="{ 'shake': isError }">

            <div class="screen">
                <div class="screen-content">
                    <p>{{ displayText }}<span class="cursor"></span></p>
                </div>
            </div>

            <div class="button-border">
                <div class="info-plate">SİSTEM ŞİFRESİ: 1234</div>

                <div class="button-grid">
                    <button @click="pressKey('1')">1</button>
                    <button @click="pressKey('2')">2</button>
                    <button @click="pressKey('3')">3</button>
                    <button id="cancel" @click="handleCancel">İPTAL</button>

                    <button @click="pressKey('4')">4</button>
                    <button @click="pressKey('5')">5</button>
                    <button @click="pressKey('6')">6</button>
                    <button id="clear" @click="handleClear">TEMİZLE</button>

                    <button @click="pressKey('7')">7</button>
                    <button @click="pressKey('8')">8</button>
                    <button @click="pressKey('9')">9</button>
                    <button id="enter" @click="handleEnter">GİRİŞ</button>

                    <div class="zero-row">
                        <button id="zero" @click="pressKey('0')">0</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer">
        <p>© 2026 Banka Simülasyonu | Geliştiren: Güray Topağaç</p>
    </footer>
</template>

<script setup>
    import { ref, watch, onMounted } from "vue";
    import axios from "axios";

    const correctPassword = "1234";
    const balance = ref(null);
    const stage = ref("card");
    const screenText = ref("Lütfen Kartınızı Takınız...\n\nArdından giriş tuşuna basınız.");
    const displayText = ref("");
    const enteredPassword = ref("");
    const amountInput = ref("");
    const selectedOption = ref("");
    const withdrawMode = ref(false);
    const depositMode = ref(false);
    const waitingForEnterToReturn = ref(false);
    const isError = ref(false);

    let typingInterval = null;

    async function loadBalance() {
        try {
            const res = await axios.get("/api/atm/balance");
            balance.value = res.data.balance;
        } catch (err) {
            console.error("Balance alınamadı", err);
            screenText.value = "Sistem hatası.\nLütfen daha sonra tekrar deneyiniz.";
        }
    }

    function typeEffect(text) {
        if (typingInterval) clearInterval(typingInterval);
        displayText.value = "";
        let i = 0;
        typingInterval = setInterval(() => {
            if (i < text.length) {
                displayText.value += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 20);
    }

    watch(screenText, (newVal) => {
        if (stage.value === "password" || withdrawMode.value || depositMode.value) {
            if (typingInterval) clearInterval(typingInterval);
            displayText.value = newVal;
        } else {
            typeEffect(newVal);
        }
    });

    onMounted(() => typeEffect(screenText.value));

    function pressKey(key) {
        if (stage.value === "card") return;

        if (stage.value === "password") {
            if (enteredPassword.value.length < 4) {
                enteredPassword.value += key;
                screenText.value = "Şifrenizi giriniz:\n\n" + "* ".repeat(enteredPassword.value.length);
            }
            return;
        }

        if (withdrawMode.value || depositMode.value) {
            amountInput.value += key;
            screenText.value = `Tutar: ${amountInput.value} TL\n\nGİRİŞ tuşuna basınız.`;
            return;
        }

        if (stage.value === "menu" && !waitingForEnterToReturn.value && key >= "1" && key <= "4") {
            selectedOption.value = key;
            const map = { "1": "Bakiye", "2": "Para Yatırma", "3": "Para Çekme", "4": "Çıkış" };
            screenText.value = `Seçiminiz: ${map[key]}\n\nDevam etmek için GİRİŞ tuşuna basınız.`;
        }
    }

    function handleEnter() {
        if (stage.value === "card") {
            stage.value = "password";
            enteredPassword.value = "";
            screenText.value = "Şifrenizi giriniz:\n\n";
            return;
        }

        if (stage.value === "password") {
            if (enteredPassword.value === correctPassword) {
                screenText.value = "Şifre doğrulandı.\n\nLütfen bekleyiniz...";
                setTimeout(showMenu, 1000);
            } else {
                triggerError("HATALI ŞİFRE!\n\nTekrar deneyiniz.");
                enteredPassword.value = "";
            }
            return;
        }

        choice();
    }

    function triggerError(msg) {
        screenText.value = msg;
        isError.value = true;
        setTimeout(() => { isError.value = false; }, 400);
    }

    function handleCancel() {
        if (stage.value === "card") return;
        resetATM();
        screenText.value = "İşlem iptal edildi.\n\nLütfen kartınızı alınız.";
    }

    function handleClear() {
        if (stage.value === "password") {
            enteredPassword.value = enteredPassword.value.slice(0, -1);
            screenText.value = "Şifrenizi giriniz:\n\n" + "* ".repeat(enteredPassword.value.length);
        } else if (withdrawMode.value || depositMode.value) {
            amountInput.value = amountInput.value.slice(0, -1);
            screenText.value = `Tutar: ${amountInput.value} TL\n\nGİRİŞ tuşuna basınız.`;
        }
    }

    function choice() {
        async function withdraw(amount) {
            try {
                const res = await axios.post("/api/atm/withdraw", { amount });
                balance.value = res.data.balance;
                screenText.value = `İşlem Başarılı.\nKalan: ${balance.value} TL\n\nMenüye dönmek için girişe basınız.`;
            } catch (err) {
                triggerError(err.response?.data?.error || "İşlem başarısız");
            }
        }

        async function deposit(amount) {
            try {
                const res = await axios.post("/api/atm/deposit", { amount });
                balance.value = res.data.balance;
                screenText.value = `İşlem Başarılı.\nYeni Bakiye: ${balance.value} TL\n\nMenüye dönmek için girişe basınız.`;
            } catch (err) {
                triggerError(err.response?.data?.error || "İşlem başarısız");
            }
        }

        if (withdrawMode.value) {
            const amount = Number(amountInput.value);
            if (!amount || amount > balance.value) {
                triggerError("Yetersiz bakiye!\n\nMenüye dönmek için girişe basınız.");
                withdrawMode.value = false;
                waitingForEnterToReturn.value = true;
                return;
            }
            withdraw(amount);
            withdrawMode.value = false;
            waitingForEnterToReturn.value = true;
            amountInput.value = "";
            return;
        }

        if (depositMode.value) {
            const amount = Number(amountInput.value);
            if (!amount) {
                triggerError("Geçersiz tutar!\n\nMenüye dönmek için girişe basınız.");
                depositMode.value = false;
                waitingForEnterToReturn.value = true;
                return;
            }
            deposit(amount);
            depositMode.value = false;
            waitingForEnterToReturn.value = true;
            amountInput.value = "";
            return;
        }

        if (waitingForEnterToReturn.value) { showMenu(); return; }

        if (selectedOption.value === "1") {
            screenText.value = `Bakiyeniz: ${balance.value} TL\n\nMenüye dönmek için girişe basınız.`;
            waitingForEnterToReturn.value = true;
        } else if (selectedOption.value === "2") {
            depositMode.value = true;
            amountInput.value = "";
            screenText.value = "Yatırmak istediğiniz tutarı tuşlayınız:\n\n0 TL";
        } else if (selectedOption.value === "3") {
            withdrawMode.value = true;
            amountInput.value = "";
            screenText.value = "Çekmek istediğiniz tutarı tuşlayınız:\n\n0 TL";
        } else if (selectedOption.value === "4") {
            screenText.value = "Çıkış yapılıyor...\n\nİyi günler dileriz.";
            setTimeout(resetATM, 2000);
        }
    }

    async function showMenu() {
        await loadBalance();

        stage.value = "menu";
        selectedOption.value = "";
        withdrawMode.value = false;
        depositMode.value = false;
        waitingForEnterToReturn.value = false;
        screenText.value =
            "=== ATM MENÜ ===\n" +
            "1 - Bakiye Görüntüleme\n" +
            "2 - Para Yatırma\n" +
            "3 - Para Çekme\n" +
            "4 - Çıkış";
    }

    function resetATM() {
        stage.value = "card";
        enteredPassword.value = "";
        amountInput.value = "";
        selectedOption.value = "";
        withdrawMode.value = false;
        depositMode.value = false;
        waitingForEnterToReturn.value = false;
        screenText.value = "Lütfen Kartınızı Takınız...\n\nArdından giriş tuşuna basınız.";
    }
</script>

<style src="./atm.css"></style>