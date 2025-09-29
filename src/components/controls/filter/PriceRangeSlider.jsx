import { useDispatch, useSelector } from "react-redux";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { setPriceRange } from "../../../store/features/contentSlice";

const PriceRangeSlider = () => {
  const dispatch = useDispatch();

  const range = useSelector((state) => state.content.priceRange);

  const priceRangeHandler = (newRange) => {
    dispatch(setPriceRange(newRange));
  };

  return (
    <div className="price-range-slider">
      <div className="range-cont">${range[0]}</div>
      <RangeSlider
        value={range}
        onInput={priceRangeHandler}
        min={0}
        max={999}
      />
      <div className="range-cont">
        ${range[1]}
        {range[1] >= 999 ? "+" : ""}
      </div>
    </div>
  );
};

export default PriceRangeSlider;
