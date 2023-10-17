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

const AppRoutes = [
    {        
        element: <LandingPageLayout />,
        children: [
            {
                path: "/",
                element: <LandingPageMain />
            },
            {
                path: "/SignIn",    
                element: <SignInCustom />
            },
            {
                path: "/SignUp",
                element: <SignUpCustom />
            },
            {
                path: "/PasswordReset",
                element: <PasswordResetCustom />
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
    },
    {
        path: "/Main",
        element: <Layout />,
        children: [
            {
                path: "/Main/",
                element: <Home />
            },
            {
                path: "/Main/Tasks",
                element: <Tasks />
            },
            {
                path: "/Main/Categories",
                element: <Categories />
            }
        ]
    }
];

export default AppRoutes;