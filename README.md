# harchos-slack-bot

A Slack bot for HarchOS — the carbon-aware compute platform.

Built by Amine (@VitalCheffe) for Hack Club Stardance.

## What it does

This bot lets you query HarchOS directly from Slack using slash commands:

| Command | Description |
|---------|-------------|
| `/harchos help` | Show all available commands |
| `/harchos carbon [region]` | Check carbon intensity of compute regions |
| `/harchos gpu [cluster]` | List available GPU clusters and their status |
| `/harchos price [region] [gpu]` | Compare compute pricing across regions |
| `/harchos status` | Check HarchOS platform status and uptime |

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
- `SLACK_BOT_TOKEN` - Your bot's OAuth token (xoxb-...)
- `SLACK_APP_TOKEN` - Your app-level token for Socket Mode (xapp-...)
- `SLACK_SIGNING_SECRET` - Your app's signing secret
- `HARCHOS_API_URL` - HarchOS API base URL (defaults to https://api.harchos.ai/v1)

### 3. Install and Run

```bash
npm install
npm run build
npm start
```

The bot uses Socket Mode so it stays online 24/7 without needing a public URL.

## Project Structure

```
harchos-slack-bot/
├── src/
│   ├── index.ts              # Main app entry point
│   ├── handlers/
│   │   ├── help.ts           # Help command
│   │   ├── carbon.ts         # Carbon intensity command
│   │   ├── gpu.ts            # GPU clusters command
│   │   ├── price.ts          # Pricing command
│   │   └── status.ts         # System status command
│   ├── services/
│   │   └── harchos-api.ts    # HarchOS API client
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

- **@slack/bolt** - Slack's framework for building apps
- **TypeScript** - Type-safe JavaScript
- **node-fetch** - HTTP client for API calls
- **Socket Mode** - Stay connected without public endpoints

## License

MIT
