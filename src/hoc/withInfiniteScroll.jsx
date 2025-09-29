import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function withInfiniteScroll(WrappedComponent, options) {
  const { pageSize = 20 } = options;

  return function InfiniteScrollWrapper(props) {
    const [page, setPage] = useState(1);
    const [visibleItems, setVisibleItems] = useState([]);

    // filterItems is a function passed via props that returns filtered full item list
    const allFilteredItems = props.filterItems();

    useEffect(() => {
      setPage(1);
      setVisibleItems(allFilteredItems.slice(0, pageSize));
    }, [allFilteredItems]);

    const fetchMoreData = () => {
      const nextPage = page + 1;
      setVisibleItems(allFilteredItems.slice(0, nextPage * pageSize));
      setPage(nextPage);
    };

    return (
      <InfiniteScroll
        dataLength={visibleItems.length}
        next={fetchMoreData}
        hasMore={visibleItems.length < allFilteredItems.length}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.9}
        style={{ overflow: "visible" }}
      >
        <WrappedComponent {...props} visibleItems={visibleItems} />
      </InfiniteScroll>
    );
  };
}
