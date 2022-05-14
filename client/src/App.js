import React, {useState, useEffect} from 'react';
import './App.css';
import io from 'socket.io-client'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'

const socket = io.connect('http://localhost:4000')

function App() {
  const [loading, setLoading] = React.useState(false)
  const [state, setState] = useState({message: '', name: ''})
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', ({name, message}) => {
      setChat([...chat, {name, message}])
      setLoading(false)
    })
  })

  const onTextChange = (e) => {
    setState({...state, [e.target.name]: e.target.value })

  }

  const onMessageSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const {name, message} = state
    console.log(state)
    socket.emit('message', {name, message})
    setState({ message: "", name })
  }

  const renderChat = () => {
    return chat.map(({name, message}, index) => (
      <div key={index}>
        <h3>{name}: <span>{message}</span></h3>
      </div>
    ))
  }

  return (
    <div className="card">
      <div id='form'>
      <h1>Messenger</h1>
        <div className="name-field">
          <TextField name="name" onChange={e => onTextChange(e)} value={state.name} label="name"/>
        </div>
          <TextField name="message" onChange={e => onTextChange(e)} value={state.message} id="outlined-multiline-static" variant="outlined" label="message"/>
          <LoadingButton name="messageSend" variant="outlined" color='success' loading={loading} loadingPosition='end' size='small' onClick={onMessageSubmit} endIcon={<SendIcon />}>Send Message</LoadingButton>
      </div>


      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
