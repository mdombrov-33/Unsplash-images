import { useGlobalContext } from "./context";

function SearchForm() {
  const { setSearchTerm } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    //don't use controlled inputs, access value with elements instead
    //console.log(e.target.elements, search matches the name attribute in input)
    const searchValue = e.target.search.value;
    if (!searchValue) return;
    setSearchTerm(searchValue);
  };

  return (
    <div>
      <section>
        <h1 className="title">unsplash images</h1>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="form-input search-input"
            type="text"
            name="search"
            placeholder="cat"
          />
          <button className="btn" type="submit">
            search
          </button>
        </form>
      </section>
    </div>
  );
}

export default SearchForm;
