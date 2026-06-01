# harchos-slack-bot ⚡

A Slack bot for HarchOS — the carbon-aware compute platform.

Built by Amine (@VitalCheffe) for Hack Club Stardance.

## Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/harchos help` | Show all available commands | `/harchos help` |
| `/harchos carbon [region]` | Check carbon intensity of compute regions | `/harchos carbon eu-west-1` |
| `/harchos gpu [cluster]` | List available GPU clusters | `/harchos gpu` |
| `/harchos price [region] [gpu]` | Compare compute pricing | `/harchos price us-east-1 a100` |
| `/harchos status` | Check platform status and uptime | `/harchos status` |

## Setup

### 1. Create a Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app
2. Use the manifest in `manifest/slack-app-manifest.json` to configure it
3. Install the app to your workspace
4. Note your Bot Token (`xoxb-...`) and App Token (`xapp-...`)

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your Slack credentials
```

Required environment variables:
- `SLACK_BOT_TOKEN` - Bot OAuth token (xoxb-...)
- `SLACK_APP_TOKEN` - App-level token for Socket Mode (xapp-...)
- `SLACK_SIGNING_SECRET` - App signing secret
- `HARCHOS_API_URL` - HarchOS API URL (default: https://api.harchos.ai/v1)

### 3. Install and Run

```bash
npm install
npm run build
npm start
```

The bot uses Socket Mode — it stays online 24/7 without needing a public URL.

## Project Structure

```
harchos-slack-bot/
├── src/
│   ├── index.ts              # Main app entry + command router
│   ├── handlers/
│   │   ├── help.ts           # Help command
│   │   ├── carbon.ts         # Carbon intensity command
│   │   ├── gpu.ts            # GPU clusters command
│   │   ├── price.ts          # Pricing command
│   │   └── status.ts         # System status command
│   ├── services/
│   │   └── harchos-api.ts    # HarchOS API client (with caching)
│   └── utils/
│       ├── formatting.ts     # Response formatting helpers
│       └── validators.ts     # Input validation
├── manifest/
│   └── slack-app-manifest.json
├── .env.example
├── tsconfig.json
└── package.json
```

## Tech Stack

- **@slack/bolt** — Slack app framework
- **TypeScript** — Type-safe JavaScript
- **node-fetch** — HTTP client
- **Socket Mode** — No public URL needed

## License

MIT
