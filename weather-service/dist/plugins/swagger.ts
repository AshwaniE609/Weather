import { GSContext, GSPlugin } from "@godspeedsystems/core";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

export default class SwaggerPlugin extends GSPlugin {
  register(): void {
    const swaggerPath = path.resolve(process.cwd(), "swagger.yaml");
    const swaggerDocument = YAML.load(swaggerPath);

    this.godspeed.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.logger.info("📘 Swagger UI available at /api-docs");
  }

  async start(): Promise<void> {
    // No extra logic needed
  }

  async stop(): Promise<void> {
    // Nothing to clean up
  }
}

