import "leaflet/dist/leaflet.css";
import "@/components/Pages/Home/home.page.css";
import Navbar from "@/components/Pages/Home/components/Navbar";
import { HomeContextProvider } from "@/components/Pages/Home/contexts/context";
import { default as Content } from "@/components/Pages/Home";

const Home = () => {
  return (
    <HomeContextProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Content />
      </div>
    </HomeContextProvider>
  );
};

export default Home;
