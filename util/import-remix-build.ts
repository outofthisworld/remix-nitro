import { broadcastDevReady } from "@vercel/remix";

let build = null;

export default async function importBuild() {
  if (build) {
    return build;
  }
  const dir = process.env.INIT_CWD ?? process.cwd();

  build = await import(`${dir}/build/index.js`);

  await broadcastDevReady(build);
  return build;
}
