/**
 * Application configuration utilities
 */
export class Config {
  static get PORT(): number {
    return parseInt(process.env.PORT || "3000", 10);
  }

  static get NODE_ENV(): string {
    return process.env.NODE_ENV || "development";
  }

  static get DATABASE_URL(): string {
    return process.env.DATABASE_URL || "file:./dev.db";
  }

  static get isDevelopment(): boolean {
    return this.NODE_ENV === "development";
  }

  static get isProduction(): boolean {
    return this.NODE_ENV === "production";
  }
}
