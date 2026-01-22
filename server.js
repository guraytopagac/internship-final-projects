require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "public");

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

mongoose.connect(process.env.ATM_DB_URI)
    .then(() => console.log("ATM DB Bağlandı"))
    .catch(err => console.log("MongoDB Hatası:", err));

const accountSchema = new mongoose.Schema({
    balance: { type: Number, default: 1000 }
});
const Account = mongoose.model("Account", accountSchema);

app.get("/api/atm/balance", async (req, res) => {
    let account = await Account.findOne() || new Account();
    res.json({ balance: account.balance });
});

app.post("/api/atm/withdraw", async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        if (isNaN(amount) || amount <= 0) return res.status(400).json({ error: "Geçersiz tutar" });

        let account = await Account.findOne();
        if (!account) account = new Account();

        if (amount > account.balance) return res.status(400).json({ error: "Yetersiz bakiye" });

        account.balance -= amount;
        await account.save();

        res.json({ balance: account.balance });
    } catch (err) {
        res.status(500).json({ error: "İşlem başarısız" });
    }
});

app.post("/api/atm/deposit", async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        if (isNaN(amount) || amount <= 0) return res.status(400).json({ error: "Geçersiz tutar" });

        let account = await Account.findOne();
        if (!account) account = new Account();

        account.balance += amount;
        await account.save();

        res.json({ balance: account.balance });
    } catch (err) {
        res.status(500).json({ error: "İşlem başarısız" });
    }
});

app.use("/", express.static(path.join(publicPath, "!indexPage")));
app.use("/atm", express.static(path.join(publicPath, "atmSimulator/client/dist")));
app.use("/kitap", express.static(path.join(publicPath, "bookListApp")));
app.use("/doviz", express.static(path.join(publicPath, "currencyConverter")));
app.use("/akaryakit", express.static(path.join(publicPath, "gasStation")));
app.use("/oyun", express.static(path.join(publicPath, "myFavoriteGames")));
app.use("/asal", express.static(path.join(publicPath, "primeNumber")));
app.use("/bunumuariyordun", express.static(path.join(publicPath, "productListApp")));
app.use("/neyesem", express.static(path.join(publicPath, "recipeFinder")));
app.use("/basardimmi", express.static(path.join(publicPath, "averageCalculator")));

app.get(/^\/atm(\/.*)?$/, (req, res) => {
    res.sendFile(path.join(publicPath, "atmSimulator", "index.html"));
});

app.listen(port, () => {
    console.log(`\nSunucu çalışıyor: http://localhost:${port}\n`);
});