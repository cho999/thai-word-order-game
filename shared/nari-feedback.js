export const nariFaces = {
  cheer: "../../assets/images/nari/chibi/chibi-cheer.png",
  idea: "../../assets/images/nari/chibi/chibi-idea.png",
  surprised: "../../assets/images/nari/chibi/chibi-surprised.png",
  thinking: "../../assets/images/nari/chibi/chibi-thinking.png",
  wink: "../../assets/images/nari/chibi/chibi-wink.png"
};

export function chooseFeedback(comments, key, fallbackKey = "default") {
  const choices = comments[key] || comments[fallbackKey] || [];
  if (!choices.length) return null;
  return choices[Math.floor(Math.random() * choices.length)];
}
