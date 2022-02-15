import './App.css';
import {useRoutes,useContext} from 'hookrouter';
import StudentInfo from './components/studentForm/studentInfo';

const routes = {
  "/": () => <StudentInfo />
};
function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
       {routeResult}
    </div>
  );
}

export default App;
