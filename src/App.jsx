import { useState , useCallback , useEffect, useRef} from 'react'

import './App.css'

function App() {
const [length, setLength] = useState(8);
const [numAllowed, setNumAllowed] = useState(false);
const [charAllowed, setCharAllowed] = useState(false);
const [password, setPassword] = useState('');
const passRef = useRef(null);

const passwordGenerator = useCallback(()=>{
  let pass = "";
  let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numAllowed) str += "0123456789";
  if (charAllowed) str += "!@#$%^&*()_+";

  for(let i = 0; i < length;i++){
 let char = Math.floor(Math.random()* str.length );
 pass += str.charAt(char);
  }
  setPassword(pass);
} , [length, numAllowed, charAllowed]);

const copyPassToClipboard = useCallback(()=>{
  passRef.current?.select();
  window.navigator.clipboard.writeText(password);
}, [password])
useEffect(()=>{passwordGenerator()},[length, numAllowed, charAllowed])
  return (
    <>
     <h1 className="text-4xl text-white text-center mt-10">Password Generator</h1>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white bg-gray-700'><div className='flex shadow rounded-lg overflow-hidden mb-4'>
     <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password'
     readOnly
     ref={passRef} />
     <button
  className="bg-blue-500 text-white mt-1 px-3 py-1 rounded-md hover:bg-blue-700 transition"
  onClick={copyPassToClipboard}
>
  Copy
</button>


      </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>setLength(Number(e.target.value))} />
        <label htmlFor="">Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={numAllowed}
        id='numInput'
        onChange={()=>setNumAllowed(prev => !prev)} />
        <label htmlFor="numInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={charAllowed}
        id='charInput'
        onChange={()=>setCharAllowed(prev=>!prev)} />
        <label htmlFor="charInput">Characters</label>
        </div>
     </div>
      </div>

    </>
  )
}

export default App
