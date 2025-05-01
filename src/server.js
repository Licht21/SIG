import Hapi from "@hapi/hapi";
import { routes } from "./routes.js";

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    // host: "localhost",
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
