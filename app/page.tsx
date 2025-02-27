import Image from "next/image";
import JesusChat from "./components/JesusChat";
import predicaments from "@/data/predicaments";
import buttonPhrases from "@/data/buttonPhrases";
import inputLabels from "@/data/inputLabels";

export default function Home() {
  const predicament =
    predicaments[Math.floor(Math.random() * predicaments.length)].text;
  const inputLabel =
    inputLabels[Math.floor(Math.random() * inputLabels.length)].text;
  const buttonPhrase =
    buttonPhrases[Math.floor(Math.random() * buttonPhrases.length)].text;

  return (
    <div className="flex flex-col space-y-8 p-4 max-w-7xl mx-auto min-h-screen min-h-[100svh] justify-center">
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

      <JesusChat
        predicament={predicament}
        inputLabel={inputLabel}
        buttonPhrase={buttonPhrase}
      />
    </div>
  );
}
