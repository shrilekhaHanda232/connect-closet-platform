import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function useSyncReduxWithQueryParam({
  selector,
  actionCreator,
  paramName,
  serializer = (value) => value,
  deserializer = (value) => value,
}) {
  const dispatch = useDispatch();
  const value = useSelector(selector);
  const [searchParams, setSearchParams] = useSearchParams();

  // On mount, initialize redux state from URL param if different
  useEffect(() => {
    const paramValue = searchParams.get(paramName);
    if (paramValue !== null) {
      const deserializedValue = deserializer(paramValue);
      if (JSON.stringify(deserializedValue) !== JSON.stringify(value)) {
        dispatch(actionCreator(deserializedValue));
      }
    }
  }, []);

  // Setter which updates redux and URL param
  const setValue = (newValue) => {
    dispatch(actionCreator(newValue));
    if (
      newValue === null ||
      (Array.isArray(newValue) && newValue.length === 0) ||
      newValue === ""
    ) {
      searchParams.delete(paramName);
      setSearchParams(searchParams);
    } else {
      searchParams.set(paramName, serializer(newValue));
      setSearchParams(searchParams);
    }
  };

  return [value, setValue];
}
