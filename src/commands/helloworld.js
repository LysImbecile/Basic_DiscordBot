const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data : new SlashCommandBuilder()
    .setName("helloworld")
    .setDescription("Lets see if your bot is awake!"),
    
    async execute(interaction) {
        await interaction.reply(`I'm awake ${interaction.user.username}! what about you?`)
        console.log("command executed")
    }
}