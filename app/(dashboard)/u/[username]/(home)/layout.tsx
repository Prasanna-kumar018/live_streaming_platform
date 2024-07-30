import { getSelfByUsername } from "@/lib/auth_service";
import { notFound, redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import Container from "../_components/container";
import Sidebar from "../_components/sidebar/page";
 

interface props {
  params: {
    username: string;
  };
  children: React.ReactNode;
}
const Layout = async ({ params, children }: props) => {

    try
    {
        const self = await getSelfByUsername(params.username);
        if (self.length == 0) {
          redirect("/");
        }
        return (
          <>
            <Navbar />
            <div className="flex h-full pt-20">
              <Sidebar />
              <Container>
              {children}
              </Container>
            </div>
          </>
        );
        
    }
    catch
    {
        notFound();
    }
};

export default Layout;
