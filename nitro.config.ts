// The root dir for the users project
const dir = process.env.INIT_CWD ?? process.cwd();

//https://nitro.unjs.io/config
export default defineNitroConfig({
  appConfigFiles: [`${dir}/nitro.config.ts`],
});
