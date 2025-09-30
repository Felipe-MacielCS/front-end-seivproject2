import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import path from "path"; 

import dns from "dns";
dns.setDefaultResultOrder("verbatim");

export default () => {
  const baseURL =
    process.env.APP_ENV === "development" ? "/" : "/seiv2025/p2/t7/";

  return defineConfig({
    plugins: [vue(), vuetify({ autoImport: true })],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@plugins": path.resolve(__dirname, "./src/plugins"), 
      },
    },

    server: {
      host: "localhost",
      port: 8081,
    },

    base: baseURL,
  });
};
