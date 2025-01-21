const delay = require("../delay");

async function getPostLinksInProfile(page, profileUrl, first) {
  await page.goto(profileUrl, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  await delay(2000);

  return await page.evaluate(
    async (first) => {
      console.log("evaluate");

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      const getUniqueHrefs = (elements) => {
        const hrefs = new Set();
        elements?.forEach((el) => el.href && hrefs.add(el.href));
        return Array.from(hrefs);
      };

      const footer = document.querySelector("footer");
      let i = first ? 5 : 2;
      for (; i > 0; i--) {
        footer.scrollIntoView();
        await delay(2000);
        console.log("Scrolling to footer");
      }

      const postsContainers = document.querySelectorAll(
        "div._ac7v.x1f01sob.xcghwft.xat24cr.xzboxd6"
      );
      let links = [];

      if (postsContainers) {
        postsContainers.forEach((postsContainer) => {
          const postAnchors = postsContainer.querySelectorAll("a[href*='/p/']");

          links = [...links, ...getUniqueHrefs(postAnchors)];
        });
      } else {
        console.log("Falling back to articles selector");
        // Fallback to articles if specific selector fails
        const articles = document.querySelectorAll("article");
        articles.forEach((article) => {
          const postAnchors = article.querySelectorAll("a[href*='/p/']");
          const reelAnchors = article.querySelectorAll("a[href*='/reel/']");

          links = [
            ...links,
            ...getUniqueHrefs(postAnchors),
            ...getUniqueHrefs(reelAnchors),
          ];
        });
      }
      return [...new Set(links)];
    },
    first
  );
}

module.exports = getPostLinksInProfile;
