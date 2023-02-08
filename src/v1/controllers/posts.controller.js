const crypto = require("crypto");

const postId = () => crypto.randomUUID();
const bots = [
  {
    fullName: "Spammer",
    avatarUrl:
      "https://res.cloudinary.com/dojxk4gav/image/upload/v1675143931/facebook/spammer_c7waux.jpg",
  },
  {
    fullName: "Hacker",
    avatarUrl:
      "https://res.cloudinary.com/dojxk4gav/image/upload/v1675143931/facebook/hacker_m4mgl3.jpg",
  },
  {
    fullName: "Farmer",
    avatarUrl:
      "https://res.cloudinary.com/dojxk4gav/image/upload/v1675143931/facebook/farmer_oodsfh.jpg",
  },
  {
    fullName: "Faker",
    avatarUrl:
      "https://res.cloudinary.com/dojxk4gav/image/upload/v1675143931/facebook/faker_hngacn.jpg",
  },
  {
    fullName: "Slayer Demon",
    avatarUrl:
      "https://res.cloudinary.com/dojxk4gav/image/upload/v1675143931/facebook/slayer_tqqmda.jpg",
  },
  {
    fullName: "Biker",
    avatarUrl:
      "https://res.cloudinary.com/dojxk4gav/image/upload/v1675143931/facebook/biker_r7uygi.jpg",
  },
  {
    fullName: "Tranformer",
    avatarUrl:
      "https://res.cloudinary.com/dojxk4gav/image/upload/v1675143931/facebook/transfomer_wiywyz.jpg",
  },
  {
    fullName: "Tiktoker",
    avatarUrl:
      "https://res.cloudinary.com/dojxk4gav/image/upload/v1675143931/facebook/tiktoker_mdqptm.jpg",
  },
];
const botsLength = bots.length;
const NUMBER_POSTS = 10;
const timeRandom = 24 * 60 * 60 * 1000 * 7;
const likeCount = 100000000;
const commentCount = 1000000;
const shareCount = 100000;

const generatePosts = () => {
  const posts = [];
  const time = new Date();
  const createAt = time.getTime();
  for (let i = 0; i < NUMBER_POSTS; i++) {
    const { fullName, avatarUrl } =
      bots[Math.floor(Math.random() * botsLength)];
    posts.push({
      id: postId(),
      type: "user",
      fullName,
      avatarUrl,
      audience: 0,
      createAt: createAt - Math.floor(Math.random() * timeRandom),
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto suscipit nobis excepturi necessitatibus fugiat deleniti placeat officia cumque. Excepturi blanditiis labore cum. Voluptatum quos, cum animi tempora odio minima.",
      likeCount: Math.floor(Math.random() * likeCount),
      commentCount: Math.floor(Math.random() * commentCount),
      shareCount:
        Math.random() > 0.5 ? Math.floor(Math.random() * shareCount) : 0,
    });
  }
  return posts;
};

const that = {
  home: async function (req, res) {
    const posts = generatePosts();
    return res.status(200).json({ posts });
  },
};

module.exports = that;
