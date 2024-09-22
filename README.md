![BOT Card Image Preview](./zipfm-discord-bot-card.jpg)

## About
This bot was designed to stream ZIP FM, a popular Lithuanian radio station, directly into Discord voice channels. The bot provides a simple and interactive way for users to listen to live radio with their friends inside a Discord server.

## Features
• **Live Streaming**: Streams ZIP FM radio into Discord voice channels (with current limitations).  
• **Spam prevention**: Detecting spam will result the server to be blacklisted.

**⚠️ Important Note:**

This bot was developed using `discord.js v13.2.0`, which is now outdated.  

**There are known issues with the streaming function:**  
• The stream handler is not managed correctly, leading to inconsistent performance.  
• Streaming into voice channels requires a significant amount of resources, making the bot challenging to run smoothly.  
• Due to the changes in Discord's API, you might experience functionality breakdowns.  
• If you manage to launch the bot, expect difficulties with the voice channel streaming feature.  

## Why This Project Is No Longer Maintained?
I was unable to secure an official agreement with ZIP FM to use their name and branding for this bot. Without this agreement, there were no tangible benefits to continue maintaining the project. The resources required to fix the streaming handler and keep the bot updated were also prohibitive, given the lack of official support or endorsement.

## Technical Details
• **Node.js**: The bot is built using Node.js with the `discord.js v13.2.0` library for Discord integration.  
• **Streaming**: The bot uses an audio streaming handler for Discord voice channels, which needs significant optimization.
• **Dependencies**:
`discord.js v13.2.0`, 
`ffmpeg-static` (for audio processing), 
`@discordjs/opus` (for voice stream compatibility).

## Known Issues
• **Streaming Performance**: As mentioned, the bot’s voice channel streaming does not work efficiently, consuming high resources.  
• **Outdated Library**: The bot relies on `discord.js v13.2.0`, which may not function with newer Discord API changes.  
• **No Official Support**: This project is abandoned and no longer maintained due to the inability to use the ZIP FM brand officially.  

## Future Plans
Currently, there are no plans to update or maintain the project unless an official agreement with ZIP FM is reached or significant community interest arises. If anyone is willing to take over the project and adapt it for newer versions of Discord.js, feel free to fork the repository and make improvements.
