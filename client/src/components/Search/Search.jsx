

const Search = (props) => {
    return (
        <form className="search-form" onSubmit={(e) => props.onSubmit(e)}>
        <input
            className="search-input"
            value=""
            name="Search"
            placeholder="Search"
            type="text"
            autoFocus
        />
        </form>
    );
    };

export default Search;