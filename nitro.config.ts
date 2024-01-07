import * as security from "./config/security";
import { globSync } from "glob";

// The root dir for the users project 
const dir = process.env.INIT_CWD ?? process.cwd();

//https://nitro.unjs.io/config
export default defineNitroConfig({
  // The default preset
  preset: "vercel",
  output: {
    dir: `${dir}/build`,
    // Where the server build files are located
    serverDir: `${dir}/build`,
    // Where the user public dir is located (we will serve this)
    publicDir: `${dir}/public`,
  },
  // Server the users public dir
  serveStatic: true,
  // Dont create our own public dir
  noPublicDir: true,
  // Place the local dev build in the users base dir
  buildDir: `${dir}/.nitrodev`,
  renderer: "./routes/index.ts",
  runtimeConfig: {},
  // This will be user defined configuration, that gets merged in
  appConfig: {
    security,
  },
  // This will be user defined route rules, that gets merged in
  routeRules: {
    "/": {},
  },
  compressPublicAssets: { gzip: true, brotli: true },
  // Where user defined build and public assets are located (obtain from their remix config)
  serverAssets: [
    {
      baseName: "remix/build",
      dir: `${dir}/remix`,
    },
    {
      baseName: "remix/public",
      dir: `${dir}/public`,
    },
  ],
  plugins: globSync([`${dir}/plugins/**/*.{ts,js}`]),
  handlers: [
    // Set up user defined routes
    ...globSync([`${dir}/routes/**/*.{ts,js}`]).map((path) => ({
      route: path.replace(`${dir}/routes`, "").replace(/\.ts|.js/g, ""),
      handler: path,
      middleware: false,
      lazy: false,
    })),
    // Set up user defined api routes
    ...globSync([`${dir}/api/**/*.{ts,js}`]).map((path) => ({
      route: path.replace(`${dir}`, "").replace(/\.ts|.js/g, ""),
      handler: path,
      middleware: false,
      lazy: false,
    })),
    // Set up user dedfined middleware
    ...globSync([`${dir}/middleware/**/*.{ts,js}`]).map((path) => ({
      handler: path,
      middleware: true,
      lazy: false,
    })),
  ],
  // Typescript settings
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
