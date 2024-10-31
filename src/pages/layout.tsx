import Navbar from "components/navbar";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Footer from '../components/footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isLandingPage = router.pathname === "/";
  const isHome = router.pathname === "/home";

  return (
    <div className="page-container">
      {!isLandingPage && !isHome && <Navbar />}
      
      <main className="content">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
