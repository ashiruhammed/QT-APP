import { JSX, SVGProps, useState } from "react";
import { RadioGroup } from "@headlessui/react";

export default function PreviewOptions({ options }: { options: string[] }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="w-full px-4 py-8">
      <div className="w-full">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-4">
            {options.map((plan, i) => (
              <RadioGroup.Option
                key={i}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white/60 ring-offset-2 bg-gray-800"
                      : ""
                  }
                  ${checked ? "bg-gray-800 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }>
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm md:text-base">
                          <RadioGroup.Label
                            as="p"
                            aria-label={"Choose Option " + plan}
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}>
                            {plan}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
