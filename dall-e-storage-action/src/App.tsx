import { FormEvent, useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const messages = useQuery(api.messages.list) || [];

  const [newMessageText, setNewMessageText] = useState("");
  const [username, setUsername] = useState("");
  const sendMessage = useMutation(api.messages.send);
  const [sending, setSending] = useState(false);
  const sendDallE = useAction(api.dallE.send);
  var total_prompt = "";

  const [name, setName] = useState(() => "Anonymous");
  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (
      newMessageText.startsWith("/add ")
    ) {
      var lastMessage = " ";
      if (messages.length > 0) {
        lastMessage = messages[messages.length - 1].prompt + ", ";
      }

      const prompt = lastMessage + newMessageText.split(" ").slice(1).join(" ");
      
      setSending(true);
      try {
        await sendDallE({ prompt, author: name });
      } finally {
        setSending(false);
      }
    } else {
      await sendMessage({ body: newMessageText, author: name, format: "text" });
    }
    setNewMessageText("");
  }

  async function handleSetUsername(event: FormEvent) {
    event.preventDefault();
    setName(username);
    setUsername("");
  }
  return (
    <main>
    <div className = "intro">
      <h1>Celebrating you, piece by piece.</h1>
      <img src="/images/cake.png" className="cake" />
      <h3>This is a digital birthday card experience that uses AI to create an evolving, personalized collage based on the memories and sentiments of friends and loved ones.
This project allows people to contribute memories, thoughts, or descriptions about the birthday person. AI analyzes these text inputs (such as memories, personality traits, or preferences) and generates a digital mosaic of personalized artwork that represents the birthday person, creating a unique and interactive birthday card.
</h3>

      <form onSubmit={handleSetUsername}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Write your name..."
        />
        <input type="submit" value="Enter" />
      </form>

      <p className="badge">
        <span>{name}</span>
      </p>
      <div className="instructions">
        To add to the image collage, use <span>/add prompt</span>
      </div>
      <div className="instructions">
        Or just leave a nice note!
      </div>
      <div className="instructions">
        Thanks for contributing to your friend's digital bday gift!
      </div>
      </div>
      
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <span>{message.author}:</span>
            {message.format === "dall-e" ? (
              <figure>
                <img title={message.prompt} src={message.body} />
            
              </figure>
            ) : (
              <span>{message.body}</span>
            )}
          </li>
        ))}
        {sending && (
          <li key="loading">
            <div className="lds-dual-ring"></div>
          </li>
        )}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          value={newMessageText}
          onChange={(event) => setNewMessageText(event.target.value)}
          placeholder="Write a message…"
        />
        <input type="submit" value="Send" disabled={!newMessageText} />
      </form>
    </main>
  );
}
