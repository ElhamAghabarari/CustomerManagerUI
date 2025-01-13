const Search = (props) => {
    return(<div>
        <input onChange={props.onChange} placeholder="Search..."
          style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          flex: "1",
        }}/>
        <button onClick={props.onClick} style={{
          padding: "8px 16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}>Search</button>
    </div>);
}
export default Search;