require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || "5000";
const HOST = process.env.HOST || "localhost";
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

const proxy = createProxyMiddleware({
  target: "https://api.themoviedb.org/3",
  changeOrigin: true,
  pathRewrite: { "^/api": "" },
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader("Authorization", `Bearer ${TMDB_ACCESS_TOKEN}`);
  },
});

express()
  .use("/api/hello", (req, res) => res.send("Hello"))
  .use("/api", proxy)
  .listen(PORT, () => console.log(`Listening at http://${HOST}:${PORT}`));
