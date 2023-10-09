import About from './components/About/About';
import Home from './components/Home/Home';
import MemberGeneric from './components/About/MemberGeneric';
import Categories from './components/Categories/Categories';
import Tasks from './components/Tasks/Tasks';

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
        path: "/Tasks",
        element: <Tasks />
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