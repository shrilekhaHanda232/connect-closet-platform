import Header from "./components/header/Header";
import Controls from "./components/controls/index";
import ContentGrid from "./components/contentGrid/ContentGrid";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <Controls />
      <ContentGrid />
    </div>
  );
}
export default App;
