import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TypeScript Learning Playground
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Learn TypeScript concepts one at a time, interactively
          </p>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Choose your learning path. What would you like to focus on?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a 
              href="/basic-types"
              className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              <div className="text-lg font-semibold">TypeScript Basics</div>
              <div className="text-sm opacity-90">Learn fundamental TypeScript concepts</div>
            </a>
            <a 
              href="/state-practice"
              className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              <div className="text-lg font-semibold">State Management</div>
              <div className="text-sm opacity-90">Master React state with hands-on exercises</div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}