import Home from "./pages/Home/Home.js"
import VotingTable from "./pages/VotingTable/VotingTable.js"
import Registration from "./pages/Registration/Registration";
import PageNotFound from "./pages/PageNotFound/Pagenotfound";

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
        path: '*',
        element: <PageNotFound/>,
        exact:true
    },


]
export default routes