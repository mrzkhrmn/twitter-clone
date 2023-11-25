import { CreatePost } from "../components/CreatePost";
import { Header } from "../components/Header";

export const HomePage = () => {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto">
        <CreatePost />
      </div>
    </>
  );
};
