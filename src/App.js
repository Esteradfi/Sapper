import styles from "./App.module.scss"
import Sapper from "./components/Sapper/Sapper";

function App() {
  return (
    <div className={styles.app}>
      <Sapper />
    </div>
  );
}

export default App;
