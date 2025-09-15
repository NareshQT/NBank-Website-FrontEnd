# Environment Configuration Guide

## 📋 Overview

This banking application uses environment variables for configuration management. This ensures secure handling of sensitive data and easy deployment across different environments.

## 🔧 Environment Files

### File Structure
```
├── env.template          # Template file (safe to commit)
├── env.development       # Development environment
├── env.production        # Production environment
├── env.local            # Local overrides (not committed)
└── .env                 # Local development (not committed)
```

## 🚀 Quick Setup

### 1. Copy Template
```bash
cp env.template .env
```

### 2. Edit Configuration
Update `.env` with your actual values:
```bash
# Edit the .env file
nano .env
# or
code .env
```

### 3. Start Development
```bash
npm run dev
```

## 📝 Environment Variables

### Application Settings
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | Yes |
| `PORT` | Application port | `5173` | No |
| `REACT_APP_NAME` | Application name | `nBank` | No |
| `REACT_APP_VERSION` | Application version | `1.0.0` | No |

### API Configuration
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_BASE_URL` | Base API URL | `http://localhost:3001/api` | Yes |
| `REACT_APP_API_TIMEOUT` | API timeout (ms) | `10000` | No |

### Authentication
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_JWT_SECRET` | JWT secret key | - | Yes |
| `REACT_APP_TOKEN_EXPIRY` | Token expiry time | `24h` | No |
| `REACT_APP_SESSION_TIMEOUT` | Session timeout (ms) | `1800000` | No |
| `REACT_APP_ENABLE_2FA` | Enable 2FA | `false` | No |

### Banking APIs
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_AUTH_API` | Authentication endpoint | `/auth` | No |
| `REACT_APP_ACCOUNTS_API` | Accounts endpoint | `/accounts` | No |
| `REACT_APP_TRANSACTIONS_API` | Transactions endpoint | `/transactions` | No |
| `REACT_APP_CARDS_API` | Cards endpoint | `/cards` | No |
| `REACT_APP_LOANS_API` | Loans endpoint | `/loans` | No |

### External Services
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_SENTRY_DSN` | Sentry error tracking | - | No |
| `REACT_APP_GOOGLE_ANALYTICS_ID` | Google Analytics ID | - | No |
| `REACT_APP_HOTJAR_ID` | Hotjar tracking ID | - | No |

### Feature Flags
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_ENABLE_ANALYTICS` | Enable analytics | `false` | No |
| `REACT_APP_ENABLE_ERROR_TRACKING` | Enable error tracking | `false` | No |
| `REACT_APP_ENABLE_DEBUG_MODE` | Enable debug mode | `true` | No |

## 🔒 Security Best Practices

### 1. Never Commit Sensitive Data
- `.env` files are in `.gitignore`
- Use `env.template` for documentation
- Use environment-specific files for deployment

### 2. Production Secrets
For production, use environment variables from your hosting platform:
```bash
# Example for Vercel
vercel env add REACT_APP_JWT_SECRET

# Example for Netlify
netlify env:set REACT_APP_JWT_SECRET "your-secret-key"
```

### 3. Secret Management
- Use strong, unique secrets for each environment
- Rotate secrets regularly
- Use external secret management services in production

## 🛠️ Usage in Code

### Import Configuration
```typescript
import { environment, getApiUrl, isDevelopment } from './config/environment';

// Get full config
const config = environment.getConfig();

// Use specific values
const apiUrl = getApiUrl('/auth/login');
const isDev = isDevelopment();

// Feature flags
if (config.enableAnalytics) {
  // Initialize analytics
}
```

### API Calls
```typescript
import { getApiUrl } from './config/environment';

const response = await fetch(getApiUrl('/accounts'), {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## 🌍 Environment-Specific Configuration

### Development
```bash
NODE_ENV=development
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_ENABLE_DEBUG_MODE=true
```

### Staging
```bash
NODE_ENV=production
REACT_APP_API_BASE_URL=https://staging-api.nbank.com/api
REACT_APP_ENABLE_ANALYTICS=false
```

### Production
```bash
NODE_ENV=production
REACT_APP_API_BASE_URL=https://api.nbank.com/api
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_ERROR_TRACKING=true
```

## 🔧 Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Ensure variables start with `REACT_APP_`
   - Restart development server after changes
   - Check for typos in variable names

2. **API calls failing**
   - Verify `REACT_APP_API_BASE_URL` is correct
   - Check CORS settings on API server
   - Ensure API server is running

3. **Build issues**
   - All `REACT_APP_` variables must be defined at build time
   - Use build-time environment injection for production

### Debug Mode
Enable debug mode to see configuration values:
```bash
REACT_APP_ENABLE_DEBUG_MODE=true npm run dev
```

## 📚 Additional Resources

- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Environment Configuration Best Practices](https://12factor.net/config)
