const openai = require("openai");
const fs = require("fs");
require("dotenv").config();

async function transcribeAudio(filename, apiKey) {
  try {
    const openAiClient = new openai.OpenAI({ apiKey });

    const transcription = await openAiClient.audio.transcriptions.create({
      file: fs.createReadStream(filename),
      model: "whisper-1",
    });
    return transcription;
  } catch (e) {
    console.error("Error:", e);
  }
}

(async () => {
    const data = await transcribeAudio("audio2.mp3", process.env.OPENAI_API_KEY);
    if (data) {
        fs.writeFileSync("transcription.txt", data.text, "utf8");
        console.log("Transcription saved to transcription.txt");
    }
})();
