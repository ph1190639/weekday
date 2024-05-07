// utils.js

export const truncateAndFade = (text, maxLength, fadeLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    const truncatedText = text.substring(0, maxLength);
    const fadedText = truncatedText.substring(0, maxLength - fadeLength) + '...';
    return fadedText;
  }
};
