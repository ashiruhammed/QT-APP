import React from "react";

function AddNewOption({ getOption }: { getOption: (opt: string) => void }) {
  const [option, setOption] = React.useState("");
  const [openInput, setOpenInput] = React.useState(false);
  return (
    <>
      {openInput && (
        <div className="flex gap-4 pt-4">
          <input
            type="text"
            placeholder="Add option"
            className="w-full  rounded-md outline-none px-2 py-3 border"
            onChange={(e) => setOption(e.target.value)}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (option) {
                  getOption(option);
                  setOption("");
                  setOpenInput(false);
                }
              }
            }}
          />
          <button
            onClick={(e) => {
              if (option) {
                getOption(option);
                setOption("");
                setOpenInput(false);
              }
            }}>
            Add
          </button>
        </div>
      )}
      {!openInput && (
        <div className="flex justify-end">
          <button
            onClick={() => setOpenInput(true)}
            className="font-bold cursor-pointer">
            Add new option
          </button>
        </div>
      )}
    </>
  );
}

export default AddNewOption;
