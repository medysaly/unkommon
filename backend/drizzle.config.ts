import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "../shared-types/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://postgres:Chechel1990!@localhost:5432/business_automated",
  },
});
