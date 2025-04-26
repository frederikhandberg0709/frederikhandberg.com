import React from "react";

export function styleHashtags(content: string): React.ReactNode {
  const regex = /(#\w+)/g;
  const parts = content.split(/(\s+)/).flatMap((part) => part.split(regex));

  return (
    <React.Fragment>
      {parts.map((part, index) => {
        if (part.startsWith("#")) {
          return (
            <span key={index} className="font-bold text-blue-500">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </React.Fragment>
  );
}

export default styleHashtags;
