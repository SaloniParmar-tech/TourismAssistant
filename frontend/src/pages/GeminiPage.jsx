import { useState, useRef, useEffect } from "react";
import { askGemini } from "../gemini";

export default function GeminiPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Scroll to latest message automatically
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const userInput = input;
    setInput("");

    // Get Gemini response
    const res = await askGemini(userInput);
    setMessages((prev) => [...prev, { sender: "gemini", text: res }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAsk();
  };

  return (
    <div className="flex flex-col p-6 h-screen">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Tourism Assistant</h1>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800 shadow"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask something about tourism..."
          className="flex-1 border rounded px-3 py-2 focus:outline-none"
        />
        <button
          onClick={handleAsk}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
 

// // src/pages/GeminiPage.jsx
// import { useState } from "react";
// import { askGemini } from "../gemini"; // adjust path since it's in src/

// export default function GeminiPage() {
//   const [input, setInput] = useState("");
//   const [answer, setAnswer] = useState("");

//   const handleAsk = async () => {
//     if (!input.trim()) return;
//     const res = await askGemini(input);
//     setAnswer(res);
//   };

//   return (
//     <div className="p-6 mt-20">
//       <h2 className="text-2xl font-bold mb-4">Tourism Assistant</h2>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask something..."
//           className="border p-2 rounded w-80"
//         />
//         <button
//           onClick={handleAsk}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Ask
//         </button>
//       </div>

//       {answer && (
//         <div className="mt-4 p-4 border rounded bg-gray-50">
//           <strong>Gemini says:</strong>
//           <p>{answer}</p>
//         </div>
//       )}
//     </div>
//   );
// }
