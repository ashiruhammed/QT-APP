import React from "react";

function Option({
  opt,
  id,
  removeOption,
}: {
  opt: string;
  id: number;
  removeOption?: (id: number) => void;
}) {
  return (
    <li className="cursor-pointer py-2 border flex items-center gap-2 rounded-md">
      <button
        aria-label="remove option"
        className="px-2 cursor-pointer"
        onClick={() => {
          removeOption && removeOption(id);
        }}>
        &#10060;
      </button>
      <p tabIndex={0} aria-label={opt}>
        {opt}
      </p>
    </li>
  );
}

export default Option;
