const Contact = ({ contact, deleteContact, editContact }) => {
  return (
    <>
      <tr className=' bg-orange-50 font-medium' key={contact.id}>
        <td className='text-left px-5 py-4 whitespace-nowrap'>
          <div className='text-lg text-gray-500'>{contact.firstName}</div>
        </td>
        <td className='text-left px-5 py-4 whitespace-nowrap'>
          <div className='text-lg text-gray-500'>{contact.lastName}</div>
        </td>
        <td className='text-left px-5 py-4 whitespace-nowrap'>
          <div className='text-lg text-gray-500'>{contact.emailId}</div>
        </td>
        <td className='text-left px-5 py-4 whitespace-nowrap'>
          <div className='text-lg text-gray-500'>{contact.phone_number}</div>
        </td>
        <td className='text-center space-x-2 py-4 whitespace-nowrap'>
          <a>
            <button
              onClick={(e, id) => editContact(e, contact.id)}
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-800 rounded'
            >
              Edit
            </button>
          </a>
          <a>
            <button
              onClick={(e, id) => deleteContact(e, contact.id)}
              className=' bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 border-b-4 border-red-700 hover:border-red-800 rounded'
            >
              Delete
            </button>
          </a>
        </td>
      </tr>
    </>
  )
}

export default Contact
