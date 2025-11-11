import { Inter } from "next/font/google";
import { TITLE as TITLE_SSR } from "./server-side-rendering";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main
          className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <h1>Next.js Pages Router</h1>

            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
              <link
                href="/server-side-rendering"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-2xl font-semibold">
                  {TITLE_SSR}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
              </link>
            </div>
        </main>
    );
}
