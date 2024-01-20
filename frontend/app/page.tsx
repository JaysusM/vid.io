import Controller from "@components/controller/controller.component";

export default function Home() {
  return (
    <>
      <section className="text-center min-h-screen flex align-center justify-center flex-col">
        <div className="flex flex-col justify-center mb-10 text-white">
          <h1>Unleash your Creativity</h1>
          <h1>Effortless Screen Recording</h1>
        </div>
        <Controller />
      </section>
    </>
  );
}
