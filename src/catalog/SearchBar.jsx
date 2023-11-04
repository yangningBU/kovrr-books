const SearchBar = ({search, handleChange}) => {
  const onChange = (e) => {
    const newValue = e.target.value
    console.log("Searching: ", newValue)
    handleChange(newValue)
  }
  return (
    <div id="search-bar">
      <input type="text" onChange={onChange} value={search} />
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  )
}

export default SearchBar