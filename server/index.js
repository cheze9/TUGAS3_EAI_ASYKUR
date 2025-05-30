import express, { json } from "express";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { schema } from "./graphql/schema.js";
import { root } from "./graphql/resolvers.js";

const app = express();

app.use(cors());
app.use(json());

app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue: root,
    formatError(err) {
      if (err.originalError === false) {
        return err;
      }

      return {
        message: err.message,
        status: err.originalError?.status || 500,
        path: err.path,
      };
    },
  })
);

app.get("/", (req, res) => {
  res.type("html");
  return res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.log("Server berjalan di http://localhost:4000");
});
