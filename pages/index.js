import Head from 'next/head'
import AddContact from '../components/AddContact'
import ContactList from '../components/ContactList'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Contactly.io</title>
      </Head>
      <Navbar />
      <main>
        <AddContact/>
      </main>
    </div>
  )
}
