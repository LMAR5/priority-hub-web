import About from './components/About/About';
import Home from './components/Home/Home';
import MemberGeneric from './components/About/MemberGeneric';
import Categories from './components/Categories/Categories';

const AppRoutes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/Categories",
        element: <Categories />
    },
    {
        path: "/About",
        element: <About />
    },
    {
        path: "/MemberGeneric",
        element: <MemberGeneric />
    }
    //Add a Task route here
    //Add a Category route here
];

export default AppRoutes;