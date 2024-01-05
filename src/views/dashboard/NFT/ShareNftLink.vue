<template>
    <div class="basic_parent_nft">
        <div class="head-container">
            <h3>Share public NFT link</h3>
            <button @click="closeDrops">
                <img src="@/assets/images/cross.svg" />
            </button>
        </div>
        <span class="share_basic">
            <div title="Public NFT Link">
                <div class="copy-Link">
                    <!-- <p class="text-white my-2 text-xl mb-6">Share</p> -->
                    <div>
                        <div class="link-container">
                            <span id="datatoken" class="link-text px-2">
                                {{ `https://decast.live/public/nftdrop?cast_id=${cast_id}` }}
                            </span>
                            <button class="copy-btn rounded-md cursor-pointer" @click="copy">
                                Copy
                            </button>
                        </div>
                    </div>
                    <div>
                        <!-- <p class="hr-lines">or</p> -->
                        <div class="social-icons my-5 w-8/12 mx-auto justify-between">
                            <button class="whatsapp p-5 cursor-pointer rounded-full w-16 h-16 items-center text-center"
                                @click="shareOnWhatsApp">
                                <i class="fa fa-whatsapp text-3xl m-auto"></i>
                            </button>
                            <button class="twitter p-5 cursor-pointer rounded-full w-16 h-16 items-center text-center"
                                @click="shareOnTwitter">
                                <i class="fa fa-twitter text-3xl m-auto"></i>
                            </button>
                            <button class="facebook p-5 cursor-pointer rounded-full w-16 h-16 items-center text-center"
                                @click="shareOnFacebook">
                                <i class="fa fa-facebook text-3xl m-auto"></i>
                            </button>
                            <button class="reddit p-5 cursor-pointer rounded-full w-16 h-16 items-center text-center"
                                @click="shareOnReddit">
                                <i class="fa fa-reddit text-3xl m-auto"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    </div>
</template>
  
<script>
export default {
    name: 'ShareNftLink',
    props: ['cast_id', 'ToggleEdit'],
    data() {
        return {
            showCopyPopup: false,
        };
    },
    methods: {
        closeDrops() {
            this.ToggleEdit('');
        },
        shareOnFacebook() {
            const url = encodeURIComponent(
                `https://decast.live/public/nftdrop?cast_id=${this.cast_id}`
            );
            const text = encodeURIComponent(
                'Take a look at this unique digital artwork!\n'
            );
            const shareUrl = `https://www.facebook.com/sharer.php?u=${url}&quote=${text}`;
            window.open(shareUrl, '_blank', 'width=550,height=420');
        },
        shareOnTwitter() {
            const url = encodeURIComponent(
                `https://decast.live/public/nftdrop?cast_id=${this.cast_id}`
            );
            const text = encodeURIComponent(
                'Take a look at this unique digital artwork!'
            );
            const via = encodeURIComponent('yourTwitterHandle');
            const hashtags = encodeURIComponent('example,cool,nft,DigitalArtwork');
            const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&via=${via}&hashtags=${hashtags}`;
            window.open(shareUrl, '_blank', 'width=550,height=420');
        },
        shareOnWhatsApp() {
            const url = encodeURIComponent(
                `https://decast.live/public/nftdrop?cast_id=${this.cast_id}`
            );
            const text = encodeURIComponent(
                'Take a look at this unique digital artwork!\n'
            );
            const shareUrl = `whatsapp://send?text=${text} ${url}`;
            window.open(shareUrl, '_blank', 'width=550,height=420');
        },
        shareOnReddit() {
            const url = `https://www.reddit.com/submit?url=${encodeURIComponent(
                `https://decast.live/public/nftdrop?cast_id=${this.cast_id}`
            )}&title=${encodeURIComponent(
                'Take a look at this unique digital artwork!\n'
            )}`;
            window.open(url, '_blank', 'width=550,height=420');
        },
        copy() {
            navigator.clipboard.writeText(
                `https://decast.live/public/nftdrop?cast_id=${this.cast_id}`
            );
            document.getElementById('datatoken').style.color = 'green';
        },
    },
};
</script>
  
<style scoped>
.head-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #a6a6a8;
}

.head-container h3 {
    font-size: 14px;
    font-weight: 600px;
    color: #a6a6a8;
}

.head-container button {
    background-color: #1f272f;
    border: none;
    cursor: pointer;
}

.basic_parent_nft {
    width: auto;
    height: auto;
    border-radius: 12px;
    background-color: #1d2129;
    position: relative;
    padding: 15px;
}
</style>
  
<style>
.social-icons {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
}

.whatsapp {
    background-color: #25d366;
    color: #fff;
    /* White text */
    border: none;
    /* No border */
    font-size: 20px;
}

.twitter {
    background-color: #1da1f2;
    color: #fff;
    border: none;
    font-size: 20px;
}

.facebook {
    background-color: #3b5998;
    /* Facebook blue */
    color: #fff;
    border: none;
    font-size: 20px;
}

.reddit {
    background-color: #ff4500;
    /* Reddit orange */
    color: #ffffff;
    /* white */
    border: none;
    font-size: 20px;
}

.link-container {
    display: flex;
    align-items: center;
    border: 1px solid #31394e;
    padding: 10px;
    border-radius: 12px;
}

.link-container span {
    flex-grow: 1;
}

.copy-Link {
    margin-top: 20px;
}

.airdrop-btn {
    background: #d7df23 !important;
    color: #111111 !important;
}

.copy-btn {
    background-color: #d7df23;
    color: #111111;
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 12px;
    font-weight: 600;
    margin-left: 6px;
}

.link-text {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
  