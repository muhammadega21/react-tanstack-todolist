import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  completed: boolean | undefined;
  setCompleted: (value: boolean | undefined) => void;
  onSearchChange: () => void;
}

const TodoFilter = ({
  search,
  setSearch,
  completed,
  setCompleted,
  onSearchChange,
}: Props) => {
  const [localSearch, setLocalSearch] = useState(search);

  const [debouncedSearch] = useDebounce(localSearch, 500);

  useEffect(() => {
    if (debouncedSearch !== search) {
      setSearch(debouncedSearch);
      onSearchChange();
    }
  }, [debouncedSearch, search, setSearch, onSearchChange]);

  return (
    <div className="flex items-center gap-x-3 justify-between mb-4">
      <div role="tablist" className="tabs tabs-border text-sm">
        <button
          type="button"
          role="tab"
          className={`tab ${completed === undefined ? "tab-active" : ""}`}
          onClick={() => setCompleted(undefined)}
        >
          All
        </button>
        <button
          type="button"
          role="tab"
          className={`tab ${completed === false ? "tab-active" : ""}`}
          onClick={() => setCompleted(false)}
        >
          To-do
        </button>
        <button
          type="button"
          role="tab"
          className={`tab ${completed === true ? "tab-active" : ""}`}
          onClick={() => setCompleted(true)}
        >
          Completed
        </button>
      </div>
      <div>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Search"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default TodoFilter;
