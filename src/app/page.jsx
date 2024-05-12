import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import { Container } from "@mui/material";
import BannerContact from "@/components/BannerContact";
import Transition from "@/components/Transition";

export default function Home () {
    return (
        <>
            <Transition>
                <Container>
                    <Banner />
                    <Categories />
                </Container>
                {/* <BannerContact /> */}
            </Transition>
        </>
    );
};
