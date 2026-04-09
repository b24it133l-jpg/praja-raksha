export default function AIAssistantPage() {
  const messages = [
    {
      role: "assistant",
      text: "Hello, I can help you choose the right complaint category and explain the process.",
    },
    {
      role: "user",
      text: "There is no light on my street and it feels unsafe at night.",
    },
    {
      role: "assistant",
      text: "This likely belongs to Street Lights and may need higher priority if the area feels unsafe.",
    },
  ];

  return (
    <section className="glass-card rounded-[32px] p-8 md:p-10">
      <p className="section-label">AI Assistant</p>
      <h2 className="mt-3 text-3xl font-semibold text-[#0A1F17]">
        Guided support experience
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#3E4F45]">
        This module will later support live AI guidance, category help, and complaint drafting assistance.
      </p>

      <div className="mt-8 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-2xl rounded-[24px] px-5 py-4 ${
              message.role === "assistant"
                ? "bg-white text-[#0A1F17]"
                : "ml-auto bg-[#0F5D46] text-white"
            }`}
          >
            <p className="text-sm leading-7">{message.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}