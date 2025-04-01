import { createRequestHandler } from "@react-router/architect";
// @ts-ignore
import * as build from "../build/server";

export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
}); 