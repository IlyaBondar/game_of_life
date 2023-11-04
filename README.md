# Game of Life

## Task

The task is to develop web chat gpt interface with additional visualization capabilities.

0. Application must be based on **nextjs** framework.
1. Use provided **base_url** and **key** to access the model. (Don't abuse the provided key, as its usage is monitored). See attachment #1 for model access.
2. Web application must use **SSE** transport to render model output stream as it's generated. Pay special attention in handling corner cases.
3. You should implement **social login**.
4. Web application should store history of your conversations (in local storage)
5. In case model output matches format (0&1 matrix in code block followed by single number) run given number of iterations of [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) taking matrix as a start state.
Then render finishing state as a picture and add to model reply. Heavy lifting must be offloaded into **Web Worker** and not affecting UI responsibility. See attachment #2 for prompt example.

Solution must be provided in form of **github** project and **link to a deployed instance**.

## Example of prompt

```text
We are about to start playing Game of Life. Please generate random starting state and then iteration number.

The format is starting state must be 0 and 1 matrix in markdown code block, where 0 means dead cell and 1 represents life cell.
Matrix should have any number of columns between 20 and 100 and any number of rows between 20 and 100. Then comes single number number of iteration to generate between 1 and 100000.

Don't use natural language.
```

### Checklist

- [x] Next JS
- [x] Chat UI
- [x] History in LocalStorage
- [x] SSE with GPT
- [x] Integration with GPT
- [x] Game of Life logic
- [x] WebWorker with Game of Life logic
- [x] Generation of picture
- [x] Social login
- [x] Deployment
- [x] How to access to EPAM AI from vercel.app without VPN ?!!! - Public AI API and token
- [ ] unit-tests - no time(only functional)
- [ ] styling: using MaterialUI and similar - no time(only functional)
