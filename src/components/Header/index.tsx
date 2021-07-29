import Image from 'next/image'
import { BsPerson } from 'react-icons/bs'

const Header = () => {
  return (
    <header className="flex items-center justify-between mx-10">
      <Image src="/logo.svg" width={164} height={90} alt="Pharma Inc" />

      <BsPerson size={44} />
    </header>
  )
}

export default Header
