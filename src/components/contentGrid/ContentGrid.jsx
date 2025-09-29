import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContents } from "../../store/features/contentSlice";
import ContentCard from "../contentCard/ContentCard";

import "./ContentGrid.scss";

export default function ContentGrid({ visibleItems }) {
  const dispatch = useDispatch();
  const { items, status, pricingOptionApplied, query, sortBy, priceRange } =
    useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContents());
  }, [dispatch]);

  // Memoized filtering and sorting
  const displayItems = useMemo(() => {
    if (visibleItems) return visibleItems;

    return items
      .reduce((acc, item) => {
        const matchesPricingOption =
          pricingOptionApplied.length === 0 ||
          pricingOptionApplied.includes(item.pricingOption);
        const matchesQuery =
          query === "" ||
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.creator.toLowerCase().includes(query.toLowerCase());

        const priceFilterActive =
          pricingOptionApplied.includes(0) && pricingOptionApplied.length === 1; //if pricing Option is "Paid"
        const matchesPriceRange = priceFilterActive
          ? item.price >= priceRange[0] && item.price <= priceRange[1]
          : true;

        if (matchesPricingOption && matchesQuery && matchesPriceRange) {
          acc.push(item);
        }

        return acc;
      }, [])
      .sort((a, b) => {
        switch (sortBy) {
          case "highPrice":
            return b.price - a.price;
          case "lowPrice":
            return a.price - b.price;
          case "name":
          default:
            return a.title.localeCompare(b.title);
        }
      });
  }, [items, pricingOptionApplied, query, sortBy, priceRange, visibleItems]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading content.</div>;

  return (
    <div className="content-grid">
      {displayItems.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  );
}
