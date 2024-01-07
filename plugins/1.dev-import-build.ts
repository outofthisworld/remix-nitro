import importBuild from "../util/import-remix-build";

export default defineNitroPlugin(async (nitroApp) => {
  if (process.env.NODE_ENV === "development") {
    await importBuild();
  }
});
