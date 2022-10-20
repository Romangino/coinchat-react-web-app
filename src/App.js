import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./Profile";
import NavigationBar from "./NavagationBar";
import SearchScreen from "./SearchScreen";

function App() {
    document.body.style.background = '#f2f2f2'
  return (
    <BrowserRouter>
        <NavigationBar active={'home'}/>
        <div className={'container-fluid'}>
            <Routes>
                <Route index
                       element={<HomeScreen/>}/>
                <Route path={'/profile'}
                       element={<ProfileScreen/>}/>
                <Route path={"/search"}
                       element={<SearchScreen />}/>
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
