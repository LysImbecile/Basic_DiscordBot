const fs = require("node:fs"); // File System for system interaction
const path = require("node:path"); 
const {Client, Events, GatewayIntentBits, Collection} = require("discord.js");
const { token } = require("./config.json"); // Importing your token key 



// Creating a new instance for your bot 
const client = new Client({intents : [GatewayIntentBits.Guilds]});

// Creating a new collection for your bot commands 
client.commands = new Collection();



// Default message on a sucessfull connection
client.once(Events.ClientReady, c => {
    console.log(`Bot online as ${c.user.displayName}!`)
})


const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter( file => file.endsWith(".js"));


for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }

    else {
        console.log(`Error : The command at ${filePath} is missing "data" or "execute".`)

    }

}


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (!client.commands.has(commandName)) return;


    try {
        await client.commands.get(commandName).execute(interaction);

    }

    catch(e){
        console.log(e);
        await interaction.reply({content: 'Something is wrong...', ephemeral : true });
    }
})


client.login(token);