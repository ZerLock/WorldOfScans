"use strict";

import Fastify from "fastify";
import cors from '@fastify/cors';

const app = Fastify({
  logger: true,
});

app.register(cors);
app.register(import("../src/app.js"));

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}
