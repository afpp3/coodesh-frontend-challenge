import { useCallback, useEffect, useMemo, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { useFetch } from '~/hooks/useFetch'
import { Modal } from '../Modal'

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

const Table = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalPatient, setModalPatient] = useState<Patient>(Object)

  const [patients, setPatients] = useState<Patient[]>([])
  const [page, setPage] = useState(1)

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

  const loadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1)
  }, [])

  const showPatient = useCallback((patient: Patient) => {
    setModalPatient(patient)
    setShowModal(true)
  }, [])

  if (patients.length < 1) {
    return <h1 className="my-8 mx-auto">Loading...</h1>
  }

  return (
    <>
      {modalPatient && (
        <Modal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          patient={modalPatient}
        />
      )}

      <table className="shadow-lg bg-white text-sm md:text-base xl:text-xl">
        <thead>
          <tr>
            <th className="bg-blue-200 border text-center px-4 py-2 md:px-8 md:py-4">
              Name
            </th>
            <th className="bg-blue-200 border text-center px-4 py-2 md:px-8 md:py-4">
              Gender
            </th>
            <th className="bg-blue-200 border text-center px-4 py-2 md:px-8 md:py-4">
              Birth
            </th>
            <th className="bg-blue-200 border text-center px-4 py-2 md:px-8 md:py-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              className="border px-8 py-4 text-center even:bg-blue-100 "
              key={patient.login.uuid}
            >
              <td className="py-2">{patient.name.first}</td>
              <td className="py-2">{patient.gender}</td>
              <td className="py-2">
                {new Date(patient.dob.date).toLocaleDateString()}
              </td>
              <td className="py-2">
                <button
                  type="button"
                  className="bg-blue-300 px-2 sm:px-8 lg:px-10 py-1 rounded-md transition duration-300 hover:bg-blue-500"
                  onClick={() => showPatient(patient)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {patients.length > 1 && (
        <button
          className="flex justify-center items-center mb-5 text-base md:text-xl"
          onClick={loadMore}
        >
          <AiOutlineReload size={20} className="mr-2" />
          Loading More..
        </button>
      )}
    </>
  )
}

export default Table
