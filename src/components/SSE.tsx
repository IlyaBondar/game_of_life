"use client";
import { useState, useEffect, MouseEvent } from "react";
import Button from "./Button";
import uniqueId from "lodash-es/uniqueId";
import { Message, MessageRole } from "@/types/types";
import MessageView from "./MessageView";
import { generateUserKey } from "@/utils/utils";

const SSE = () => {
  const [data, setData] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  const startFetching = (e: MouseEvent) => {
    e.preventDefault();
    setIsStarted(true);
  };

  useEffect(() => {
    if (!isStarted) {
      return;
    }

    const key = generateUserKey('user');
    const cache = localStorage.getItem(key);
    const history: Message[] = cache ? JSON.parse(cache) : [];
    const messages = history.map(({ role, content }) => ({ role, content }))

    const eventSource = new EventSource(`/api/gpt?messages=${JSON.stringify(messages)}`);
    eventSource.addEventListener("message", (e) => {
      const value = atob(e.data)
      setData(prevState => `${prevState}${value}`);
    });
    eventSource.addEventListener("end", (e) => {
      console.log("end", e);
      eventSource.close();
    });
    eventSource.addEventListener("open", (e) => {
      console.log("open", e);
    });
    eventSource.addEventListener("error", (e) => {
      eventSource.close();
      console.error(e)
      setIsStarted(false);
    });

    return () => {
      setIsStarted(false);
      eventSource.close();
    };
  }, [isStarted]);

  return <div>
      <Button onClick={startFetching}>Start SSE</Button>
      <div>Answer:</div>
      <MessageView
        content={data}
        id={uniqueId()}
        role={MessageRole.Assistant}
        user="GPT"
      />
  </div>;
};

export default SSE;