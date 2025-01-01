import React from "react";

export default function ProfileCard() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
      <div className="relative max-w-2xl w-full mx-4">
        {/* Glass card container */}
        <div className="backdrop-blur-lg bg-[#1E2019]/5 rounded-2xl p-8 shadow-lg border border-white/20">
          {/* Header section */}
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-[#0243D8] mb-4">
              Hello, I'm Andreea!
            </h1>
            <p className="text-xl text-gray-800">
              A passionate Frontend Developer creating modern web experiences
            </p>
          </div>

          {/* Details section */}
          <div className="space-y-6 mb-8">
            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-lg font-semibold text-[#0243D8] mb-2">
                Experience
              </h2>
              <p className="text-gray-800">
                Over 5 years of experience in frontend development, including 3
                years working with startups. Currently building Cube from the
                ground up with passion and dedication.
              </p>
            </div>

            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-lg font-semibold text-[#0243D8] mb-2">
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "TypeScript",
                  "Next.js",
                  "Tailwind CSS",
                  "UI/UX Design",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/40 rounded-full text-gray-800 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <button
              className="px-6 py-3 bg-[#0243D8] text-white rounded-lg font-medium 
                             transform transition-transform hover:scale-105 active:scale-95
                             shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
          </div>

          {/* Social links */}
          <div className="mt-6 flex justify-center gap-4">
            <button className="p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors">
              <svg
                className="w-6 h-6 text-[#0243D8]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors">
              <svg
                className="w-6 h-6 text-[#0243D8]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
