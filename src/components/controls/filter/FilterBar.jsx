import PriceRangeSlider from "./PriceRangeSlider";
import { setFilter } from "../../../store/features/contentSlice";

import { useSyncReduxWithQueryParam } from "../../../hooks/useSyncReduxWithQueryParam";
import { PRICING_OPTIONS } from "../../../constants";
import "./FilterBar.scss";

export default function FilterBar() {
  const [selectedFilters, setSelectedFilters] = useSyncReduxWithQueryParam({
    selector: (state) => state.content.pricingOptionApplied,
    actionCreator: setFilter,
    paramName: "filters",
    serializer: (arr) => arr.join(","),
    deserializer: (val) => val.split(",").map(Number),
  });

  const selectionHandler = (checked, option) => {
    if (checked) {
      setSelectedFilters([...selectedFilters, option]);
    } else {
      setSelectedFilters(selectedFilters.filter((f) => f !== option));
    }
  };

  const resetFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="filter-bar">
      <div className="filters">
        <span>Pricing Option</span>
        {PRICING_OPTIONS.map((option) => (
          <label className="pricing-option" key={option.value}>
            <input
              type="checkbox"
              value={option.value}
              checked={selectedFilters.includes(option.value)}
              onChange={(e) => selectionHandler(e.target.checked, option.value)}
            />
            <span class="checkmark"></span>
            {option.label}
          </label>
        ))}
        {selectedFilters.includes(0) && selectedFilters.length === 1 && (
          <PriceRangeSlider />
        )}
      </div>
      <button className="reset-btn" onClick={resetFilters}>
        RESET
      </button>
    </div>
  );
}
