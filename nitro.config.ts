// The root dir for the users project 
const dir = process.env.INIT_CWD ?? process.cwd();

const config = import(`${dir}/nitro.config.ts`);

//https://nitro.unjs.io/config
export default config;
