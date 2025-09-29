import { fetchContents } from "../../store/features/contentSlice";
import withInfiniteScroll from "../../hoc/withInfiniteScroll";
import ContentGrid from "./ContentGrid";

const selectContent = (state) => state.content;

const filterFunction = (item, contentState) => {
  const { pricingOptionApplied, query } = contentState;
  const matchesPricingOption =
    pricingOptionApplied.length === 0 ||
    pricingOptionApplied.includes(item.pricingOption);

  const matchesQuery =
    query === "" ||
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.creator.toLowerCase().includes(query.toLowerCase());

  return matchesPricingOption && matchesQuery;
};

const InfiniteContentGrid = withInfiniteScroll(ContentGrid, {
  fetchAction: fetchContents,
  selectContent,
  filterFunction,
});

export default InfiniteContentGrid;
