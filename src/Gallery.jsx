import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "./context";
import axios from "axios";

const URL = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

function Gallery() {
  const { searchTerm } = useGlobalContext();
  const response = useQuery({
    queryKey: ["images", searchTerm], //use searchTerm to refetch the images, if we don't use it then the images will be cached(only fetched once)
    queryFn: async () => {
      const result = await axios.get(`${URL}&query=${searchTerm}`);
      return result.data;
    },
  });
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h3>Loading...</h3>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h3>Error fetching data</h3>
      </section>
    );
  }

  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h3>No images found</h3>
      </section>
    );
  }

  return (
    <section className="image-container">
      {results.map((image) => {
        return (
          <img
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
}

export default Gallery;
