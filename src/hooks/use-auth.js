import {useSelector} from "react-redux";

export function useAuth() {
    const userAccount = useSelector(state => state.user)
    console.log("user-account =",userAccount);

}