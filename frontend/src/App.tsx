import Chat from "./Pages/Chat";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import SignUp from "./Pages/SignUp";
import Header from "./components/Header";
import { Routes , Route} from 'react-router-dom'


function App() {

  
  return  <main>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/login" element={<Login />}  />
      <Route path="/chat" element={<Chat />}  />
      <Route path="/signup" element={<SignUp />}  />
      <Route path="*" element={<NotFound />}  />
    </Routes>
  </main>;
  
}
export default App
