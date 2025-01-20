const getPostLinksInProfile = require("./getPostLinksInProfile");
const login = require("./login");
const postDetails = require("./postDetails");

async function fetchPosts(page) {
  await login(page);

  const profileUrl = "https://www.instagram.com/maptobe.app/";
  const postLinks = await getPostLinksInProfile(page, profileUrl);

  console.log(`Found ${postLinks.length} unique post links`);
  if (postLinks.length === 0) {
    throw new Error(
      "No posts found - page might be private or structure changed"
    );
  }

  const processedPosts = [];
  let counter = 0;

  // Process each post link
  for (const postUrl of postLinks) {
    try {
      console.log(`Processing post: ${postUrl}`);

      const fetchedDetails = await postDetails(page, postUrl);
      processedPosts.push({
        postUrl,
        ...fetchedDetails,
      });
      console.log(
        `Added post from (${fetchedDetails.timestamp}) with ${fetchedDetails.images.length} image(s) and ${fetchedDetails.videos.length} video(s)`
      );
      counter++;
      if (counter === 2) break;
    } catch (error) {
      console.error(`Error processing post ${postUrl}:`, error);
      continue;
    }
  }

  return processedPosts;
}

module.exports = fetchPosts;
