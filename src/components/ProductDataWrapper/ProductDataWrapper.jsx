import useProductData from "../../hooks/useProductData";
import LoadingSpinner from "../LoadingSpinner";
import ErrorBox from "../ErrorBox";

export default function ProductDataWrapper({ renderItem }) {
  const { products, isLoading, error } = useProductData();
  if (isLoading) {
    return <LoadingSpinner />;
  } else if (error) {
    return <ErrorBox error={error} />;
  } else {
    return renderItem(products);
  }
}
