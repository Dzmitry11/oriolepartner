import { r as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/renderer-template
const rendererTemplate = () => new HTTPResponse("<!doctype html>\n<html lang=\"en\">\n <head>\n <meta charset=\"utf-8\" />\n <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />\n <title>Oriole Partner</title>\n </head>\n <body>\n <div id=\"root\"></div>\n <script type=\"module\" src=\"/src/start.ts\"><\/script>\n </body>\n</html>\n", { headers: { "content-type": "text/html; charset=utf-8" } });
//#endregion
//#region node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
//#endregion
export { renderIndexHTML as default };
