import Image from "next/image";
import predicaments from "@/data/predicaments";
import buttonPhrases from "@/data/buttonPhrases";
import inputLabels from "@/data/inputLabels";
import JesusChat from "./components/JesusChat";

export default function Home() {
  return (
    <div className="flex flex-col space-y-8 p-4 max-w-7xl mx-auto h-screen justify-center">
      <div className="flex flex-col items-center space-y-4 ">
        <Image
          alt="Illustration of Jesus Christ"
          src="/images/jesus.png"
          width={153}
          height={230}
        />
        <h1 className="font-bold text-gray-800 text-6xl text-center">
          What Would Jesus Do?
        </h1>
      </div>

      <form className="flex flex-col justify-between rounded-3xl p-4 bg-cardBgLight border-4 border-cardBorder space-y-2 shadow-md max-w-3xl sm:mx-auto">
        <h2 className="font-medium">
          {inputLabels.length > 0 &&
            inputLabels[Math.floor(Math.random() * inputLabels.length)]?.text}
        </h2>

        <textarea
          required
          placeholder={
            predicaments.length > 0
              ? predicaments[Math.floor(Math.random() * predicaments.length)]
                  ?.text
              : ""
          }
          className="bg-transparent border rounded-xl p-2 border-amber-200  focus:outline-none focus:ring-2 focus:ring-cardBorder focus:border-transparent focus:bg-background"
        />
        <button
          type="submit"
          className="w-full border-4 border-white p-2 rounded-3xl bg-cardBgDark shadow-inner shadow-white hover:shadow-none active:shadow-inner active:shadow-gray-300 select-none font-medium text-md"
        >
          {buttonPhrases.length > 0 &&
            buttonPhrases[Math.floor(Math.random() * buttonPhrases.length)]
              ?.text}
        </button>
      </form>

      <JesusChat />
    </div>
  );
}
