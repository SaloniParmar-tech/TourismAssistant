// src/gemini.js
export async function askGemini(prompt) {
  try {
    const res = await fetch("http://localhost:5000/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.answer;
  } catch (err) {
    console.error("Error calling backend Gemini route:", err);
    return "Something went wrong ❌";
  }
}

// // src/gemini.js
// export async function askGemini(prompt) {
//   try {
//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
//         import.meta.env.VITE_GEMINI_API_KEY,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [{ text: prompt }],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();
//     // Return the AI response text
//     return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
//   } catch (error) {
//     console.error("Error calling Gemini API:", error);
//     return "Something went wrong ❌";
//   }
// }
