import { Canvas, useThree } from "@react-three/fiber"
import Experience from "./components/Experience"
import './App.css'
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import Home from "./pages/Home"
import Routers from "./Routers"
import Footer from "./components/Footer"

function App() {
  

  
  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-black overflow-hidden">
        <Navbar />
        <Routers />
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default App
