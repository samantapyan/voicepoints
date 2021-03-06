import Home from "./components/pages/Home/Home.js"
import VotingTable from "./components/pages/VotingTable/VotingTable.js"
import Registration from "./components/pages/Registration/Registration";
import PageNotFound from "./components/pages/PageNotFound/Pagenotfound";
import GalaxyThree from "./components/pages/GalaxyThree/GalaxyThree";
import AdminPanel from "./components/pages/AdminPanel/AdminPanel";

const routes = [

    {
        path: '/',
        element: <Home />,
        exact:true
    },
    {
        path: '/votings',
        element: <VotingTable />,
        exact:true
    },
    {
        path: '/registration',
        element: <Registration />,
        exact:false
    },
    {
        path: '/login',
        element: <Registration />,
        exact:true
    },
    {
        path: '/galaxy',
        element: <GalaxyThree />,
        exact:true
    },
    {
        path: '*',
        element: <PageNotFound/>,
        exact:true
    },


]
export default routes