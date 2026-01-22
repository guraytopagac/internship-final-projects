require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connection.on('connecting', () => console.log("MongoDB bağlanıyor..."));
mongoose.connection.on('connected', () => console.log("MongoDB Atlas'a bağlandı!"));
mongoose.connection.on('error', (err) => console.error("MongoDB bağlantı hatası:", err));
mongoose.connection.on('disconnected', () => console.log("MongoDB bağlantısı kesildi."));

mongoose.connect(uri)
    .catch(err => console.error("Connect hatası:", err));

const accountSchema = new mongoose.Schema({
    balance: { type: Number, default: 1000 }
});
const Account = mongoose.model("Account", accountSchema);

app.get("/api/atm/balance", async (req, res) => {
    try {
        let account = await Account.findOne();
        if (!account) {
            account = new Account();
            await account.save();
        }
        res.json({ balance: account.balance });
    } catch (err) {
        res.status(500).json({ error: "Balance alınamadı" });
    }
});

app.post("/api/atm/withdraw", async (req, res) => {
    try {
        const { amount } = req.body;
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
        const { amount } = req.body;
        let account = await Account.findOne();
        if (!account) account = new Account();

        account.balance += amount;
        await account.save();

        res.json({ balance: account.balance });
    } catch (err) {
        res.status(500).json({ error: "İşlem başarısız" });
    }
});

app.use("/atm", express.static(path.join(__dirname, "public")));

app.get(/.atm*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(port, () => console.log(`Server çalışıyor: http://localhost:${port}/atm`));