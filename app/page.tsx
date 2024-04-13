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
            <h1 className="text-[#4a7098]">Unleash Your Creativity</h1>
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
              <span className="text-[#4a7098]">Clip Sharing</span> Made Easy!
            </h1>
            <div className="flex justify-center">
              <h3 className="mt-5 text-left">
                👋 Sign In
                <br />
                🎥 Create Your Clip
                <br />
                🤗 Share Your Clip
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
            <span className="text-[#4a7098]">FAQ</span> Questions
          </h1>
          <div className="flex justify-center">
            <h3 className="mt-5 text-left">
              💣 Non Authenticated Users Clips Expires After ~1 day
              <br />
              😎 Authenticated Users Clips are Shareable FOREVER
              <br />
              🔒 Maximum Shareable Clip Size Is 100Mb (Raw, Not Transcoded)
              <br />
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}
