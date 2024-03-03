import Banner from "@/components/Banner";
import { Suspense } from "react";
import Loading from "./loading";
import TopProducts from "@/components/TopProducts";

export default function Home() {
    return (
        <section>
            <Suspense fallback={<Loading />}>
                <Banner />
                <TopProducts />
            </Suspense>
        </section>
    );
};
