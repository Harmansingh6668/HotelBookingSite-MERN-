import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../home/Footer";
import { useLocation } from "react-router-dom";
function MainLayout() {
    const location = useLocation();
    const welcomeMessage = location.state?.welcomeMessage;

    return (
        <div className="min-h-screen bg-[#FAF8F2] text-[#1F2925]">
            <Navbar />

            <main>
                {welcomeMessage && (
                    <div className="border-b border-[#DDE5DF] bg-[#F2F5F1] px-4 py-3 text-center text-sm font-medium text-[#0B4F3A]">
                        {welcomeMessage}
                    </div>
                )}
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;
