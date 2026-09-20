import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../home/Footer";
function MainLayout() {
    return (
        <div className="min-h-screen bg-[#FAF8F2] text-[#1F2925]">
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;
