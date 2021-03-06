
//Imports from MaterialUI
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/loadingButton'

//Import css files
import styles from '../styles/Home.module.css'

//Import third party from react and nextjs
import {io} from 'socket.io-client'
import {sendNoti} from '../lib/notification.js'
import {redirectPage} from '../lib/utils.js'

//import react/nextjs items
import {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'

const socket = io('http://localhost:4000')

socket.on('send noti', sendNoti)
socket.on('redirect user', redirectPage)

export default function Home() {
  const [Name, setName] = useState('');
  const sendUsername = (e) =>{ 
    e.preventDefault()
    let usernameTB = document.getElementById('outlined-username')
    if ( usernameTB.value === '' ) {
      sendNoti('Please enter a username', 'fail')
      return
    }

    console.log(usernameTB.value)
    socket.emit('Create Room', usernameTB.value)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>SkribGuesser</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className="HeaderTitle">SkribGuesser</h1>
      </header>

      {/* <div className='notiBox'></div> */}

      <main className={styles.main}>
        <form>
          <TextField required id='outlined-username' label="Username" variant='outlined'/>
          <br/><br/><br/>
          <LoadingButton type='submit' variant='outlined' onClick={sendUsername}>Create Room</LoadingButton>
        </form>
      </main>


      <footer className={styles.footer}>
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by: Alex Rosales
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
