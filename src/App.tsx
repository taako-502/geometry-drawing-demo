import './App.css'
import { Route, Routes } from 'react-router-dom'
import Sample1 from './pages/sample/1/page'
import PaperCircle from './pages/sample/2/page'
import HomeMenu from './pages/HomeMenu'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeMenu />} />
        <Route path="/sample/1" element={<Sample1 />} />
        <Route path="/sample/2" element={<PaperCircle />} />
      </Routes>
    </>
  )
}

export default App
