import app from "./app";

const port: number = parseInt(process.env.PORT || "8080");
const host: string = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
  console.log(`App listening on port ${host}:${port}`);
});
