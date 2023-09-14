import About from "./pages/About";
import MemberGeneric from "./pages/MemberGeneric";

const AppRoutes = [
    {
        path: "/",
        element: <About />
    },
    {
        path: "/MemberGeneric",
        element: <MemberGeneric />
    }
]

export default AppRoutes;