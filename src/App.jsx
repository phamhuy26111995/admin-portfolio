import ContentManger from "./components/ContentManger.jsx";
import AuthenticationComponent from "./components/AuthenticationComponent.jsx";

function App() {
  return (
    <AuthenticationComponent>
      <ContentManger />
    </AuthenticationComponent>
  );
}

export default App;
