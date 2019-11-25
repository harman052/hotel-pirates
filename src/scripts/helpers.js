export const createHTMLElement = (element, className = null, text = null) => {
  const newElement = document.createElement(element);
  if (typeof className === "string" && className !== null) {
    newElement.setAttribute("class", className);
  }
  if (typeof text === "string" && text !== null) {
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
  }
  return newElement;
};
