import { getDataLine, getDataPoint, getDataPolygon } from "./handler.js";

const routes = [
  {
    method: "GET",
    path: "/point",
    handler: getDataPoint,
  },
  {
    method: "GET",
    path: "/line",
    handler: getDataLine,
  },
  {
    method: "GET",
    path: "/polygon",
    handler: getDataPolygon,
  },
];

export { routes };
