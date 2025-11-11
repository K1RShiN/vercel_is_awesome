import Head from "next/head";
import { SAMPLE_API_ENDPOINT } from "./api";
import { FetchedRandomJoke } from "@/components/FetchedRandomJoke";
import type { RandomJoke } from "@/types";

export const TITLE = "Server Side Rendering (SSR)";

export default function ServerSideRendering({
    randomJoke,
}: {
    randomJoke: RandomJoke;
}) {
    return (
        <>
            <Head>
                <title>{TITLE}</title>
            </Head>
            <h1>{TITLE}</h1>
            <p>
                Data fetched on the server-sideat <b>each</b> request before sending to
                the client.
            </p>
            <FetchedRandomJoke randomJoke={randomJoke} />
        </>
    );
}
export async function getServerSideProps() {
    const response = await fetch(SAMPLE_API_ENDPOINT);
    const randomJoke= await response.json();
    return {
        props: {
            randomJoke,
        },
    };
}
