import About from "./pages/About";
import MemberAndy from "./pages/MemberAndy";
import MemberGeneric from "./pages/MemberGeneric";

const AppRoutes = [
    {
        path: "/",
        element: <About />
    },
    {
        path: "/MemberAndy",
        element: <MemberAndy />
    },    
    {
        path: "/MemberGeneric",
        element: <MemberGeneric />
    }
]

export default AppRoutes;