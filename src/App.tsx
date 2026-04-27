import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import QuestionsPage from "./pages/QuestionsPage";
import { TheoryPage } from "./pages/TheoryPage";
import { LinksPage } from "./pages/LinksPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/questions" element={<QuestionsPage/>} />
      <Route path="/theory" element={<TheoryPage />} />
      <Route path="/links" element={<LinksPage />} />
    </Routes>
  )
}

export default App
