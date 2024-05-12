# Junsei
This is an extension that removes unsupported headers from responses, restoring modern websites' functionality on older web browsers. It will NOT work on browsers that are past Manifest V2's deprecation!

## Current fixes
### Set-Cookie
- **RemovePartitioned**: Removes experimental (Partitioned cookies)[https://developer.mozilla.org/en-US/docs/Web/Privacy/Privacy_sandbox/Partitioned_cookies] which break old browsers' cookie parsers.

## Installation guide
1. Download this repository(Code -> Download ZIP) and unpack it into any folder
2. Navigate to `chrome://extensions`
3. Enable Developer mode
4. Click "Load unpacked"
5. Select the folder you unpacked this repo to **or** the manifest.json file inside
6. Enjoy!

## Motives
Cloudflare will use Partitioned cookies in their cf_clearance headers, breaking websites behind their WAF, namely the ones in UAM(Under Attack Mode), which activates the page saying "`Verifying you are a human. This may take a few seconds.`", which, upon verification, will greet you with a website without any JS or CSS resources, resulting, most of the time, in an utterly broken page.

Hopefully I will never have to update this extension again.