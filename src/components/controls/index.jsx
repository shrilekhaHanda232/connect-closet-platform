import FilterBar from "./filter/FilterBar";
import SearchBar from "./search/SearchBar";
import SortDropdown from "./sort/SortDropdown";

import "./index.scss";

function App() {
  return (
    <div className="controls">
      <SearchBar />
      <FilterBar />
      <SortDropdown />
    </div>
  );
}
export default App;
