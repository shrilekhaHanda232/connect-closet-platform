import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { setQuery } from "../../../store/features/contentSlice";
import { useSyncReduxWithQueryParam } from "../../../hooks/useSyncReduxWithQueryParam";

import "./SearchBar.scss";

export default function SearchBar() {
  const [query, setQueryState] = useSyncReduxWithQueryParam({
    selector: (state) => state.content.query,
    actionCreator: setQuery,
    paramName: "query",
  });

  const setQueryHandler = (e) => {
    setQueryState(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Find the Items you're looking for"
        value={query}
        onChange={setQueryHandler}
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
    </div>
  );
}
