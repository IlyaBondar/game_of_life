import { systemValue } from '@/utils/constants';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { NextRequest } from 'next/server';
import { v4 as uuid } from 'uuid';

// export const runtime = 'nodejs';
// export const runtime = 'edge' // 'nodejs' is the default
// This is required to enable streaming
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const url = new URL(req.url || '');
  const messagesParam = url.searchParams.get('messages');
  const messages = messagesParam ? JSON.parse(messagesParam) : [systemValue];

  const responseStream = new TransformStream();

  const writer = responseStream.writable.getWriter();

  setTimeout(async () => { // to allow stream be opened on front-end
    try {
      if(!process.env.GPT_URL || !process.env.GPT_TOKEN) {
        throw new Error('Please, provide GPT_URL and GPT_TOKEN');
      }
      const gptUrl = process.env.GPT_URL || '<GPT_URL>'
      const configuration = new AzureKeyCredential(process.env.GPT_TOKEN || '<GPT_TOKEN>');
      const openai = new OpenAIClient(gptUrl, configuration);

      const events = await openai.listChatCompletions(
        "gpt-4",
        messages,
        {
          temperature: 0,
          stream: true,
        }
      );
      await writer.ready;
      for await (const event of events) {
          for (const choice of event.choices) {
            const delta = choice.delta?.content;
            console.log('stream message: ', delta);
            if (delta !== undefined) {
                  writer.write(`data:${btoa(delta || '')}\nid:${uuid()}\n\n`);
            }
          }
        }
        writer.write(`event:end\ndata:end\nid:${uuid()}\n\n`);
        writer.close();
    } catch (error) {
      const errorMessage = 'An error occurred during OpenAI request';
      console.error(errorMessage, error);
      writer.write(`data:${btoa(errorMessage)}\nid:${uuid()}\n\n`);
      writer.write(`event:error\ndata:${JSON.stringify(error)}\nid:${uuid()}\n\n`);
      writer.close();
    }
  });

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}