import importBuild from "../util/import-remix-build";

export default async (nitroApp) => {
  if (process.env.NODE_ENV === "development") {
    await importBuild();
  }
};
