import { useCallback, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Table from '../components/Table'
import SearchInput from '../components/SearchInput'
import { useFetch } from '~/hooks/useFetch'
import { Loader } from '~/components/Loader'

export type Patient = {
  login: {
    username: string
    uuid: string
  }
  name: {
    first: string
    last: string
    title: string
  }
  email: string
  cell: string
  phone: string
  gender: string
  dob: {
    age: number
    date: Date
  }
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
  location: {
    city: string
    country: string
    postcode: number
    state: string
    street: {
      name: string
      number: number
    }
  }
}

type DataFetch = {
  results: Patient[]
  info: {
    page: number
    seed: string
    version: string
  }
}

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [page, setPage] = useState(1)
  const [queryText, setQueryText] = useState('')

  const LIMIT_RESULTS = 50
  const SEED = '2f10116f1799d353'

  const { data } = useFetch<DataFetch>(
    `/?page=${page}&results=${LIMIT_RESULTS}&seed=${SEED}`
  )

  const result = useMemo(
    () => (data ? ([] as Patient[]).concat(...data.results) : []),
    [data]
  )

  useEffect(() => {
    setPatients((prevPatients) => [...prevPatients, ...result])
  }, [result])

  const lowerCaseQuery = queryText.toLowerCase()
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.first.toLowerCase().includes(lowerCaseQuery) ||
      patient.name.last.toLowerCase().includes(lowerCaseQuery) ||
      patient.nat.toLowerCase().includes(lowerCaseQuery)
  )

  const loadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1)
  }, [])

  const handleSearch = (text: string) => {
    setQueryText(text)
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

        <SearchInput value={queryText} onChange={handleSearch} />

        {patients.length < 1 ? (
          <Loader />
        ) : (
          <Table
            patients={queryText.length < 1 ? patients : filteredPatients}
            loadMore={loadMore}
          />
        )}
      </main>
    </div>
  )
}
