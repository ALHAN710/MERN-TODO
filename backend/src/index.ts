import app from "./server";
import { port } from "./services/config";

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
