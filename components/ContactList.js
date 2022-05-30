import { useState, useEffect } from 'react'
import Contact from './Contact'
import EditContact from './EditContact'

const ContactList = ({ contact }) => {
  const CONTACT_API_BASE_URL =
    'https://contact-managementapp.herokuapp.com/api/v1/contacts'
  const [contacts, setContacts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [contactId, setContactId] = useState(null)
  const [responseContact, setResponseContact] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(CONTACT_API_BASE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const contacts = await response.json()
        setContacts(contacts)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [contact, responseContact])

  const deleteContact = (e, id) => {
    e.preventDefault()
    fetch(CONTACT_API_BASE_URL + '/' + id, {
      method: 'DELETE',
    }).then((res) => {
      if (contacts) {
        setContacts((prevElement) => {
          return prevElement.filter((contact) => contact.id !== id)
        })
      }
    })
  }

  const editContact = (e, id) => {
    setContactId(id)
  }

  return (
    <>
      <div className='container mx-auto my-8'>
        <div className='flex'>
          <table className=' min-w-full'>
            <thead className=' bg-rose-900 text-white text-lg shadow'>
              <tr>
                <th className='text-left font-medium uppercase tracking-wide py-3 px-5'>
                  First Name
                </th>
                <th className='text-left font-medium uppercase tracking-wide py-3 px-5'>
                  Last Name
                </th>
                <th className='text-left font-medium uppercase tracking-wide py-3 px-5'>
                  Email-Id
                </th>
                <th className='text-left font-medium uppercase tracking-wide py-3 px-5'>
                  Phone Number
                </th>
                <th className='text-center font-medium uppercase tracking-wide py-3 px-5'>
                  Actions
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody className='shadow'>
                {contacts?.map((contact) => (
                  <Contact
                    contact={contact}
                    key={contact.id}
                    deleteContact={deleteContact}
                    editContact={editContact}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <EditContact
        contactId={contactId}
        setResponseContact={setResponseContact}
      />
    </>
  )
}

export default ContactList
