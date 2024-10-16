import LlamaAI from 'llamaai';
const apiToken = 'LA-bcf0919289514885a978d3d27afae39c15c10d4368f14b1f9ed4ffa9425942e0';
const llamaAPI = new LlamaAI(apiToken);

module.exports = {
    name: "llama",
    usedby: 0,
    dev: "Jack.Lxpro(Coder)",
    info: "EDUCATIONAL",
    onPrefix: false,
    cooldowns: 6,

    onReply: async function ({ reply, api, event }) {
        const { threadID } = event;

        api.setMessageReaction("⏱️", event.messageID, () => {}, true);
        
        try {
            const response = await llamaAPI.getReply(reply);
            const followUpResult = response;
            api.setMessageReaction("✅", event.messageID, () => {}, true);
            api.sendMessage(`𝗔𝗜 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲\n━━━━━━━━━━━━━━━━━━\n${followUpResult}\n━━━━━━━━━━━━━━━━━━`, threadID);
        } catch (error) {
            console.error(error);
            api.sendMessage(error.message, threadID);
        }
    },

    onLaunch: async function ({ event, target, api }) {
        const { messageID, threadID } = event;
        const id = event.senderID;

        if (!target[0]) return api.sendMessage("Please provide your question.\n\nExample: llama what is the solar system?", threadID, messageID);

        const haha = await api.sendMessage("🔎 Searching for an answer. Please wait...", threadID, messageID);

        try {
            const response = await llamaAPI.getReply(target.join(" "));
            const result = response;
            api.editMessage(`𝗔𝗜 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━`, haha.messageID, threadID, event.messageID);

            global.client.onReply.push({
                name: this.name,
                messageID: messageID,
                author: event.senderID,
            });

        } catch (error) {
            console.error(error);
            api.editMessage(error.message, haha.messageID, threadID, messageID);
        }
    }
};
