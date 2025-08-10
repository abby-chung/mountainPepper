import React, { useState } from "react";

// Mock components for Card, Button, and Input using Tailwind classes
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, variant, className = "" }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200";
  const variantClasses = variant === "outline" 
    ? "border border-amber-700 text-amber-700 hover:bg-amber-100" 
    : "bg-amber-600 text-white hover:bg-amber-700";

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className}`} 
      onClick={onClick}
    >
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
    content: "這是一篇關於生活風格的完整文章內容。在現代快節奏的生活中，我們常常忽略了身邊的美好事物。透過慢下來的生活方式，我們能夠重新發現生活中的小確幸，並建立屬於自己的獨特風格。"
  },
  {
    id: "2",
    title: "部落格文章二",
    date: "2025-08-05",
    tags: ["咖啡", "手沖"],
    summary: "這篇文章介紹了咖啡文化與手沖技巧...",
    content: "咖啡不僅僅是一種飲品，更是一種文化和生活態度。手沖咖啡的過程需要耐心和技巧，從選豆、研磨到沖泡，每一個步驟都影響著最終的風味。透過手沖咖啡，我們能夠享受慢節奏的生活，品味每一口香醇。"
  },
  {
    id: "3",
    title: "部落格文章三",
    date: "2025-08-03",
    tags: ["攝影", "風景"],
    summary: "探討攝影技巧與風景拍攝的心得分享...",
    content: "攝影是捕捉瞬間美好的藝術。在風景攝影中，光線、構圖和時機都是關鍵因素。透過不同的角度和技巧，我們能夠將大自然的壯美永遠定格，與更多人分享這份感動。"
  }
];

// Extract unique tags
const uniqueTags = ["全部", ...new Set(posts.flatMap((post) => post.tags))];

export default function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("全部");
  const [currentView, setCurrentView] = useState("home");
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Filter posts based on search and tag filter
  const filteredPosts = posts.filter(
    (post) =>
      (filter === "全部" || post.tags.includes(filter)) &&
      (post.title.includes(search) || post.summary.includes(search))
  );

  const selectedPost = posts.find(p => p.id === selectedPostId);

  // Navigation component
  const Navbar = () => (
    <nav className="flex justify-between items-center bg-white px-6 py-4 shadow-md mb-6 rounded-lg">
      <button 
        onClick={() => setCurrentView("home")} 
        className="text-2xl font-bold text-amber-800 hover:text-amber-900 transition-colors"
      >
        Mountain Pepper
      </button>
      <div className="flex gap-4">
        <button 
          onClick={() => setCurrentView("home")} 
          className="text-amber-700 hover:underline"
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentView("about")} 
          className="text-amber-700 hover:underline"
        >
          About
        </button>
      </div>
    </nav>
  );

  // Footer component
  const Footer = () => (
    <footer className="bg-white mt-12 py-8 px-6 shadow-md rounded-lg">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-amber-800 mb-3">Mountain Pepper</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              分享生活中的美好時光，記錄創意與靈感的點點滴滴。
            </p>
          </div>
          
          {/* Quick links */}
          <div className="text-center">
            <h4 className="font-semibold text-amber-700 mb-3">快速連結</h4>
            <div className="space-y-2">
              <button 
                onClick={() => setCurrentView("home")} 
                className="block mx-auto text-gray-600 hover:text-amber-700 text-sm transition-colors"
              >
                首頁
              </button>
              <button 
                onClick={() => setCurrentView("about")} 
                className="block mx-auto text-gray-600 hover:text-amber-700 text-sm transition-colors"
              >
                關於我
              </button>
              <div className="text-gray-600 text-sm">最新文章</div>
            </div>
          </div>
          
          {/* Contact info */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-amber-700 mb-3">聯絡方式</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Email: hello@mountainpepper.com</div>
              <div>Instagram: @mountainpepper</div>
              <div className="flex justify-center md:justify-end gap-4 mt-4">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-200 transition-colors">
                  <span className="text-amber-700 text-xs">FB</span>
                </div>
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-200 transition-colors">
                  <span className="text-amber-700 text-xs">IG</span>
                </div>
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-200 transition-colors">
                  <span className="text-amber-700 text-xs">TW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Mountain Pepper. 保留所有權利。
          </p>
        </div>
      </div>
    </footer>
  );

  // Home page component
  const HomePage = () => (
    <div className="min-h-screen bg-amber-50 text-amber-900 p-6">
      <Navbar />

      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">我的部落格</h1>
        <p className="text-lg">分享生活、創意與靈感</p>
      </header>

      {/* Tag filter buttons */}
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

      {/* Search input */}
      <section className="mb-6 max-w-md mx-auto">
        <Input
          placeholder="搜尋文章..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg"
        />
      </section>

      {/* Posts grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-8">
        {filteredPosts.map((post) => (
          <Card 
            key={post.id} 
            className="rounded-lg shadow-md transition-transform hover:scale-105 duration-300 flex flex-col"
          >
            <CardContent className="p-4 flex flex-col flex-grow">
              <div className="flex-grow">
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
              </div>
              <Button 
                className="rounded-lg w-full"
                onClick={() => {
                  setSelectedPostId(post.id);
                  setCurrentView("post");
                }}
              >
                閱讀更多
              </Button>
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

  // Post page component
  const PostPage = () => {
    if (!selectedPost) {
      return (
        <div className="min-h-screen bg-amber-50 text-amber-900 p-6">
          <Navbar />
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">找不到文章</h2>
            <Button onClick={() => setCurrentView("home")}>返回首頁</Button>
          </div>
          <Footer />
        </div>
      );
    }

    const relatedPosts = posts.filter(p => 
      p.id !== selectedPost.id && 
      p.tags.some(tag => selectedPost.tags.includes(tag))
    ).slice(0, 3);

    return (
      <div className="min-h-screen bg-amber-50 text-amber-900 p-6">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h1 className="text-3xl font-bold mb-3">{selectedPost.title}</h1>
                <p className="text-sm text-gray-500 mb-4">{selectedPost.date}</p>
                <div className="flex gap-2 mb-6">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="prose max-w-none mb-6">
                  <p className="leading-relaxed text-base">{selectedPost.content}</p>
                </div>
                <Button onClick={() => setCurrentView("home")} className="rounded-lg">
                  返回首頁
                </Button>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <h3 className="font-bold mb-4">相關文章</h3>
                {relatedPosts.length > 0 ? (
                  <div className="space-y-3">
                    {relatedPosts.map(post => (
                      <div 
                        key={post.id}
                        className="cursor-pointer text-amber-700 hover:text-amber-900 text-sm border-b border-gray-200 pb-2"
                        onClick={() => {
                          setSelectedPostId(post.id);
                        }}
                      >
                        {post.title}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">暫無相關文章</p>
                )}
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  // About page component
  const AboutPage = () => (
    <div className="min-h-screen bg-amber-50 text-amber-900 p-6">
      <Navbar />
      <div className="max-w-2xl mx-auto mb-8">
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-4">關於我</h1>
          <div className="prose">
            <p className="mb-4 leading-relaxed">
              歡迎來到我的個人部落格！這裡是我分享生活感悟、創意靈感和學習心得的地方。
            </p>
            <p className="mb-4 leading-relaxed">
              我相信生活中處處都有美好的事物等待我們發現，透過文字和影像，
              我希望能與大家分享這些珍貴的時刻。
            </p>
            <p className="leading-relaxed">
              如果你對我的文章有任何想法或建議，歡迎與我交流！
            </p>
          </div>
          <div className="mt-6">
            <Button onClick={() => setCurrentView("home")} className="rounded-lg">
              返回首頁
            </Button>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );

  // Render current view
  switch (currentView) {
    case "post":
      return <PostPage />;
    case "about":
      return <AboutPage />;
    default:
      return <HomePage />;
  }
}
