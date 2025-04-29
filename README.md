<p align="center">
  <a href="https://jfinchain.com/" target="blank"><img src="https://static.wixstatic.com/media/ff114f_a8511d92b57c4e6ea27422ede46f5f57~mv2.png/v1/fill/w_69,h_69,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/JFIN%20Logo-06.png" height="100" alt="JFINCHAIN Logo" /></a>
</p>
<p align="center">JFIN CHAIN BEYOND THE FUTURE.</p>

<p align="center">
    <a href="https://www.facebook.com/JFINofficial" target="_blank">
        <img src="https://img.shields.io/badge/Facebook-1877F2?style=social&logo=facebook">
    </a>
    <a href="https://twitter.com/jfinofficial" target="_blank">
        <img src="https://img.shields.io/github/followers/jventures-jdn?style=social">
    </a>
</p>
<hr/>

<p align="center">
    Official <a href="https://github.com/jventures-jdn/jfin-explorer">JFIN Explorer</a>
</p>

# 🔧 Installation

1. Clone repo

```bash
git clone https://github.com/jventures-jdn/jfin-explorer.git
cd jfin-explorer
```

2. Install Dependencies

```bash
yarn install
```

3. Create a `.env.secrets` file and configure the environment variables and use this data

```bash
# NEXT_PUBLIC_SENTRY_DSN=https://sentry.io
# SENTRY_CSP_REPORT_URI=https://sentry.io
# NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=xxx
NEXT_PUBLIC_RE_CAPTCHA_APP_SITE_KEY=6Lf5RiApAAAAALCgb-ekdM0GDmcPx3I10ZW0tWJB
# NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID=UA-XXXXXX-X
# NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN=xxx
# NEXT_PUBLIC_AUTH0_CLIENT_ID=xxx
# NEXT_PUBLIC_FAVICON_GENERATOR_API_KEY=85565aa9886544570fe8126c4e0348d3ac453499
FAVICON_GENERATOR_API_KEY=85565aa9886544570fe8126c4e0348d3ac453499
FAVICON_MASTER_URL=https://cdn.discordapp.com/attachments/1164767344497795207/1167033135414923366/jfin.svg
```

4. Start development server

`xxx` represent blockchain environment it can be mainnet, testnet, etc.. (see more in ./configs/envs/)

```bash
yarn:dev preset {xxx}
```

# 📝 Environment Variables
All environment variables are listed in [docs/ENVS.md.](https://github.com/blockscout/frontend/blob/main/docs/ENVS.md)


# ✈️ Deployment
Deploy mainnet
```bash
yarn deploy:mainnet
```

Deploy testnet
```bash
yarn deploy:testnet
```

# ⚙️ Customization
### New Blockchain Environment
1. Create new .env file name .env.{xxx} xxx represent environment name of blockchain
2. Copy all content from .env.mainnet to .env.{xxx} then edit these keys

```bash
NEXT_PUBLIC_CHAIN_REWARD=2 (Optional)
NEXT_PUBLIC_JFIN_REWARD=0.6 (Optional)
NEXT_PUBLIC_API_SPEC_URL= (Optional for custom swagger)

NEXT_PUBLIC_NETWORK_CURRENCY_NAME=JFIN (Optional)
NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL=JFIN (Optional)

NEXT_PUBLIC_NETWORK_NAME={xxx}
NEXT_PUBLIC_NETWORK_ID={xxx}
NEXT_PUBLIC_NETWORK_RPC_URL={xxx}
NEXT_PUBLIC_API_HOST={xxx}
NEXT_PUBLIC_APP_HOST={xxx}
NEXT_PUBLIC_STATS_API_HOST={xxx}
NEXT_PUBLIC_VISUALIZE_API_HOST={xxx}
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID={xxx}
NEXT_PUBLIC_RE_CAPTCHA_APP_SITE_KEY={xxx}
NEXT_PUBLIC_IS_TESTNET=true (For testnet only)


NEXT_PUBLIC_JNS_API_HOST=https://jns-bridge.jfin.workers.dev (Not sure if it's necessary)
NEXT_PUBLIC_JNS_METADATA_HOST=https://jns-metadata.jfinchain.com (Not sure if it's necessary)
NEXT_PUBLIC_JNS_NAMEWRAPPER_ADDRESS=0xF67dEc1b1f85aA3ac77Db6215271305979f51613 (Not sure if it's necessary)
```

### Change coin market cap
![image](https://github.com/user-attachments/assets/b8e18071-8f56-4384-b3d3-628b41068e2d)
- Config details see here: [https://coinmarketcap.com/widget/ticker](https://coinmarketcap.com/widget/ticker)
- Setup script: `./pages/_document.tsx`
- Custom color: `CoinMarketCapWidget.tsx`

### Allow cors for external import url like iframe, script, image
- Custom header policy `nextjs/csp/generateCspPolicy.ts` 

### Add custom env varaible
1. add varaible to `.env.{xxx}`
2. add varaible to `deploy/tools/envs-validator/schema.ts`
3. add varaible to `docs/ENVS.md` below `JFIN Chain Configuration` section

### Get environment varaible 
use `getEnvValue()`

### Custom app network
![image](https://github.com/user-attachments/assets/25897aad-e871-40fe-9f5a-5f8b7b579345)
- file `app_networks.json`
- `group` is meaning tab of menus

### Custom sidebar menu
![image](https://github.com/user-attachments/assets/f6ec7074-6995-4686-bc9d-55d3424a0c6f)
- file `lib/hooks/useNavItems.tsx`

## Team

- [JVenture Team](https://github.com/orgs/jventures-jdn)

## Contact Us

For business inquiries: info@jventures.co.th
