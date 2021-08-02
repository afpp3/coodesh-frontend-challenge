type SearchInputProps = {
  value: string
  onChange: (string: string) => void
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search..."
      className="border border-black w-full p-2 text-base outline-none"
      aria-label="search"
    />
  )
}

export default SearchInput
