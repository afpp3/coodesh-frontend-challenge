import Image from 'next/image'
import { Patient } from '../Table'

type ModalProps = {
  showModal: boolean
  closeModal: () => void
  patient: Patient
}

export const Modal = ({ showModal, closeModal, patient }: ModalProps) => {
  if (!showModal) {
    return null
  }

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="modal-content w-3/4 md:w-auto bg-white text-sm md:text-base xl:text-xl text-center py-8 px:8 md:px-20 rounded-md">
        <div className="modal-header my-0 mx-auto md:max-w-2xl">
          <Image
            className="rounded-full relative bottom-20"
            src={patient.picture.large}
            alt={patient.name.first}
            height={162}
            width={162}
          />
          <h1 className="text-center my-5 font-semibold">{`${patient.name.first} ${patient.name.last}`}</h1>
          <h2 className="font-medium">Id: {patient.login.uuid}</h2>
        </div>

        <div className="modal-body">
          <ul>
            <li className="py-1">Email: {patient.email}</li>
            <li className="py-1">Gênero: {patient.gender}</li>
            <li className="py-1">
              Data de nascimento:{' '}
              {new Date(patient.dob.date).toLocaleDateString()}
            </li>
            <li className="py-1">Telefone: {patient.cell}</li>
            <li className="py-1">Nacionalidade: {patient.nat}</li>
            <li className="py-1">Endereço: {patient.location.street.name}</li>
          </ul>
        </div>
        <button
          className="mt-8 px-10 py-1 rounded-md bg-blue-300 hover:bg-blue-500 transition duration-300"
          onClick={closeModal}
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
