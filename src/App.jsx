import { Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import SignUpPages from "./Pages/SignUpPages"
import { Usercontextprovoider } from "./Service/Dbmethods/UserContext"
import HomePage from "./Pages/HomePage"
import TodoList from "./TodoList"

function App() {

  return (
    <>
      <Usercontextprovoider>
          <Routes>
            <Route path= "/" element={<TodoList/>} />
            <Route path= "/home" element={<HomePage/>} />
            <Route path="/signup" element={<SignUpPages/>}/>
          </Routes>
      </Usercontextprovoider>
    </>
  )
}

export default App
