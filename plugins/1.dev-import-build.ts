import importBuild from "../util/import-remix-build";
import fs from 'fs';

export default defineNitroPlugin(async (nitroApp) => {
  if (process.env.NODE_ENV === "development") {
    await importBuild();
    const data = await useStorage().getItem(`assets/remixbuild/index.js`)
    console.log(data);
  }
  /*
  const dir = process.env.INIT_CWD ?? process.cwd();

  nitroApp.hooks.hook('beforeResponse', (event, response)=>{
    console.log('before response:: ', event.path);
    console.log(fs.readdirSync(`${dir}/public`))

  })*/
});
