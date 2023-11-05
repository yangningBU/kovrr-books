const SearchBar = ({search, handleChange}) => {
  const onChange = (e) => {
    const newValue = e.target.value
    handleChange(newValue)
  }
  return (
    <div id="search-bar">
      <input type="text" onChange={onChange} value={search} />
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  )
}

export default SearchBar