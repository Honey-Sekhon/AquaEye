// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React,{useEffect,useState} from 'react'

export default function App() {
    const [backendData,setBackendData] = useState([{}])
    useEffect(()=>{
        fetch('/api')
        .then(response=>response.json())
        .then(data=>{setBackendData(data)})
    },[])

  return (
    <div>App
            {(typeof backendData.users === 'undefined') ? (
        <>Loading... </>
    ): (
        backendData.users.map((user,i)=>(
            <div key={i}>{user}</div>
        ))
    )}
    </div>
  )
}