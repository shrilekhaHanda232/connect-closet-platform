import { SORT_OPTIONS } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";

import { setSortBy } from "../../../store/features/contentSlice";
import "./SortDropdown.scss";

export default function SortDropdown() {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.content.sortBy);

  const sortByHandler = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select">Sort by</label>
      <select id="sort-select" value={sortBy} onChange={sortByHandler}>
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
