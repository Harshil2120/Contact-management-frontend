import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import ContactList from './ContactList'

const AddContact = () => {
  const CONTACT_API_BASE_URL =
    'https://contact-managementapp.herokuapp.com/api/v1/contacts'
  const [isOpen, setIsOpen] = useState(false)
  const [contact, setContact] = useState({
    id: '',
    firstName: '',
    lastName: '',
    emailId: '',
    phone_number: '',
  })

  const [responseContact, setResponseContact] = useState({
    id: '',
    firstName: '',
    lastName: '',
    emailId: '',
    phone_number: '',
  })

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleChange = (event) => {
    const value = event.target.value
    setContact({ ...contact, [event.target.name]: value })
  }

  const saveContact = async (e) => {
    e.preventDefault()
    const response = await fetch(CONTACT_API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    })
    if (!response.ok) {
      throw new Error('Something went wrong')
    }
    const _contact = await response.json()
    setResponseContact(_contact)
    reset(e)
  }

  const reset = (e) => {
    e.preventDefault()
    setContact({
      id: '',
      firstName: '',
      lastName: '',
      emailId: '',
      phone_number: '',
    })
    setIsOpen(false)
  }
  return (
    <>
      <ContactList contact={responseContact} />
      <div className='container mx-auto my-3'>
        <div className='h-4 flex flex-col justify-center items-center'>
          <button
            onClick={openModal}
            className='bg-green-500 rounded-sm px-2 text-white py-2 shadow-md font-semibold hover:bg-green-600'
          >
            + Add Contact
          </button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-28 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md'>
                <Dialog.Title
                  as='h2'
                  className='text-lg text-center font-medium leading-6 text-gray-900'
                >
                  Add Contact
                </Dialog.Title>
                <div className='flex max-w-md max-auto'>
                  <div className='py-2'>
                    <div className='h-14 my-4'>
                      <label className='block text-gray-600 text-sm font-normal'>
                        First Name
                      </label>
                      <input
                        type='text'
                        name='firstName'
                        value={contact.firstName}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2'
                      ></input>
                    </div>
                    <div className='h-14 my-4'>
                      <label className='block text-gray-600 text-sm font-normal'>
                        Last Name
                      </label>
                      <input
                        type='text'
                        name='lastName'
                        value={contact.lastName}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2'
                      ></input>
                    </div>
                    <div className='h-14 my-4'>
                      <label className='block text-gray-600 text-sm font-normal'>
                        Email Id
                      </label>
                      <input
                        type='text'
                        name='emailId'
                        value={contact.emailId}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2'
                      ></input>
                    </div>
                    <div className='h-14 my-4'>
                      <label className='block text-gray-600 text-sm font-normal'>
                        Phone Number
                      </label>
                      <input
                        type='text'
                        name='phone_number'
                        value={contact.phone_number}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2'
                      ></input>
                    </div>
                    <div className='h-14 my-4 space-x-4 pt-4 flex flex-row items-center justify-center'>
                      <button
                        onClick={saveContact}
                        className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'
                      >
                        Save
                      </button>
                      <button
                        onClick={reset}
                        className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6'
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default AddContact
