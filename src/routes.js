import Home from "./pages/Home/Home.js"
import VotingTable from "./pages/VotingTable/VotingTable.js"

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


]
export default routes