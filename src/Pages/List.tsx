import Navbar from "@/components/Pages/List/components/Navbar";
import "@/components/Pages/Home/home.page.css";
import { HomeContextProvider } from "@/components/Pages/Home/contexts/context";
import { default as Content } from "@/components/Pages/List";
import { ListContextProvider } from "@/components/Pages/List/contexts/context";

const List = () => {
  return (
    <HomeContextProvider>
      <ListContextProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Content />
        </div>
      </ListContextProvider>
    </HomeContextProvider>
  );
};

export default List;
