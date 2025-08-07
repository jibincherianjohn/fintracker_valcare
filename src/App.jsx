
import './assets/style/style.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './layout/layout'

function App() {

  return (
    <>
    <Toaster/>
   <Layout >
       <Outlet/>

   </Layout>
    </>
  )
}

export default App
