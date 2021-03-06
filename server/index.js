require("dotenv").config();
// Подключаем бэкенд на Express.
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");
const { loadNuxt, build } = require("nuxt");
const emailRouter = require("./routes/email");
const authRouter = require("./routes/auth.routes");
const mediaRouter = require("./routes/media.routes");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/category.routes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/", emailRouter);
app.use("/", authRouter);
app.use("/api/v1/product/", productRouter);
app.use("/api/v1/category/", categoryRouter);
app.use("/api/v1/media", mediaRouter);

mongoose.Schema.Types.Boolean.convertToFalse.add("");
mongoose
  .connect(`mongodb://localhost/${process.env.DATABASE}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Db connect successfully");
  })
  .catch((error) => console.log(`Db connection error ${error.message}`));

// Подключаем Nuxt в режиме nuxt.render. В этом примере нет отдельного процесса с Nuxt.
// Nuxt работает в качестве middleware для Express без своего сервера на Connect.

const isDev = process.env.NODE_ENV !== "production";

async function start() {
  const nuxt = await loadNuxt(isDev ? "dev" : "start");
  app.use(nuxt.render);
  if (isDev) {
    build(nuxt);
  }
  app.listen(PORT);
}

// Запуск приложения.
start();
