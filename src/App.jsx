import React, { useState } from "react";

// Mock components for Card, Button, and Input using Tailwind classes
const Card = ({ children, className = "", onClick }) => (
  <div
    className={`bg-white rounded-lg shadow-md ${className} cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
    onClick={onClick}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, variant, className = "" }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200";
  const variantClasses =
    variant === "outline"
      ? "border border-amber-700 text-amber-700 hover:bg-amber-100"
      : "bg-amber-600 text-white hover:bg-amber-700";

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const Input = ({ placeholder, value, onChange, className = "" }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${className}`}
  />
);

// Blog posts data
const posts = [
  {
    id: "1",
    title: "部落格文章一",
    date: "2025-08-07",
    tags: ["生活", "風格"],
    summary: "這是一篇關於生活風格的文章摘要...",
    content:
      "這是一篇關於生活風格的完整文章內容。在現代快節奏的生活中，我們常常忽略了身邊的美好事物。透過慢下來的生活方式，我們能夠重新發現生活中的小確幸，並建立屬於自己的獨特風格。",
  },
  {
    id: "2",
    title: "部落格文章二",
    date: "2025-08-05",
    tags: ["咖啡", "手沖"],
    summary: "這篇文章介紹了咖啡文化與手沖技巧...",
    content:
      "咖啡不僅僅是一種飲品，更是一種文化和生活態度。手沖咖啡的過程需要耐心和技巧，從選豆、研磨到沖泡，每一個步驟都影響著最終的風味。透過手沖咖啡，我們能夠享受慢節奏的生活，品味每一口香醇。",
  },
  {
    id: "3",
    title: "部落格文章三",
    date: "2025-08-03",
    tags: ["攝影", "風景"],
    summary: "探討攝影技巧與風景拍攝的心得分享...",
    content:
      "攝影是捕捉瞬間美好的藝術。在風景攝影中，光線、構圖和時機都是關鍵因素。透過不同的角度和技巧，我們能夠將大自然的壯美永遠定格，與更多人分享這份感動。",
  },
];

// Filtered tag list
const uniqueTags = ["全部", "咖啡", "生活", "攝影"];

export default function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("全部");
  const [currentView, setCurrentView] = useState("home");
  const [selectedPostId, setSelectedPostId] = useState(null);

  const filteredPosts = posts.filter(
    (post) =>
      (filter === "全部" || post.tags.includes(filter)) &&
      (post.title.includes(search) || post.summary.includes(search))
  );

  const selectedPost = posts.find((p) => p.id === selectedPostId);

  const HomePage = () => (
    <div className="min-h-screen bg-amber-50 text-amber-900 p-6">
      <Navbar />
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">我的部落格</h1>
        <p className="text-lg">分享生活、創意與靈感</p>
      </header>
      <section className="flex flex-wrap gap-4 mb-6 justify-center">
        {uniqueTags.map((tag) => (
          <Button
            key={tag}
            variant={filter === tag ? "default" : "outline"}
            onClick={() => setFilter(tag)}
            className="rounded-lg"
          >
            {tag}
          </Button>
        ))}
      </section>
      <section className="mb-6 max-w-md mx-auto">
        <Input
          placeholder="搜尋文章..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg"
        />
      </section>
      <section className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto mb-8">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            onClick={() => {
              setSelectedPostId(post.id);
              setCurrentView("post");
            }}
          >
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mb-4 text-sm">{post.summary}</p>
            </CardContent>
          </Card>
        ))}
        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-8 col-span-full">找不到符合條件的文章。</p>
        )}
      </section>
      <Footer />
    </div>
  );

  // PostPage 和 AboutPage 不變
  switch (currentView) {
    case "post":
      return <PostPage />;
    case "about":
      return <AboutPage />;
    default:
      return <HomePage />;
  }
}
