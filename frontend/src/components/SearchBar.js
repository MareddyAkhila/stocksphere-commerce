function SearchBar({
  search,
  setSearch
}) {

  return (
    <input
      type="text"
      placeholder=
      "Search products..."
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }

      style={{
        padding: '14px',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '8px',
        border:
        '1px solid #ddd',
        marginBottom:
        '30px'
      }}
    />
  )
}

export default SearchBar