document
  .getElementById("giftForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const forWhom = document.getElementById("forWhom").value;
    const age = document.getElementById("age").value;
    const hobbies = document.getElementById("hobbies").value;

    const apiKey = "";
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const prompt = `Suggest some gift ideas for a ${age}-year-old ${forWhom} who enjoys ${hobbies}.`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      const giftIdeas = data.choices[0].message.content;

      // Display the gift ideas
      document.getElementById("giftIdeas").textContent = giftIdeas;
    } catch (error) {
      document.getElementById("giftIdeas").textContent =
        "Error generating gift ideas. Please try again.";
      console.error("Error:", error);
    }
  });
