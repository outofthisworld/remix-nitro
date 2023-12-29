import * as security from "./config/security";

const dir = process.env.INIT_CWD ?? process.cwd();
console.log( `${dir}/build/index.js`)
//https://nitro.unjs.io/config
export default defineNitroConfig({
  preset: "node",
  output: {
    dir: ".build/nitro-server-build",
    serverDir: ".build/nitro-server-build/server",
    publicDir:
      "/Users/imac/Desktop/DalesProjects/Playground/remixpractice/remixproxylistfinal/public",
  },
  serveStatic: true,
  noPublicDir: true,
  buildDir: ".nitrodev",
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
      baseName: "remixbuild",
      dir: `${dir}/build`,
    },
  ],
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
