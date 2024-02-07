"use client";
import Controller from "@components/controller/controller.component";

export default function Home() {
  return (
    <>
      <section className="text-center min-h-screen flex align-center justify-center flex-col">
        <div className="flex flex-col justify-center mb-10 text-white">
          <h1 className="text-[#4a7098]">Unleash your Creativity</h1>
          <h1>Effortless Screen Recording</h1>
        </div>
        <div className="flex align-center justify-center self-center max-w-fit">
          <Controller />
        </div>
      </section>
    </>
  );
}
