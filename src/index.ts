import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import dotenv from "dotenv";

dotenv.config();
const port = Number(process.env.API_PORT ?? 3000);
const host = process.env.HOST ?? "localhost";

const server: FastifyInstance = Fastify({
  logger: true,
});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "string",
      },
    },
  },
};

server.get("/ping", opts, async (_request, _reply) => {
  return "Hello Docker 🐳";
});

const start = async () => {
  try {
    await server.listen({ host, port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
