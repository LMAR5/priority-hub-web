import About from './components/About/About';
import Home from './components/Home/Home';
import MemberGeneric from './components/About/MemberGeneric';
import Layout from './components/Layout/Layout';
import Categories from './components/Categories/Categories';
import Tasks from './components/Tasks/Tasks';
import LandingPageLayout from './components/LandingPage/LandingPageLayout';
import LandingPageMain from './components/LandingPage/LandingPageMain';
import SignInCustom from './components/Authentication/SignInCustom';
import SignUpCustom from './components/Authentication/SignUpCustom';
import PasswordResetCustom from './components/Authentication/PasswordResetCustom';
import AuthenticationService from './services/AuthenticationService';

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
            }
        ]
    }
];

export default AppRoutes;