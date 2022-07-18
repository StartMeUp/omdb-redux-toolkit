import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="bg-neutral-900 p-4 flex-1">
        <div className="container mx-auto">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
