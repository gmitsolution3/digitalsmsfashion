import { ComLogo } from "../components/ComLogo";
import HeaderSearchBar from "../components/HeaderSearchBar";
import { BookCard } from "../components/BookCard";
import { getCategories, getMarquee } from "@/lib/categories";
import { MenuNavbar } from "../components/Menu";
import MarqueeText from "../components/marquee";
import { getBrandInfo } from "@/lib/social";
import { NavBarMenu } from "../components/navBarMenu";
import AccountDropdown from "../components/AccountDropdown";

const Navbar = async () => {
  const getAllCategories = await getCategories();
  const brandInfoRaw = await getBrandInfo();

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Bar - Info & Account */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 md:py-0">
          <div className="h-10 flex justify-between items-center text-sm">
            <p className="text-gray-600 font-medium hidden md:block">
              Handcrafted Elegance, Woven with Tradition.
            </p>
            <div className="flex items-center gap-6 ml-auto">
              <NavBarMenu />
              <div className="md:hidden">
                <AccountDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Logo, Search, Cart */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 md:py-2 gap-4 md:gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <ComLogo />
            </div>

            {/* Menu Navbar - Hidden on tablet, visible on desktop */}
            <div className="hidden xl:block flex-1 max-w-3xl">
              <MenuNavbar categories={getAllCategories.data} />
            </div>

            {/* Cart and Mobile Menu Trigger */}
            <div className="flex items-center gap-3">
              <BookCard />
              {/* Mobile Menu Button - Visible on tablet and below */}
              <div className="xl:hidden">
                <MenuNavbar categories={getAllCategories.data} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-primary border-b border-gray-200 py-3 mb-5 text-center font-semibold text-white">
        ⚡ DIPONTY CLEARANCE SALE IS LIVE ⚡
      </div>
    </header>
  );
};

export default Navbar;