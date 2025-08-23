import "leaflet/dist/leaflet.css";
import "@/components/Pages/Home/home.page.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HomeContextProvider } from "@/components/Pages/Home/contexts/context";
import { default as Content } from "@/components/Pages/Home";

const Home = () => {
  return (
    <HomeContextProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Content />
        <Footer />
      </div>
    </HomeContextProvider>
  );
};

export default Home;
