import Head from "next/head";
import Image from "next/image";
import { WindFlowBackground } from "./components";

export default function Home() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Head>
        <title>Frontend Developer Profile</title>
        <meta name="description" content="Frontend Developer Landing Page" />
      </Head>

      {/* Grass Field Background */}
      <WindFlowBackground />

      {/* Content Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          zIndex: 1,
          textShadow: "0px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        <h1 style={{ fontSize: "4rem", margin: "0" }}>
          Hello, I'm [Your Name]
        </h1>
        <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>
          A passionate Frontend Developer creating modern web experiences.
        </p>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            color: "royalblue",
            background: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          View My Work
        </button>
      </div>
    </div>
  );
}
