import { eventHandler, toWebRequest } from "#imports";
import { createRequestHandler } from "@vercel/remix";
import importBuild from "../util/import-remix-build";

/**
 * Serve remix.
 */
export default eventHandler(async (event) => {
  return createRequestHandler(await importBuild())(toWebRequest(event), event.context);
});
