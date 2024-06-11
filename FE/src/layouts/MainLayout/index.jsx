import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";

export default function MainLayout() {
    return (
        <div className="w-full min-h-[100vh] flex flex-col justify-between">
            <div>
                <Header />
                <Navigation />
            </div>

            <div className="grow">
                <div className="">
                    <Outlet />
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}