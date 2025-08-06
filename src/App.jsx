
import './assets/style/style.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster/>
   <div className=' ' >
       <Outlet/>

   </div>
    </>
  )
}

export default App
