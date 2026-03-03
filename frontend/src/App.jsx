import { useState } from 'react'
import './App.css'
import BooksPage from "./pages/BooksPage";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Book Management</h1>
      <BooksPage />
    </div>
  )
}

export default App
