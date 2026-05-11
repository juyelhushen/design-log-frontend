import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-zinc-900">
      <div className="mx-auto max-w-[1600px] p-3 md:p-4">
        <div className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-[0_24px_90px_rgba(0,0,0,0.08)]">
          <div className="flex min-h-screen">
            <Sidebar
              mobileMenuOpen={mobileMenuOpen}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />

            <div className="flex-1">
              <Topbar onOpenMobileMenu={() => setMobileMenuOpen((v) => !v)} />
              <main className="p-4 md:p-6 xl:p-8">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
