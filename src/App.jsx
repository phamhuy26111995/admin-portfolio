import './App.css'
import ContentManger from "./Components/ContentManger.jsx";
import AuthenticationComponent from "./Components/AuthenticationComponent.jsx";

function App() {
  return (
    <AuthenticationComponent>
      <ContentManger/>
    </AuthenticationComponent>
  )
}

export default App
