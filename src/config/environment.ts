/**
 * Environment Configuration
 * Centralized configuration management for the banking application
 */

export interface AppConfig {
  // Application
  appName: string;
  appVersion: string;
  appDescription: string;
  nodeEnv: string;
  port: number;

  // API Configuration
  apiBaseUrl: string;
  apiTimeout: number;

  // Authentication
  jwtSecret: string;
  tokenExpiry: string;
  sessionTimeout: number;
  enable2FA: boolean;

  // Banking APIs
  authApi: string;
  accountsApi: string;
  transactionsApi: string;
  cardsApi: string;
  loansApi: string;

  // External Services
  sentryDsn?: string;
  googleAnalyticsId?: string;
  hotjarId?: string;

  // Feature Flags
  enableAnalytics: boolean;
  enableErrorTracking: boolean;
  enableDebugMode: boolean;
}

class EnvironmentConfig {
  private config: AppConfig;

  constructor() {
    this.config = this.loadConfiguration();
  }

  private loadConfiguration(): AppConfig {
    return {
      // Application
      appName: this.getString('REACT_APP_NAME', 'nBank'),
      appVersion: this.getString('REACT_APP_VERSION', '1.0.0'),
      appDescription: this.getString('REACT_APP_DESCRIPTION', 'Your Financial Future Starts Here'),
      nodeEnv: this.getString('NODE_ENV', 'development'),
      port: this.getNumber('PORT', 5173),

      // API Configuration
      apiBaseUrl: this.getString('REACT_APP_API_BASE_URL', 'http://localhost:3001/api'),
      apiTimeout: this.getNumber('REACT_APP_API_TIMEOUT', 10000),

      // Authentication
      jwtSecret: this.getString('REACT_APP_JWT_SECRET', ''),
      tokenExpiry: this.getString('REACT_APP_TOKEN_EXPIRY', '24h'),
      sessionTimeout: this.getNumber('REACT_APP_SESSION_TIMEOUT', 1800000),
      enable2FA: this.getBoolean('REACT_APP_ENABLE_2FA', false),

      // Banking APIs
      authApi: this.getString('REACT_APP_AUTH_API', '/auth'),
      accountsApi: this.getString('REACT_APP_ACCOUNTS_API', '/accounts'),
      transactionsApi: this.getString('REACT_APP_TRANSACTIONS_API', '/transactions'),
      cardsApi: this.getString('REACT_APP_CARDS_API', '/cards'),
      loansApi: this.getString('REACT_APP_LOANS_API', '/loans'),

      // External Services
      sentryDsn: this.getOptionalString('REACT_APP_SENTRY_DSN'),
      googleAnalyticsId: this.getOptionalString('REACT_APP_GOOGLE_ANALYTICS_ID'),
      hotjarId: this.getOptionalString('REACT_APP_HOTJAR_ID'),

      // Feature Flags
      enableAnalytics: this.getBoolean('REACT_APP_ENABLE_ANALYTICS', false),
      enableErrorTracking: this.getBoolean('REACT_APP_ENABLE_ERROR_TRACKING', false),
      enableDebugMode: this.getBoolean('REACT_APP_ENABLE_DEBUG_MODE', true),
    };
  }

  private getString(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
  }

  private getOptionalString(key: string): string | undefined {
    const value = process.env[key];
    return value && value.trim() !== '' ? value : undefined;
  }

  private getNumber(key: string, defaultValue: number): number {
    const value = process.env[key];
    const parsed = value ? parseInt(value, 10) : defaultValue;
    return isNaN(parsed) ? defaultValue : parsed;
  }

  private getBoolean(key: string, defaultValue: boolean): boolean {
    const value = process.env[key];
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === 'true';
  }

  public getConfig(): AppConfig {
    return { ...this.config };
  }

  public isDevelopment(): boolean {
    return this.config.nodeEnv === 'development';
  }

  public isProduction(): boolean {
    return this.config.nodeEnv === 'production';
  }

  public isTest(): boolean {
    return this.config.nodeEnv === 'test';
  }

  public getApiUrl(endpoint: string): string {
    return `${this.config.apiBaseUrl}${endpoint}`;
  }
}

// Export singleton instance
export const environment = new EnvironmentConfig();

// Export individual config getters for convenience
export const {
  appName,
  appVersion,
  appDescription,
  nodeEnv,
  port,
  apiBaseUrl,
  apiTimeout,
  jwtSecret,
  tokenExpiry,
  sessionTimeout,
  enable2FA,
  authApi,
  accountsApi,
  transactionsApi,
  cardsApi,
  loansApi,
  sentryDsn,
  googleAnalyticsId,
  hotjarId,
  enableAnalytics,
  enableErrorTracking,
  enableDebugMode,
} = environment.getConfig();

// Helper functions
export const getApiUrl = (endpoint: string) => environment.getApiUrl(endpoint);
export const isDevelopment = () => environment.isDevelopment();
export const isProduction = () => environment.isProduction();
export const isTest = () => environment.isTest();
