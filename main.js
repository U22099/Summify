import { GoogleGenerativeAI } from "@google/generative-ai";

export async function TextSummary(text, length) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at content summarisation good at giving concise and meaningful summary of contents by preserving key information, main ideas, and essential details omiting unnecessary information, redundant phrases, and trivial details maintaining objectivity and neutrality, avoiding bias and personal opinions ensuring the summary is easy to understand, clear, and free of jargon."
  });

  const prompt = `Generate a ${length} length summarisation of the document below: `;

  try {
    const generatedContent = await model.generateContent(prompt + "\n" + text);
    const response = generatedContent.response.text();
    document.getElementById("output").innerText = response;
  } catch (e) {
    console.log(e)
    return false;
  }
}

TextSummary(`The Curious Life of Albert Einstein

In the quaint town of Ulm, Germany, on March 14, 1879, a spark of genius ignited. Albert Einstein, the future icon of modern physics, was born to Hermann and Pauline Einstein. Little did they know that their curious, mischievous child would one day revolutionize our understanding of space, time, and the universe.

Early Years: A Curious Mind

Young Albert's fascination with science and mathematics began with a compass his father gave him. The mysterious needle, always pointing north, captivated him. He spent hours pondering the invisible forces at play. This curiosity would become the hallmark of his life's work.

As a child, Einstein was a slow learner, but his passion for knowledge drove him to devour books on mathematics, physics, and philosophy. He taught himself calculus, geometry, and astronomy, often neglecting his schoolwork. His parents worried, but Albert's thirst for knowledge couldn't be contained.

*The Swiss Years: Education and Inspiration*

In 1894, Einstein moved to Switzerland to attend the Swiss Federal Polytechnic University. Here, he immersed himself in theoretical physics, studying the works of Maxwell, Lorentz, and Planck. His imagination was sparked by the ideas of space and time.

During his studies, Einstein befriended Michele Besso, a fellow physicist who shared his enthusiasm for theoretical discussions. These conversations laid the groundwork for some of Einstein's most groundbreaking ideas.

*Patent Clerk and Theoretical Physicist*

After graduating, Einstein struggled to find academic employment. He took a job as a patent clerk in Bern, Switzerland, evaluating inventions related to electrical and mechanical engineering. This seemingly mundane work allowed him to ponder the mysteries of the universe.

In 1905, Einstein's annus mirabilis (miracle year), he published four revolutionary papers:

1. *Special Relativity*: Introduced the concept of time dilation and length contraction.
2. *Photoelectric Effect*: Explained the behavior of light and electrons.
3. *Brownian Motion*: Provided evidence for the existence of atoms.
4. *Equivalence of Energy and Mass*: Proposed the famous equation E=mc².

*Rise to Fame and International Recognition*

Einstein's work caught the attention of the scientific community. In 1915, he expanded his theory of relativity to include gravity with his *General Theory of Relativity*. This groundbreaking work predicted phenomena such as gravitational waves and black holes.

As his reputation grew, so did his travels. Einstein lectured in Europe, Asia, and the United States, spreading his ideas and inspiring a new generation of physicists.

*Personal Life and Turbulent Times*

Einstein's personal life was marked by turmoil. He married Mileva Marić in 1903, and they had two sons, Hans Albert and Eduard. However, their relationship was complicated, and they divorced in 1919. Einstein later married Elsa Löwenthal.

During World War I, Einstein's pacifist views and Jewish heritage made him a target for anti-Semitic attacks. He emigrated to the United States in the 1930s, settling in Princeton, New Jersey.

*Later Years: Reflections and Legacy*

In his later years, Einstein continued to work on unified field theories, seeking to merge gravity, electromagnetism, and the strong and weak nuclear forces. Though he didn't complete this quest, his efforts paved the way for modern physics.

As the world faced the threat of nuclear war, Einstein's voice resonated against the development of atomic bombs. His famous letter to President Franklin D. Roosevelt warned of the dangers of nuclear proliferation.

On April 18, 1955, Albert Einstein passed away, leaving behind a legacy that transformed humanity's understanding of the universe.

*Einstein's Legacy*

Today, Einstein's theories underpin modern physics, from GPS technology to cosmology. His name has become synonymous with genius, inspiring generations to explore the mysteries of the universe.

As we reflect on Einstein's life, we're reminded that curiosity, creativity, and perseverance can lead to revolutionary breakthroughs. His story encourages us to challenge conventional wisdom, explore the unknown, and push the boundaries of human knowledge.`,"medium");