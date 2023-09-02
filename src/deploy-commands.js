const { REST } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { clientId, guildId, token } = require('./config.json');

const commands = [];

// Your commands dir
const commandsDir = path.join(__dirname, 'commands');

// Read the folder files
const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsDir, file);
  const command = require(filePath);

  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(`[WARNING] the command in ${filePath} is missing "data" or "execute" `);
  }
}

const rest = new REST({ version: '10' }).setToken(token);

// commands deploy
(async () => {
  try {
    console.log(`updating ${commands.length} app commands... (/).`);

    const data = await rest.put(
      //  Route to update commands in specific guild
      `/applications/${clientId}/guilds/${guildId}/commands`,
      { body: commands },
    );

    console.log(`update success ${data.length} app commands (/).`);
  } catch (error) {
    console.error(error);
  }
})();
