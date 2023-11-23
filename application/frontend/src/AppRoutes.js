import About from './components/About/About';
import Home from './components/Home/Home';
import MemberGeneric from './components/About/MemberGeneric';
import Layout from './components/Layout/Layout';
import Categories from './components/Categories/Categories';
import Tasks from './components/Tasks/Tasks';
import DashboardMain from './components/Dashboard/DashboardMain';
import SummaryMain from './components/Summary/SummaryMain';

const AppRoutes = [
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/Tasks",
                element: <Tasks />
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
            },
            {
                path: "/Dashboard",
                element: <DashboardMain />
            },
            {
                path: "/Summary",
                element: <SummaryMain />
            }
        ]
    }
];

export default AppRoutes;