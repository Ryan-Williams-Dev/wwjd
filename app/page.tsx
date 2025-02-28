import Image from "next/image";
import JesusChat from "./components/JesusChat";
import predicaments from "@/data/predicaments";
import buttonPhrases from "@/data/buttonPhrases";
import inputLabels from "@/data/inputLabels";
import { Github, Linkedin } from "lucide-react";

export default function Home() {
  const predicament =
    predicaments[Math.floor(Math.random() * predicaments.length)].text;
  const inputLabel =
    inputLabels[Math.floor(Math.random() * inputLabels.length)].text;
  const buttonPhrase =
    buttonPhrases[Math.floor(Math.random() * buttonPhrases.length)].text;

  return (
    <>
      <div className="flex flex-col space-y-8 p-4 max-w-7xl mx-auto min-h-screen justify-center">
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
      <footer className="bottom-0 w-full border-t p-4">
        <div className="flex flex-row justify-between items-center gap-2 max-w-7xl mx-auto">
          <span className="text-gray-600">
            Made by{" "}
            <span className="font-medium text-black">Ryan Williams</span>
          </span>
          <div className="flex gap-4">
            <a href="https://github.com/Ryan-Williams-Dev">
              <Github size={40} />
            </a>
            <a href="https://www.linkedin.com/in/ryan-williams-dev/">
              <Linkedin size={40} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
