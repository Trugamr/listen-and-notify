## Listen and Notify
Sends message on telegram group/private chat when new jellyfin item is added.

### Environment Variables
```
TELEGRAM_BOT_TOKEN: string
TELEGRAM_CHAT_ID: string
API_KEY: string (optional)
```
### Configuring Jellyfin Webhook Plugin
Add generic destination with url `http://localhost:3000/api/jellyfin/notify`.

Update settings to following
* Notification Type
  - [x] Item Added
* Item Types
  - [x] Movies  
  - [x] Season  
  - [x] Series
  
Make sure "Send All Properties" is also checked.

If you are setting `API_KEY` environment variable add header with with key as `X-API-KEY` and value which you are setting in environment variable.
