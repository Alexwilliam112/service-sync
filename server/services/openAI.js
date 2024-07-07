'use strict'
const OpenAI = require("openai")
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET
})

module.exports = {
    AutoReply: async (message) => {
        let prompt = `Anda adalah seorang customer service, layani customer anda sesuai dengan norma dan prinsip customer experience yang baik.
        Saat ini user berkata: ${message}`

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": `${prompt}` }],
        });

        const gptResponse = chatCompletion.choices[0].message
        if (typeof (gptResponse.content) !== 'string') {
            return 'Mohon tunggu,..'
        }

        return gptResponse.content
    }
}