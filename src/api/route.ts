// app/api/route.ts
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { ChatMessage } from '@azure/openai/rest';
import { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'nodejs';
// This is required to enable streaming
export const dynamic = 'force-dynamic';

const systemMessage: ChatMessage = {role: "system", content: `We are about to start playing Game of Life. Please generate random starting state and then iteration number.

  The format is starting state must be 0 and 1 matrix in markdown code block, where 0 means dead cell and 1 represents life cell.
  Matrix should have any number of columns between 20 and 100 and any number of rows between 20 and 100. Then comes single number number of iteration to generate between 1 and 100000.

  Don't use natural language.`};

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<string>
) {
    // Get data from your database
    res.status(200).json('hello user 2222')
}

export async function GET() {
  console.log(process.env.GPT_TOKEN);
  const configuration = new AzureKeyCredential(process.env.GPT_TOKEN || 'GPT_TOKEN');
  const openai = new OpenAIClient(configuration);

  let responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  writer.write(encoder.encode(systemMessage.content || ''));

  try {
    const events = await openai.listChatCompletions(
      "gpt-4",
      [systemMessage],
      {
        temperature: 0,
        stream: true,
      }
    );

    for await (const event of events) {
        for (const choice of event.choices) {
          const message = choice.delta?.content;
          if (message) {
            if (message === '[DONE]') {
                console.log('Stream completed');
                writer.close();
                return;
            }
            try {
                await writer.write(encoder.encode(message));
            } catch (error) {
                console.error('Could not JSON parse stream message', message, error);
            }
          }
        }
      }

    // openaiRes.data.on('data', async (data: Buffer) => {
    //   const lines = data
    //     .toString()
    //     .split('\n')
    //     .filter((line: string) => line.trim() !== '');
    //   for (const line of lines) {
    //     const message = line.replace(/^data: /, '');
    //     if (message === '[DONE]') {
    //       console.log('Stream completed');
    //       writer.close();
    //       return;
    //     }
    //     try {
    //       const parsed = JSON.parse(message);
    //       await writer.write(encoder.encode(`${parsed.choices[0].text}`));
    //     } catch (error) {
    //       console.error('Could not JSON parse stream message', message, error);
    //     }
    //   }
    // });
  } catch (error) {
    console.error('An error occurred during OpenAI request', error);
    writer.write(encoder.encode('An error occurred during OpenAI request'));
    writer.close();
  }

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}