import { ChangeEvent } from 'react'

type SearchInputProps = {
  value: string
  onChange: (string: string) => void
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  // const [displayValue, setDisplayValue] = useState(value)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
    console.log(value)
  }

  return (
    <input
      type="search"
      value={value}
      onChange={handleChange}
      placeholder="Search..."
      className="border border-black w-full p-2 text-base outline-none"
      aria-label="search"
    />
  )
}

export default SearchInput
