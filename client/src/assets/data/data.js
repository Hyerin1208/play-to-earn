// 임시 nft 데이터 (DB)

import img01 from "../images/q1.png";
import img02 from "../images/q2.png";
import img03 from "../images/q3.png";
import img04 from "../images/q4.png";

import admin from "../images/avatar.png";

import member1 from "../images/member.png";
import member2 from "../images/member2.png";
import member3 from "../images/sh_png.png";

export const NFT__DATA = [
  {
    id: "1",
    title: "Lilo & Stitch",
    desc: "Lilo & Stitch is a 2002 American animated science fiction comedy-drama film produced by Walt Disney Feature Animation and released by Walt Disney Pictures.",
    imgUrl: img01,
    creator: "ALTAVA Group",
    creatorImg: admin,
    currentBid: 5.89,
  },

  {
    id: "2",
    title: "Zootopia Judy Hopps",
    desc: "Officer Judith Laverne Judy Hopps is a female rabbit and the main protagonist of Zootopia",
    imgUrl: img02,
    creator: "ALTAVA Group",
    creatorImg: admin,
    currentBid: 5.09,
  },

  {
    id: "3",
    title: "My Neighbor Totoro",
    desc: "My Neighbor Totoro is a 1988 Japanese animated fantasy film written and directed by Hayao Miyazaki and animated by Studio Ghibli for Tokuma Shoten.",
    imgUrl: img03,
    creator: "ALTAVA Group",
    creatorImg: admin,
    currentBid: 6.89,
  },

  {
    id: "4",
    title: "Bruni (Frozen II)",
    desc: "Bruni is a character in Disney's 2019 animated feature film, Frozen II. Bruni is an inhabitant of the Enchanted Forest and the elemental spirit of fire.",
    imgUrl: img04,
    creator: "ALTAVA Group",
    creatorImg: admin,
    currentBid: 7.89,
  },
];

export const MEMBER__DATA = [
  {
    id: "01",
    MemberName: "doredome",
    MemberImg: member1,
    part: "Front-End Developer",
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "02",
    MemberName: "Mr-butter",
    MemberImg: member2,
    part: "Full-Stack Developer",
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "03",
    MemberName: "coolmarvel",
    MemberImg: member3,
    part: "Back-End Developer",
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },
];
