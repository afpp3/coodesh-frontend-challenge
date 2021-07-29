import { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Table from '../components/Table'
import SearchInput from '../components/SearchInput'

export default function Home() {
  // const [patients, setPatients] = useState<Patient[]>([])
  const [text, setText] = useState('')

  // useEffect(() => {
  //   try {
  //     fetch(`https://randomuser.me/api/?results=50`).then(async (response) => {
  //       const data = await response.json()
  //       console.log(data)
  //       setPatients(data.results)
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }, [])

  const handleSearch = (search: string) => {
    setText(search)
  }

  return (
    <div>
      <Head>
        <title>Pacientes | Pharma Inc </title>
      </Head>

      <Header />

      <main className="container flex flex-col  gap-8 mx-auto w-4/5 lg:w-3/5 ">
        <p className="text-sm md:text-lg mt-8 md:mt-16 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas,
          reprehenderit. Rerum, vel? Vel placeat corrupti quibusdam illum
          doloremque voluptate officiis libero aut mollitia culpa.
        </p>

        <SearchInput value={text} onChange={handleSearch} />

        <Table />
      </main>
    </div>
  )
}
