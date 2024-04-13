import Controller from "@components/controller.component";
import "./page.css";
import { DownIcon } from "ui/icons";

const ScrollDown = () => (
  <div className="justify-self-end flex flex-col justify-center items-center">
    <span>Scroll Down</span>
    <DownIcon color="white" size="24" />
  </div>
);

export default function Home() {
  return (
    <div className="container">
      <section className="section text-center min-h-[calc(100vh-10px)] max-h-[calc(100vh-10px)] mt-[5vh] flex items-center justify-center flex-col">
        <div className="flex-1 flex flex-col justify-center items-centers">
          <div className="flex flex-col justify-center mb-10 text-white">
            <h1 className="text-[#4a7098]">Unleash your Creativity</h1>
            <h1>Effortless Screen Recording</h1>
          </div>
          <div className="flex items-center justify-center self-center max-w-fit">
            <Controller />
          </div>
        </div>
        <ScrollDown />
      </section>
      <section className="section text-center min-h-[calc(100vh-10px)] max-h-[calc(100vh-10px)] mt-[5vh] flex items-center justify-center flex-col">
        <div className="flex-1 flex flex-col justify-center items-centers">
          <div className="flex flex-col justify-center text-center text-white">
            <h1>
              <span className="text-[#4a7098]">Clip sharing</span> made easy!
            </h1>
            <div className="flex justify-center">
              <h3 className="mt-5 text-left">
                👋 Sign In
                <br />
                🎥 Create your Clip
                <br />
                🤗 Share your Clip
                <br />
                🤠 Explore Your Library
              </h3>
            </div>
          </div>
        </div>
        <ScrollDown />
      </section>
      <section className="section text-center min-h-[calc(100vh-10px)] max-h-[calc(100vh-10px)] mt-[5vh] flex items-center justify-center flex-col">
        <div className="flex flex-col justify-center text-center text-white">
          <h1>
            <span className="text-[#4a7098]">FAQ</span>
          </h1>
          <div className="flex justify-center">
            <h3 className="mt-5 text-left">
              😢 Non authenticated users clips are non shareable
              <br />
              😎 Authenticated users clips are shareable FOREVER
              <br />
              🔒 Maximum clip size is 100Mb (Raw, Not transcoded)
              <br />
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}
