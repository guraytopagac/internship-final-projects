require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connection.on("connecting", () => console.log("MongoDB bağlanıyor..."));
mongoose.connection.on("connected", () => console.log("MongoDB Atlas'a bağlandı!"));
mongoose.connection.on("error", err => console.error("MongoDB bağlantı hatası:", err));
mongoose.connection.on("disconnected", () => console.log("MongoDB bağlantısı kesildi."));

mongoose.connect(process.env.ATM_DB_URI)
    .catch(err => console.error("Connect hatası:", err));

const accountSchema = new mongoose.Schema({
    balance: { type: Number, default: 1000 }
});

const Account = mongoose.model("Account", accountSchema);

app.get("/api/atm/balance", async (req, res) => {
    let account = await Account.findOne();
    if (!account) {
        account = new Account();
        await account.save();
    }
    res.json({ balance: account.balance });
});

app.post("/api/atm/withdraw", async (req, res) => {
    const { amount } = req.body;

    let account = await Account.findOne();
    if (!account) account = new Account();

    if (amount > account.balance) {
        return res.status(400).json({ error: "Yetersiz bakiye" });
    }

    account.balance -= amount;
    await account.save();

    res.json({ balance: account.balance });
});

app.post("/api/atm/deposit", async (req, res) => {
    const { amount } = req.body;

    let account = await Account.findOne();
    if (!account) account = new Account();

    account.balance += amount;
    await account.save();

    res.json({ balance: account.balance });
});

const clientDistPath = path.join(__dirname, "..", "client", "dist");

app.use("/atm", express.static(clientDistPath));

app.get(/^\/atm(\/.*)?$/, (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(port, () => {
    console.log(`Server çalışıyor: http://localhost:${port}/atm`);
});