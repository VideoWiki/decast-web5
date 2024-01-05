<template>
    <div class="w-full landing flex flex-col gap-4">
        <Navbar />
        <div class="head-cont mb-6">
            <h1 class="text-5xl font-semibold">About Decast</h1>
        </div>

        <div class="basic__section basic__section__1 flex flex-col w-full justify-center items-center py-16 mb-6">

            <div
                class="grid lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 lg:grid-flow-col grid-flow-row w-full max-w-5xl lg:px-16 md:px-6 p-4 mb-8">

                <span id="ptwoptab" @click="openTab('ptwop')"
                    class="xl:text-2xl text-xl flex w-full items-center font-semibold transition-all duration-100 ease-in text-white  text-left border-r-0 border-l-0 border-t-0 border-b-2  border-solid px-4 py-4 cursor-pointer tabhover"
                    style="border-color: #d7df23;">
                    Peer-to-Peer (P2P) Torrent Technology </span>

                <span id="networktab" @click="openTab('network')"
                    class="xl:text-2xl text-xl w-full flex font-semibold items-center transition-all duration-100 ease-in text-white  text-left border-r-0 border-l-0 border-t-0 border-b-2 border-solid px-4 py-4 cursor-pointer tabhover">
                    Decentralized P2P network for Video Casting</span>

            </div>

            <div id="ptwop"
                class="max-w-5xl lg:px-16 md:px-6 p-4 lg:grid-cols-2 grid-cols-1 gap-8 w-full h-full tab-content"
                style="display: grid;">

                <h1 class="hidden text-5xl font-semibold text-white text-center col-span-full mb-10"> Peer-to-Peer (P2P)
                    Torrent
                    Technology </h1>

                <div class="flex flex-col border-2 border-solid border-grey-900 shadow-xl p-12 w-full h-full gap-4" style="border-radius: 0.8rem; background-color: black;">

                    <span class="flex flex-col items-start justify-start w-full gap-4">
                        <div class="w-24 h-24 relative p-5 bg-grey-900 shadow-xl" style="border-radius: 0.8rem;">
                            <img class="w-full h-full" src="@/assets/images/landing/about/data.svg" />
                        </div>
                        <span class="text-3xl text-white font-semibold">
                            Distribution of Data
                        </span>
                    </span>

                    <p class="text-base text-white font-normal flex flex-col">
                        In a P2P torrent network, when a user downloads a file, they connect to multiple other users
                        (peers) who already have parts of that file. Each peer can upload and download data
                        simultaneously.
                    </p>

                </div>

                <div class="flex flex-col border-2 border-solid border-grey-900 shadow-xl p-12 w-full h-full gap-4" style="border-radius: 0.8rem; background-color: black;">

                    <span class="flex flex-col items-start justify-start w-full gap-4">
                        <div class="w-24 h-24 relative p-5 bg-grey-900 shadow-xl" style="border-radius: 0.8rem;">
                            <img class="w-full h-full" src="@/assets/images/landing/about/network.svg" />
                        </div>
                        <span class="text-3xl text-white font-semibold">
                            Decentralized Network
                        </span>
                    </span>

                    <p class="text-base text-white font-normal flex flex-col">
                        The distribution of the file happens across multiple users rather than relying on a
                        centralized server. This decentralized approach not only speeds up downloads but also
                        reduces the strain on any single server.
                    </p>

                </div>

                <div class="flex flex-col border-2 border-solid border-grey-900 shadow-xl p-12 w-full h-full gap-4" style="border-radius: 0.8rem; background-color: black;">

                    <span class="flex flex-col items-start justify-start w-full gap-4">
                        <div class="w-24 h-24 relative p-5 bg-grey-900 shadow-xl" style="border-radius: 0.8rem;">
                            <img class="w-full h-full" src="@/assets/images/landing/about/swarm.svg" />
                        </div>
                        <span class="text-3xl text-white font-semibold">
                            Swarm Concept
                        </span>
                    </span>

                    <p class="text-base text-white font-normal flex flex-col">
                        The collection of all users sharing a particular file is referred to as a "swarm." Users
                        download and upload pieces of the file to each other, creating a distributed network of data
                        sharing.
                    </p>

                </div>

                <div class="flex flex-col border-2 border-solid border-grey-900 shadow-xl p-12 w-full h-full gap-4" style="border-radius: 0.8rem; background-color: black;">

                    <span class="flex flex-col items-start justify-start w-full gap-4">
                        <div class="w-24 h-24 relative p-5 bg-grey-900 shadow-xl" style="border-radius: 0.8rem;">
                            <img class="w-full h-full" src="@/assets/images/landing/about/download.svg" />
                        </div>
                        <span class="text-3xl text-white font-semibold">
                            Piece-by-Piece Download
                        </span>
                    </span>

                    <p class="text-base text-white font-normal flex flex-col">
                        Instead of downloading an entire file from a single source, a user downloads small pieces
                        from various sources simultaneously. This makes the download process more resilient to
                        interruptions.
                    </p>

                </div>

            </div>

            <div id="network"
                class="max-w-5xl lg:px-16 md:px-6 p-4 lg:grid-cols-3 grid-cols-1 gap-8 w-full h-full tab-content"
                style="display: none;">

                <h1 class="text-5xl font-semibold text-white text-center col-span-full hidden mb-10 mt-32">
                    Decast - Decentralized P2P network for Video Casting </h1>

                <div class="flex flex-col border-2 border-solid border-grey-900 shadow-xl p-6 w-full h-full gap-4" style="border-radius: 0.8rem; background-color: black;">

                    <span class="flex flex-col items-start justify-start w-full gap-4">
                        <div class="w-24 h-24 relative p-5 bg-grey-900 shadow-xl" style="border-radius: 0.8rem;">
                            <img class="w-full h-full" src="@/assets/images/landing/about/video.svg" />
                        </div>
                        <span class="text-3xl text-white font-semibold">
                            Decentralized Video Streaming
                        </span>
                    </span>

                    <p class="text-base text-white font-normal flex flex-col">
                        Decast essentially reverses the P2P torrent concept to enable decentralized video streaming. Instead
                        of downloading a file, users stream video content from multiple distributed sources.
                    </p>

                </div>

                <div class="flex flex-col border-2 border-solid border-grey-900 shadow-xl p-6 w-full h-full gap-4" style="border-radius: 0.8rem; background-color: black;">

                    <span class="flex flex-col items-start justify-start w-full gap-4">
                        <div class="w-24 h-24 relative p-5 bg-grey-900 shadow-xl" style="border-radius: 0.8rem;">
                            <img class="w-full h-full" src="@/assets/images/landing/about/live.svg" />
                        </div>
                        <span class="text-3xl text-white font-semibold">
                            Distribution of Live Video
                        </span>
                    </span>

                    <p class="text-base text-white font-normal flex flex-col">
                        In Decast, the live video content is distributed across a network of users who contribute their
                        resources to the streaming process. This distribution is not limited to a central server but
                        utilizes the combined resources of the participating nodes.
                    </p>

                </div>

                <div class="flex flex-col border-2 border-solid border-grey-900 shadow-xl p-6 w-full h-full gap-4" style="border-radius: 0.8rem; background-color: black;">

                    <span class="flex flex-col items-start justify-start w-full gap-4">
                        <div class="w-24 h-24 relative p-5 bg-grey-900 shadow-xl" style="border-radius: 0.8rem;">
                            <img class="w-full h-full" src="@/assets/images/landing/about/delivery.svg" />
                        </div>
                        <span class="text-3xl text-white font-semibold">
                            Dynamic Content Delivery
                        </span>
                    </span>

                    <p class="text-base text-white font-normal flex flex-col">
                        Just as in P2P torrents, where users contribute parts of a file they have, in Decast, users
                        contribute parts of the live video stream they have, creating a dynamic and distributed network for
                        content delivery.
                    </p>

                </div>

                <div class="flex flex-col border-2 border-solid border-grey-900 shadow-xl p-6 w-full h-full gap-4" style="border-radius: 0.8rem; background-color: black;">

                    <span class="flex flex-col items-start justify-start w-full gap-4">
                        <div class="w-24 h-24 relative p-5 bg-grey-900 shadow-xl" style="border-radius: 0.8rem;">
                            <img class="w-full h-full" src="@/assets/images/landing/about/efficient.svg" />
                        </div>
                        <span class="text-3xl text-white font-semibold">
                            Efficient Resource Utilization
                        </span>
                    </span>

                    <p class="text-base text-white font-normal flex flex-col">
                        Decast optimizes resource utilization by tapping into the available bandwidth and processing power
                        of multiple nodes. This ensures a smoother and more reliable streaming experience for users.
                    </p>

                </div>

                <div class="flex flex-col border-2 border-solid border-grey-900 shadow-xl p-6 w-full h-full gap-4" style="border-radius: 0.8rem; background-color: black;">

                    <span class="flex flex-col items-start justify-start w-full gap-4">
                        <div class="w-24 h-24 relative p-5 bg-grey-900 shadow-xl" style="border-radius: 0.8rem;">
                            <img class="w-full h-full" src="@/assets/images/landing/about/scale.svg" />
                        </div>
                        <span class="text-3xl text-white font-semibold">
                            Scalability and Reliability
                        </span>
                    </span>

                    <p class="text-base text-white font-normal flex flex-col">
                        Instead of getting heavily loaded when more users join a video cast, Decast would actually become
                        stronger and lighter. Similar to the P2P torrent's ability to scale with the number of users, Decast
                        scales and load-balances its video stream to optimize connections as more users join the network.
                        The decentralized approach enhances reliability and enhances uptime while lowering the risk of
                        service interruptions.
                    </p>

                </div>

                <div class="flex flex-col border-2 border-solid border-grey-900 shadow-xl p-6 w-full h-full gap-4" style="border-radius: 0.8rem; background-color: black;">

                    <span class="flex flex-col items-start justify-start w-full gap-4">
                        <div class="w-24 h-24 relative p-5 bg-grey-900 shadow-xl" style="border-radius: 0.8rem;">
                            <img class="w-full h-full" src="@/assets/images/landing/about/community.svg" />
                        </div>
                        <span class="text-3xl text-white font-semibold">
                            Community-Driven Streaming
                        </span>
                    </span>

                    <p class="text-base text-white font-normal flex flex-col">
                        Decast embraces a community-driven approach, allowing users to actively participate in the casting
                        process. Contributors share their resources, creating a collaborative ecosystem that benefits both
                        content creators and consumers. A financial incentive is shared between the actors of the ecosystem
                        building a thriving reward system for Creators, Operators, and Promoters.
                    </p>

                </div>

            </div>

        </div>

        <div class="basic__section basic__section__1 hidden w-full justify-center items-center py-16">
            <div
                class="max-w-5xl w-full lg:px-16 md:px-6 p-4 flex flex-col lg:grid lg:grid-flow-col grid-cols-2 justify-between items-start lg:gap-4 gap-16">
                <div class="flex flex-col text-grey gap-4 w-full col-span-1 lg:order-last lg:justify-end lg:items-end">
                    <div class="flex-col flex md:w-10/12 sm:w-10/12">
                        <div class="w-24 h-24 relative mb-4 pr-2">
                            <img class="w-full h-full" src="@/assets/images/landing/features/featureicon1.svg" />
                        </div>
                        <h5 class="lg:text-5xl text-4xl text-grey font-semibold">
                            Peer-to-Peer (P2P) Torrent Technology
                        </h5>
                        <div class="w-64 my-4 h-2 rounded-full" style="background-color: #d7df23"></div>
                        <p class="text-base text-grey font-normal flex flex-col">
                            <span class="font-semibold text-lg mb-2">Distribution of Data:</span>
                            <span class="mb-6">
                                In a P2P torrent network, when a user downloads a file, they connect to multiple other users
                                (peers) who already have parts of that file. Each peer can upload and download data
                                simultaneously.</span>

                            <span class="font-semibold text-lg mb-2">Decentralized Network:</span>
                            <span class="mb-6">
                                The distribution of the file happens across multiple users rather than relying on a
                                centralized server. This decentralized approach not only speeds up downloads but also
                                reduces the strain on any single server.</span>

                            <span class="font-semibold text-lg mb-2">Swarm Concept:</span>
                            <span class="mb-6">
                                The collection of all users sharing a particular file is referred to as a "swarm." Users
                                download and upload pieces of the file to each other, creating a distributed network of data
                                sharing. </span>

                            <span class="font-semibold text-lg mb-2">Piece-by-Piece Download:</span>
                            <span class="mb-6">
                                Instead of downloading an entire file from a single source, a user downloads small pieces
                                from various sources simultaneously. This makes the download process more resilient to
                                interruptions. </span>
                        </p>
                    </div>
                </div>
                <div class="basic__section__img w-full md:w-auto relative flex object-cover col-span-1 justify-start">
                    <img class="rounded-lg object-cover sm:w-10/12 w-full"
                        src="@/assets/images/landing/features/features1.png" />
                </div>
            </div>
        </div>

        <div class="basic__section basic__section__2 hidden w-full justify-center items-center py-16">
            <div
                class="max-w-5xl w-full lg:px-16 md:px-6 p-4 flex flex-col lg:grid lg:grid-flow-col grid-cols-2 justify-between items-start lg:gap-4 gap-16">
                <div class="flex flex-col text-grey gap-4 w-full col-span-1">
                    <div class="w-24 h-24 relative mb-4 pr-2">
                        <img class="w-full h-full" src="@/assets/images/landing/features/featureicon2.svg" />
                    </div>
                    <h5 class="lg:text-5xl text-4xl text-grey font-semibold md:w-10/12 sm:w-10/12">
                        Decast - Decentralized P2P network for Video Casting
                    </h5>
                    <div class="w-64 my-4 h-2 rounded-full" style="background-color: #d7df23"></div>
                    <p class="text-base text-grey font-normal flex flex-col md:w-10/12 sm:w-10/12">
                        <span class="font-semibold text-lg mb-2">Decentralized Video Streaming:</span>
                        <span class="mb-6">
                            Decast essentially reverses the P2P torrent concept to enable decentralized video streaming.
                            Instead of downloading a file, users stream video content from multiple distributed
                            sources.</span>

                        <span class="font-semibold text-lg mb-2">Distribution of Live Video:</span>
                        <span class="mb-6">
                            In Decast, the live video content is distributed across a network of users who contribute their
                            resources to the streaming process. This distribution is not limited to a central server but
                            utilizes the combined resources of the participating nodes.</span>

                        <span class="font-semibold text-lg mb-2">Dynamic Content Delivery: </span>
                        <span class="mb-6">
                            Just as in P2P torrents, where users contribute parts of a file they have, in Decast, users
                            contribute parts of the live video stream they have, creating a dynamic and distributed network
                            for content delivery. </span>

                        <span class="font-semibold text-lg mb-2">Efficient Resource Utilization:</span>
                        <span class="mb-6">
                            Decast optimizes resource utilization by tapping into the available bandwidth and processing
                            power of multiple nodes. This ensures a smoother and more reliable streaming experience for
                            users.</span>

                        <span class="font-semibold text-lg mb-2">Scalability and Reliability: </span>
                        <span class="mb-6">
                            Instead of getting heavily loaded when more users join a video cast, Decast would actually
                            become stronger and lighter. Similar to the P2P torrent's ability to scale with the number of
                            users, Decast scales and load-balances its video stream to optimize connections as more users
                            join the network. The decentralized approach enhances reliability and enhances uptime while
                            lowering the risk of service interruptions. </span>

                        <span class="font-semibold text-lg mb-2">Community-Driven Streaming:</span>
                        <span class="mb-6">
                            Decast embraces a community-driven approach, allowing users to actively participate in the
                            casting process. Contributors share their resources, creating a collaborative ecosystem that
                            benefits both content creators and consumers. A financial incentive is shared between the actors
                            of the ecosystem building a thriving reward system for Creators, Operators, and Promoters.
                        </span>
                    </p>
                </div>
                <div class="basic__section__img w-full md:w-auto relative flex object-cover col-span-1 justify-end">
                    <img class="rounded-lg object-cover sm:w-10/12 w-full"
                        src="@/assets/images/landing/features/features2.png" />
                </div>
            </div>
        </div>

        <div class="head-cont mb-6">
            <h1 class="text-5xl font-semibold">Decast Features</h1>
        </div>

        <div class="basic__section basic__section__1 flex w-full justify-center items-center py-16">
            <div
                class="max-w-5xl w-full lg:px-16 md:px-6 p-4 flex flex-col lg:grid lg:grid-flow-col grid-cols-2 justify-between items-start lg:gap-4 gap-16">
                <div class="flex flex-col text-grey gap-4 w-full col-span-1 lg:order-last lg:justify-end lg:items-end">
                    <div class="flex-col flex md:w-10/12 sm:w-10/12">
                        <div class="w-24 h-24 relative mb-4 pr-2">
                            <img class="w-full h-full" src="@/assets/images/landing/features/featureicon1.svg" />
                        </div>
                        <h5 class="lg:text-5xl text-4xl text-grey font-semibold">
                            AI-Enhanced Video Editing
                        </h5>
                        <div class="w-64 my-4 h-2 rounded-full" style="background-color: #d7df23"></div>
                        <p class="text-base text-grey font-normal">
                            Implement advanced AI algorithms for video editing that can automatically identify key moments,
                            suggest
                            edits, and enhance video quality.
                        </p>
                    </div>
                </div>
                <div class="basic__section__img w-full md:w-auto relative flex object-cover col-span-1 justify-start">
                    <img class="rounded-lg object-cover sm:w-10/12 w-full"
                        src="@/assets/images/landing/features/features1.png" />
                </div>
            </div>
        </div>

        <div class="basic__section basic__section__2 flex w-full justify-center items-center py-16">
            <div
                class="max-w-5xl w-full lg:px-16 md:px-6 p-4 flex flex-col lg:grid lg:grid-flow-col grid-cols-2 justify-between items-start lg:gap-4 gap-16">
                <div class="flex flex-col text-grey gap-4 w-full col-span-1">
                    <div class="w-24 h-24 relative mb-4 pr-2">
                        <img class="w-full h-full" src="@/assets/images/landing/features/featureicon2.svg" />
                    </div>
                    <h5 class="lg:text-5xl text-4xl text-grey font-semibold md:w-10/12 sm:w-10/12">
                        Blockchain for Content Authentication
                    </h5>
                    <div class="w-64 my-4 h-2 rounded-full" style="background-color: #d7df23"></div>
                    <p class="text-base text-grey font-normal md:w-10/12 sm:w-10/12">
                        Use blockchain technology to timestamp and authenticate video records, ensuring its integrity,
                        originality,
                        and preventing tampering or unauthorized distribution.
                    </p>
                </div>
                <div class="basic__section__img w-full md:w-auto relative flex object-cover col-span-1 justify-end">
                    <img class="rounded-lg object-cover sm:w-10/12 w-full"
                        src="@/assets/images/landing/features/features2.png" />
                </div>
            </div>
        </div>

        <div class="basic__section basic__section__1 flex w-full justify-center items-center py-16">
            <div
                class="max-w-5xl w-full lg:px-16 md:px-6 p-4 flex flex-col lg:grid lg:grid-flow-col grid-cols-2 justify-between items-start lg:gap-4 gap-16">
                <div class="flex flex-col text-grey gap-4 w-full col-span-1 lg:order-last lg:justify-end lg:items-end">
                    <div class="flex-col flex md:w-10/12 sm:w-10/12">
                        <div class="w-24 h-24 relative mb-4 pr-2">
                            <img class="w-full h-full" src="@/assets/images/landing/features/featureicon3.svg" />
                        </div>
                        <h5 class="lg:text-5xl text-4xl text-grey font-semibold">
                            Real-time Language Translation
                        </h5>
                        <div class="w-64 my-4 h-2 rounded-full" style="background-color: #d7df23"></div>
                        <p class="text-base text-grey font-normal">
                            Implement an AI-powered real-time language translation feature that automatically translates
                            spoken words
                            into multiple languages during video conferences or in recorded content.
                        </p>
                    </div>
                </div>
                <div class="basic__section__img w-full md:w-auto relative flex object-cover col-span-1 justify-start">
                    <img class="rounded-lg object-cover sm:w-10/12 w-full"
                        src="@/assets/images/landing/features/features3.png" />
                </div>
            </div>
        </div>

        <div class="basic__section basic__section__2 flex w-full justify-center items-center py-16">
            <div
                class="max-w-5xl w-full lg:px-16 md:px-6 p-4 flex flex-col lg:grid lg:grid-flow-col grid-cols-2 justify-between items-start lg:gap-4 gap-16">
                <div class="flex flex-col text-grey gap-4 w-full col-span-1">
                    <div class="w-24 h-24 relative mb-4 pr-2">
                        <img class="w-full h-full" src="@/assets/images/landing/features/featureicon4.svg" />
                    </div>
                    <h5 class="lg:text-5xl text-4xl text-grey font-semibold md:w-10/12 sm:w-10/12">
                        Energy-Efficient Streaming
                    </h5>
                    <div class="w-64 my-4 h-2 rounded-full" style="background-color: #d7df23"></div>
                    <p class="text-base text-grey font-normal md:w-10/12 sm:w-10/12">
                        Energy-efficient networked streaming solutions over distributed decentralized infrastructure that
                        optimizes
                        bandwidth usage, reduce environmental impact, and ensure a sustainable video infrastructure.
                    </p>
                </div>
                <div class="basic__section__img w-full md:w-auto relative flex object-cover col-span-1 justify-end">
                    <img class="rounded-lg object-cover sm:w-10/12 w-full"
                        src="@/assets/images/landing/features/features4.png" />
                </div>
            </div>
        </div>

        <div class="basic__section basic__section__1 flex w-full justify-center items-center py-16">
            <div
                class="max-w-5xl w-full lg:px-16 md:px-6 p-4 flex flex-col lg:grid lg:grid-flow-col grid-cols-2 justify-between items-start lg:gap-4 gap-16">
                <div class="flex flex-col text-grey gap-4 w-full col-span-1 lg:order-last lg:justify-end lg:items-end">
                    <div class="flex-col flex md:w-10/12 sm:w-10/12">
                        <div class="w-24 h-24 relative mb-4 pr-2">
                            <img class="w-full h-full" src="@/assets/images/landing/features/featureicon5.svg" />
                        </div>
                        <h5 class="lg:text-5xl text-4xl text-grey font-semibold">
                            Post event Analytics for Content Recommendations
                        </h5>
                        <div class="w-64 my-4 h-2 rounded-full" style="background-color: #d7df23"></div>
                        <p class="text-base text-grey font-normal">
                            Utilize post cast analytics to understand audience participation and preferences, offering
                            personalized
                            content recommendations and improving the overall user experience.
                        </p>
                    </div>
                </div>
                <div class="basic__section__img w-full md:w-auto relative flex object-cover col-span-1 justify-start">
                    <img class="rounded-lg object-cover sm:w-10/12 w-full"
                        src="@/assets/images/landing/features/features5.png" />
                </div>
            </div>
        </div>
        <FootSec />
    </div>
</template>

<script>
import Navbar from './Navbar.vue';
import FootSec from './FootSec.vue';
export default {
    components: {
        Navbar,
        FootSec,
    },
    methods: {
        openTab(tabid) {
            var i;
            var x = document.getElementsByClassName("tab-content");
            var y = document.getElementsByClassName("tabhover");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            for (i = 0; i < x.length; i++) {
                y[i].style.borderColor = "#475569";
            }
            document.getElementById(tabid).style.display = "grid";
            console.log(tabid)
            document.getElementById(tabid + "tab").style.borderColor = "#d7df23";


        }
    }
};
</script>

<style scoped>
.landing {
    height: auto;
    width: 100%;
    background-image: linear-gradient(180deg, #000, #111, #222);
    font-family: 'Montserrat' !important;
    /* overflow-x: hidden; */
    /* background: -webkit-linear-gradient(to bottom,#302f2f,#222121);
  background: linear-gradient(to bottom,#000000,#000000,#000000,#1d1c1c,#141318,#181a20,#222121);  */
}

.basic__section__1 {
    background-image: url('../assets/images/leftPart.svg');
    background-position: left;
    background-repeat: no-repeat;
    background-size: contain;
}

.basic__section__2 {
    background-image: url('../assets/images/rightPart.svg');
    background-position: right;
    background-repeat: no-repeat;
    background-size: contain;
}

.basic__section__img img {
    box-shadow: 50px 50px 100px -12px rgba(214, 224, 36, 0.1);
    transition: all 0.5s ease-in-out;
}

.basic__section__img img:hover {
    box-shadow: 50px 50px 80px -12px rgba(214, 224, 36, 0.2);
}

.tabhover:hover {
    background-color: rgb(24, 24, 24)
}

.head-cont {
    background-color: #d7df23;
    width: 100%;
    min-height: 25vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}</style>