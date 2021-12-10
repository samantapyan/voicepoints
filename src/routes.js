import Home from "./pages/Home/Home.js"
import VotingTable from "./pages/VotingTable/VotingTable.js"
import Registration from "./pages/Registration/Registration";

const routes = [
    {
        path: '/',
        element: <Home/>,
        exact:true
    },
    {
        path: '/votings',
        element: <VotingTable/>,
        exact:true
    },
    {
        path: '/registration',
        element: <Registration/>,
        exact:true
    },


]
export default routes