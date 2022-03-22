import React, { useState, useEffect } from 'react';
import './App.css';

const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
const mic=new SpeechRecognition();
mic.continuous=true;
mic.interimResults=true;
mic.lang='en-US'
function App() {
  const[islisten,setIslisten]=useState(false);
  const [note,setNote]=useState(null);
  const[save,setSave]=useState([])
  useEffect(()=>{
    handleListen()
  
  },[islisten])
  const handleListen=()=>{
    if(islisten){
      mic.start()
      mic.onend=()=>{
        console.log("continur....")
        mic.start()
      }
    }
    else{
      mic.stop()
      mic.onend=()=>{
        console.log("ended mic")
      }
    }
    mic.onstart=()=>{
      console.log("mic is on")
    }
    mic.onresult=e=>{
      const transcript=Array.from(e.results)
      .map(result=>result[0])
      .map(result=>result.transcript)
      .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror=e=>{
        console.log(e.error)
      }
    }
  }
  const handleSave=()=>{
    setSave([...save,note])
    setNote('')
 
  }
  return (
    <>
    <h1 className='texts'>Speech to Text Conversion</h1>
    <div className='container'>
      <div className='box'>

        <h2> Add your  Note here</h2>
        {islisten?<span>MicON</span>:<span>MicOff</span>}
        <button onClick={handleSave} disabled={!note}>Save Note</button>
        <button onClick={()=>setIslisten(prevState=>!prevState)}>On/Off</button>
        <p>{note}</p>
      </div>
      <div className='box'>
        <h2>Collection of Notes</h2>
        {save.map(n=>(
          <>
          {
            
          <p key={n}>{n}</p>
    
           }
          </>
        ))}

      </div>
    </div>
    </>
  );
}

export default App;



// import React, { useState, useEffect } from 'react'
// import './App.css'

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition
// const mic = new SpeechRecognition()

// mic.continuous = true
// mic.interimResults = true
// mic.lang = 'en-US'

// function App() {
//   const [isListening, setIsListening] = useState(false)
//   const [note, setNote] = useState(null)
//   const [savedNotes, setSavedNotes] = useState([])

//   useEffect(() => {
//     handleListen()
//   }, [isListening])

//   const handleListen = () => {
//     if (isListening) {
//       mic.start()
//       mic.onend = () => {
//         console.log('continue..')
//         mic.start()
//       }
//     } else {
//       mic.stop()
//       mic.onend = () => {
//         console.log('Stopped Mic on Click')
//       }
//     }
//     mic.onstart = () => {
//       console.log('Mics on')
//     }

//     mic.onresult = event => {
//       const transcript = Array.from(event.results)
//         .map(result => result[0])
//         .map(result => result.transcript)
//         .join('')
//       console.log(transcript)
//       setNote(transcript)
//       mic.onerror = event => {
//         console.log(event.error)
//       }
//     }
//   }

//   const handleSaveNote = () => {
//     setSavedNotes([...savedNotes, note])
//     setNote('')
//   }

//   return (
//     <>
//       <h1>Voice Notes</h1>
//       <div className="container">
//         <div className="box">
//           <h2>Current Note</h2>
//           {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
//           <button onClick={handleSaveNote} disabled={!note}>
//             Save Note
//           </button>
//           <button onClick={() => setIsListening(prevState => !prevState)}>
//             Start/Stop
//           </button>
//           <p>{note}</p>
//         </div>
//         <div className="box">
//           <h2>Notes</h2>
//           {savedNotes.map(n => (
//             <p key={n}>{n}</p>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default App