import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {
    Home,
    Login,
    NotFound,
    Register
} from '../pages'
import { routesEnum } from "../constants/routesEnum";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routesEnum.LOGIN} element={<Login />} />
                <Route path={routesEnum.REGISTER} element={<Register />} />
                <Route path={routesEnum.HOME} element={<Home />} />
                <Route path={routesEnum.NotFound} element={<NotFound />} />
            </Routes>
        </BrowserRouter >
    );
}

export default App;
