import * as security from "./config/security";
import { globSync } from "glob";

const dir = process.env.INIT_CWD ?? process.cwd();

//https://nitro.unjs.io/config
export default defineNitroConfig({
  preset: "node",
  output: {
    dir: `${dir}/remix-nitro`,
    serverDir: `${dir}/remix-nitro/build`,
    publicDir: `${dir}/public`,
  },
  serveStatic: true,
  noPublicDir: true,
  buildDir: `${dir}/.nitrodev`,
  renderer: "./routes/index.ts",
  runtimeConfig: {},
  appConfig: {
    security,
  },
  routeRules: {
    "/": {},
  },
  compressPublicAssets: { gzip: true, brotli: true },
  serverAssets: [
    {
      baseName: "remix/build",
      dir: `${dir}/build`,
    },
    {
      baseName: "remix/public",
      dir: `${dir}/public`,
    },
  ],
  plugins: globSync([`${dir}/plugins/**/*.ts`]),
  handlers: [
    ...globSync([`${dir}/routes/**/*.{ts,js}`]).map((path) => {
      return {
        route: path.replace(`${dir}/routes`, "").replace(/\.ts|.js/g, ""),
        handler: path,
        middleware: false,
        lazy: false,
      };
    }),
    ...globSync([`${dir}/api/**/*.{ts,js}`]).map((path) => ({
      route: path.replace(`${dir}`, "").replace(/\.ts|.js/g, ""),
      handler: path,
      middleware: false,
      lazy: false,
    })),
    ...globSync([`${dir}/middleware/**/*.{ts,js}`]).map((path) => ({
      handler: path,
      middleware: true,
      lazy: false,
    })),
  ],
  scanDirs: [`${dir}/routes`, `${dir}/plugins`],
  typescript: {
    tsConfig: {
      compilerOptions: {
        target: "ES2022",
        module: "ES2022",
        lib: ["ES2022"],
        moduleResolution: "Bundler",
      },
    },
  },
});
