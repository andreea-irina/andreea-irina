import Head from "next/head";
import Image from "next/image";
import { ProfileCard, WindFlowBackground } from "./components";

export default function Home() {
  return (
    <div className="relative overflow-hidden h-full">
      <Head>
        <title>This is Andreea</title>
        <meta
          name="description"
          content={`I am a front-end developer with over 5 years of experience, 3 of which I spent in 3 failed startups. I am now building a new one from scratch called Cube <3 🤩 Let's connect and create innovative web experiences together! 🤩`}
        />
      </Head>

      <ProfileCard />

      <WindFlowBackground />
    </div>
  );
}
