import About from './components/About/About';
import Home from './components/Home/Home';
import MemberGeneric from './components/About/MemberGeneric';

const AppRoutes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/About",
        element: <About />
    },
    {
        path: "/MemberGeneric",
        element: <MemberGeneric/>
    }
    //Add a Task route here
    //Add a Category route here
];

export default AppRoutes;