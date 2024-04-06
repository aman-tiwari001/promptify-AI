export const formatText = (text) => {
  const lines = text.split('\n'); // Split the text into lines
  const formattedLines = lines.map((line, index) => {
    if (line.startsWith('*')) {
      // If the line starts with '*', render it as a list item
      return <li key={index}>{line.slice(1)}</li>;
    } else if (line.startsWith('**')) {
      // If the line starts with '**', render it as a subheading
      return <h3 key={index}>{line.slice(2)}</h3>;
    } else if (line.startsWith('***')) {
      // If the line starts with '***', render it as a sub-subheading
      return <h4 key={index}>{line.slice(3)}</h4>;
    } else {
      // Otherwise, render it as a paragraph
      return <p key={index}>{line}</p>;
    }
  });
  return formattedLines;
};
