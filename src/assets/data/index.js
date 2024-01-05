export const SCENE_VERSION = {
    AUDIO: "audio",
    SUBTITLE: "subtitle",
    ANIMATION: "animation",
    RAW: "raw"
}
export const MEDIA_TYPES = {
    VIDEO: "video",
    IMAGE: "image"
}
export const PANELS = {
    SOUND: "SOUND",
    COURSE: "COURSE",
    LIBRARY: "LIBRARY"
}
export const PRIORITY = {
    SOUND: 2,
    COURSE: 1,
    LIBRARY: 0
}

export const defaultStyles = {
    font_color: '#ffffff',
    text_position: 'bottom',
    background_color: '#674ea7',
    alignment: 'left',
    animation: 'none'
};

export const defaultPhotoURL = require('@/assets/images/user-icon-placeholder.png');

export const animationList = [
    { value: 'none', label: 'None' },
    { value: 'zoom_in', label: 'Zoom In' },
    { value: 'zoom_out', label: 'Zoom Out' },
    { value: 'pan_up', label: 'Pan Up' },
    { value: 'pan_right', label: 'Pan Right' },
    { value: 'pan_down', label: 'Pan Down' },
    { value: 'pan_left', label: 'Pan Left' },
    { value: 'pan_top_right', label: 'Pan Top Right' },
    { value: 'pan_bottom_right', label: 'Pan Bottom Right' },
    { value: 'pan_top_left', label: 'Pan Top Left' },
    { value: 'pan_bottom_left', label: 'Pan Bottom Left' },
    { value: 'rotate_clockwise', label: 'Rotate Clockwise' },
    { value: 'rotate_anti_clockwise', label: 'Rotate Anti Clockwise' }
];

export const transitionList = [
    { label: 'No motion', value: 'no_motion' },
    { label: 'Fade', value: 'fade' },
    { label: 'Fade Black', value: 'fadeblack' },
    { label: 'Fade White', value: 'fadewhite' },
    { label: 'Wipe Left', value: 'wipeleft' },
    { label: 'Wipe Right', value: 'wiperight' },
    { label: 'Wipe Up', value: 'wipeup' },
    { label: 'Wipe Down', value: 'wipedown' },
    { label: 'Slide Left', value: 'slideleft' },
    { label: 'Slide Right', value: 'slideright' },
    { label: 'Slide Up', value: 'slideup' },
    { label: 'Slide Down', value: 'slidedown' },
    { label: 'Smooth Left', value: 'smoothleft' },
    { label: 'Smooth Right', value: 'smoothright' },
    { label: 'Smooth Up', value: 'smoothup' },
    { label: 'Smooth Down', value: 'smoothdown' },
    { label: 'Circle Crop', value: 'circlecrop' },
    { label: 'Rectangle Crop', value: 'rectcrop' },
    { label: 'Circle Close', value: 'circleclose' },
    { label: 'Circle Open', value: 'circleopen' },
    { label: 'Horizontal Close', value: 'horzclose' },
    { label: 'Horizontal Open', value: 'horzopen' },
    { label: 'Vertical Close', value: 'vertclose' },
    { label: 'Vertical Open', value: 'vertopen' },
    { label: 'Diagonal Bottom Left', value: 'diagbl' },
    { label: 'Diagonal Bottom right', value: 'diagbr' },
    { label: 'Diagonal Top Left', value: 'diagtl' },
    { label: 'Diagonal Top Right', value: 'diagtr' },
    { label: 'Horizontal Left Slice', value: 'hlslice' },
    { label: 'Horizontal Right Slice', value: 'hrslice' },
    { label: 'Vertical Up Slice', value: 'vuslice' },
    { label: 'Vertical Down Slice', value: 'vdslice' },
    { label: 'Pixelize', value: 'pixelize' },
    { label: 'Dissolve', value: 'dissolve' }
]

export const genreList = [
    { value: 'all', label: 'All' },
    { value: 'ambient', label: 'Ambient' },
    { value: 'blues', label: 'Blues' },
    { value: 'bumpers & stingers', label: 'Bumpers & Stingers' },
    { value: 'chill out', label: 'Chill Out' },
    { value: 'cinematic', label: 'Cinematic' },
    { value: 'classical', label: 'Classical' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'country', label: 'Country' },
    { value: 'electronic', label: 'Electronic' },
    { value: 'folk', label: 'Folk' },
    { value: 'hip hop', label: 'Hip Hop' },
    { value: 'holidays & special events', label: 'Holidays & Special Events' },
    { value: 'horror', label: 'Horror' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'kids and family', label: 'Kids & Family' },
    { value: 'pop', label: 'Pop' },
    { value: 'religious', label: 'Religious' },
    { value: 'rhythm & blues', label: 'Rhythm & Blues' },
    { value: 'rock', label: 'Rock' },
    { value: 'world', label: 'World' }
]

export const teamList = [{
    name: 'Nataliia Rheskava',
    role: 'Co-Founder/CIO',
    image: require('../../assets/images/pages/team/natalia_rheskava.jpeg'),
    social: {
        linkedin: 'https://www.linkedin.com/in/nataliia-rzhevska-486a791a8/'
    },
    loc: [48.3794, 31.1656]
},
{
    name: 'Marta Matias',
    role: 'Project & Communication Manager',
    image: require('../../assets/images/pages/team/marta.jpeg'),
    social: {
        linkedin: 'https://www.linkedin.com/in/martasoaresmatias/'
    },
    loc: [40.6405, 8.6538]
},
{
    name: 'Negar Ekrami',
    role: 'Strategic Partnerships & Program Development',
    image: require('../../assets/images/pages/team/negar.jpeg'),
    social: {
        linkedin: 'https://www.linkedin.com/in/negar-ekrami-b8aaa71b6/'
    },
    loc: [64.1466, 21.9426]
},
{
    name: 'Jyoti Sing',
    role: 'User Experience Designer',
    image: require('../../assets/images/pages/team/jyoti_sing.png'),
    social: {
        linkedin: 'https://linkedin.com/in/jyotising',
        resume: '#'
    },
    loc: [22.5726, 88.3639]
},
{
    name: 'Puneet Gupta',
    role: 'Full Stack & AI Developer',
    image: require('../../assets/images/pages/team/puneet_gupta.png'),
    social: {
        linkedin: 'https://www.linkedin.com/in/puneet-gupta-5415a4153/',
        resume: 'https://ci.getboarded.tech/en/e/puneet-gupta-1605745717-5127'
    },
    loc: [28.4595, 77.0266]
},
{
    name: 'Aman Bishnoi',
    role: 'Lead Backend Developer',
    image: require('../../assets/images/pages/team/aman.jpeg'),
    social: {
        linkedin: 'https://www.linkedin.com/in/aman-j-bishnoi/',
    },
    loc: [28, 76]

},
{
    name: 'Tomás Santana',
    role: 'Marketing Manager',
    image: require('../../assets/images/pages/team/tomas.jpeg'),
    social: {
        linkedin: 'https://www.linkedin.com/in/tom%C3%A1s-santana-aaa7441bb/',
    },
    loc: [40.6023, 8.6724]
}

];

export const PLUGIN_NAMES = {
    MS_TEAMS: "MS_TEAMS",
    OCEAN_PROTOCOL: "OCEAN_PROTOCOL"
}

export const PLUGIN_DATA = {
    [PLUGIN_NAMES.MS_TEAMS]: {
        demoVideoURL: 'https://www.youtube.com/embed/zbZ3P9tllJY',
        demoGifURL: 'https://dapi.videowiki.pt/media/teams-card/videowiki_teams.gif',
        features: [{
            title: 'Convert Any Media',
            desc: 'Possibility to convert any shared media format (text, ppt, doc, weblink) into an immersive video.'
        },
        {
            title: 'Generate Video Logs',
            desc: 'Save and post-produce recorded meeting streams to make better video logs.'
        },
        {
            title: 'Create Video Notes',
            desc: 'Create video notes, minutes of meetings, and track record of important information with editor features like trim, split, switch, etc.'
        },
        {
            title: 'Forking the Videos',
            desc: 'Collaborate on video by forking the videos to add your input, revisit and review to keep information up-todate. All without re-doing the whole video or knowledge of complicated video editing software. Corrected'
        }
        ],
        working: `VideoWiki uses AI-based text classification methods so we can identify the context of the content and make
    queries to public video media libraries using APIs. These can be given back to the teachers as an assisted
    course creation tool to develop interactive digital media.`,
        usage: [
            'Using the message extension one can jump to our video creation platform.',
            'Any uploaded PowerPoint or recorded session can be directly used to create a video.',
            `A VideoWiki Bot that gives a tour and guides on how to create video-based content from texts or
      presentations.`,
            'Using commands, one can jump to the creation platform.',
            `Task Module to view already created content and assist in the creation of new videos.`
        ]
    },
    [PLUGIN_NAMES.OCEAN_PROTOCOL]: {
        demoVideoURL: 'https://www.youtube.com/embed/YXSDy3R_5LQ',
        demoGifURL: 'https://dapi.videowiki.pt/media/teams-card/ocean_gif.gif',
        features: [{
            title: 'Publish On OCEAN Marketplace',
            desc: 'Your created content is published using OCEAN protocol. This means your content will stay on the Ethereum blockchain.'
        },
        {
            title: 'Monetize Your Content',
            desc: 'Sell your content for OCEAN tokens at a price you set using the OCEAN protocol.'
        },
        {
            title: 'IP Protected',
            desc: 'To access your content one has to buy your Datatoken by paying you in OCEAN token. None can access your content or copy/forge it without your permission.'
        },
        {
            title: 'Buy using OCEAN Tokens',
            desc: 'Buy and Download content for OCEAN tokens'
        },
        ],
        working: `The content after it’s created is stored in our server. The access link is stored in the Ethereum Blockchain using the popular OCEAN Protocol. When you select the Paid option before publishing, you will be required to connect your Metamask wallet. Once connected and you hit the publish button, a series of Metamask will pop up asking you to sign each transaction. Each transaction is described in brief in the modul that guides you through the process. One completed the steps, your content is now stored on the Blockchain.`,
        usage: [
            'Content can be published using the OCEAN Protocol',
            'Contents can be sold for OCEAN tokens at a price decided by the creator',
            'To get access, buy content using OCEAN tokens',
            'Guided step by step instruction for using blockchain'

        ]
    }
};