const getPostLinksInProfile = require("./getPostLinksInProfile");
const postDetails = require("./postDetails");

async function fetchPosts(page, first) {
  const profileUrl = "https://www.instagram.com/maptobe.app/";
  const postLinks = await getPostLinksInProfile(page, profileUrl, first);

  console.log(`Found ${postLinks.length} unique post links`);
  if (postLinks.length === 0) {
    throw new Error(
      "No posts found - page might be private or structure changed"
    );
  }

  const processedPosts = [];

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
        `Added post from (${fetchedDetails.date}) with ${fetchedDetails.images.length} image(s) and ${fetchedDetails.videos.length} video(s)`
      );
    } catch (error) {
      console.error(`Error processing post ${postUrl}:`, error);
      continue;
    }
  }
  page.close();

  return processedPosts;
}

module.exports = fetchPosts;
