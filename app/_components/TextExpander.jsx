// Use client since we are using client logic using hooks etc.
"use client";

import { useState } from "react";

// @@@ Client Components can import "Server Components" as long as they can also run in the browser (they don't use Server-Only features).
// Logo is a server component but it doesn't perform any server logic (data fetching etc.)
// Therefore we can import it 'inside' this client component.
// import Logo from "./Logo";

export default function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
      {/* Any Component imported into a Client Component is forced to be treated as a Client Component. */}
      {/* @@@ If Logo performed any server logic then to use it inside this CC we would have to pass it as prop or children and then use it. In that case it will still be a SC as it is passed down and not imported inside this CC */}
      {/* <Logo /> */}
    </span>
  );
}
