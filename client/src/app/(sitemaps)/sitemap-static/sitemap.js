export default function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://sarajevoexpats.com";

  return [
    {
      url: baseUrl,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/qaas`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      priority: 0.9,
    },
  ];
}
