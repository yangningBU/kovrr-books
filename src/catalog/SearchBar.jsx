const SearchBar = ({search, handleChange}) => {
  const onChange = (e) => {
    const newValue = e.target.value
    console.log("Searching: ", newValue)
    handleChange(newValue)
  }
  return (
    <input type="text" onChange={onChange} value={search}/>
  )
}

export default SearchBar