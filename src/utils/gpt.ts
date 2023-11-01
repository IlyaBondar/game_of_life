// It's up to you to use the library or not. This sample only for demonstration.
// See for API reference: https://learn.microsoft.com/en-us/azure/ai-services/openai/reference
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

export default async function main(){
  debugger;
  const client = new OpenAIClient(
    //   "https://ai-proxy.epam-rail.com",
      "https://ai-proxy.lab.epam.com",
      new AzureKeyCredential('a472736078e04b349e3e791de629499a')
  );

  const messages = [{role: "system", content: `We are about to start playing Game of Life. Please generate random starting state and then iteration number.

  The format is starting state must be 0 and 1 matrix in markdown code block, where 0 means dead cell and 1 represents life cell.
  Matrix should have any number of columns between 20 and 100 and any number of rows between 20 and 100. Then comes single number number of iteration to generate between 1 and 100000.

  Don't use natural language.`}];
// Request key here https://chat.lab.epam.com/#requestApiKey and dm Aliaksei Vavilau for quick approve
  const events = client.listChatCompletions(
    // "gpt-4",
    "gpt-35-turbo",
    messages
  );

  let resp = "";
  for await (const event of events) {
    for (const choice of event.choices) {
      const delta = choice.delta?.content;
      if (delta !== undefined) {
        resp += delta;
      }
    }
  }
  console.log(resp);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
