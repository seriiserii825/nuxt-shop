require("dotenv").config();

// Подключаем бэкенд на Express.
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const emailRouter = require("./routes/email");
const authRouter = require("./routes/auth.routes");
const tipoRouter = require("./routes/tipo.routes");
const solutionRouter = require("./routes/solution.routes");
const pageRouter = require("./routes/page.routes");
const mediaRouter = require("./routes/media.routes");
const partnerRouter = require("./routes/partner.routes");
const portfolioRouter = require("./routes/portfolio.routes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/", emailRouter);
app.use("/", authRouter);
app.use("/api/v1/tipo/", tipoRouter);
app.use("/api/v1/solution/", solutionRouter);
app.use("/api/v1/page/", pageRouter);
app.use("/api/v1/partner/", partnerRouter);
app.use("/api/v1/portfolio/", portfolioRouter);
app.use("/api/v1/media", mediaRouter);

const mongoose = require("mongoose");
mongoose.Schema.Types.Boolean.convertToFalse.add("");
mongoose
  .connect(`mongodb://localhost/${process.env.DATABASE}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log("Db connect successfully");
  })
  .catch(error => console.log("Db connection error " + error.message));

// Подключаем Nuxt в режиме nuxt.render. В этом примере нет отдельного процесса с Nuxt.
// Nuxt работает в качестве middleware для Express без своего сервера на Connect.
const { loadNuxt, build } = require("nuxt");
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
