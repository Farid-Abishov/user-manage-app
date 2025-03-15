import MainNavigation from "../../components/mainNavigation/MainNavigation";
import { Outlet } from "react-router-dom";

export default function RootLayout(){
    return <>
        <MainNavigation/>
        <Outlet/>
    </>
}