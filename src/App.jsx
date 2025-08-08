
import './assets/style/style.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './layout/layout'
import 'bootstrap/dist/css/bootstrap.min.css';


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
