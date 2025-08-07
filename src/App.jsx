import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import clsx from 'clsx'; // 使用 clsx 讓 className 條件式組合更簡潔

// 為了在單一文件中執行，我們將為 Shadcn UI 元件提供簡單的模擬實現。
// 在實際專案中，這些元件會從您的 "@/components/ui" 路徑導入。

/**
 * 模擬 Card 元件
 * @param {object} props - 屬性
 * @param {React.ReactNode} props.children - 子元素
 * @param {string} [props.className] - CSS 類名
 */
const Card = ({ children, className }) => (
  <div className={clsx("bg-white rounded-2xl shadow-md", className)}>
    {children}
  </div>
);

/**
 * 模擬 CardContent 元件
 * @param {object} props - 屬性
 * @param {React.ReactNode} props.children - 子元素
 * @param {string} [props.className] - CSS 類名
 */
const CardContent = ({ children, className }) => (
  <div className={clsx("p-6", className)}>{children}</div>
);

/**
 * 模擬 Button 元件
 * @param {object} props - 屬性
 * @param {React.ReactNode} props.children - 子元素
 * @param {function} [props.onClick] - 點擊事件處理器
 * @param {"default" | "outline"} [props.variant] - 按鈕樣式變體
 * @param {string} [props.className] - CSS 類名
 */
const Button = ({ children, onClick, variant, className }) => {
  const baseClasses = "px-4 py-2 rounded-xl font-medium transition-colors duration-200";
  const variantClasses = clsx({
    "border border-orange-700 text-orange-700 hover:bg-orange-100": variant === "outline",
    "bg-orange-600 text-white hover:bg-orange-700": variant !== "outline"
  });

  return (
    <button className={clsx(baseClasses, variantClasses, className)} onClick={onClick}>
      {children}
    </button>
  );
};

/**
 * 模擬 Input 元件
 * @param {object} props - 屬性
 * @param {string} [props.placeholder] - 佔位符文本
 * @param {string} props.value - 輸入值
 * @param {function} props.onChange - 值改變事件處理器
 * @param {string} [props.className] - CSS 類名
 */
const Input = ({ placeholder, value, onChange, className }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
  />
);

// 部落格文章的靜態資料
const posts = [
  {
    id: "1",
    title: "部落格文章一",
    date: "2025-08-07",
    tags: ["生活", "風格"],
    summary: "這是一篇關於生活風格的文章摘要...",
    content: "這是一篇關於生活風格的完整文章內容。"
  },
  {
    id: "2",
    title: "部落格文章二",
    date: "2025-08-05",
    tags: ["咖啡", "手沖"],
    summary: "這篇文章介紹了咖啡文化與手沖技巧...",
    content: "這篇文章介紹了咖啡文化與手沖技巧的詳細內容。"
  }
];

// 從所有文章中提取所有不重複的標籤
const uniqueTags = ["全部", ...new Set(posts.flatMap((post) => post.tags))];

/**
 * 導航列元件
 */
function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-white px-6 py-4 shadow-md mb-6 rounded-xl">
      <Link to="/" className="text-2xl font-bold text-orange-800 no-underline hover:no-underline focus:no-underline visited:no-underline">
        Mountain Pepper
      </Link>
      <div className="flex gap-4">
        <Link to="/" className="text-orange-700 hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-orange-700 hover:underline">
          About
        </Link>
      </div>
    </nav>
  );
}

/**
 * 首頁元件
 */
function HomePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("全部");

  const filteredPosts = posts.filter(
    (post) =>
      (filter === "全部" || post.tags.includes(filter)) &&
      (post.title.includes(search) || post.summary.includes(search))
  );

  return (
    <main className="min-h-screen bg-orange-50 text-brown-900 p-6">
      <Navbar />

      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">我的部落格</h1>
        <p className="text-lg">分享生活、創意與靈感</p>
      </header>

      {/* 標籤篩選按鈕區塊 */}
      <section className="flex flex-wrap gap-8 mb-6 justify-center">
        {uniqueTags.map((tag) => (
          <Button
            key={tag}
            variant={filter === tag ? "default" : "outline"}
            onClick={() => setFilter(tag)}
            className="rounded-xl"
          >
            {tag}
          </Button>
        ))}
      </section>

      {/* 搜尋輸入框區塊 */}
      <section className="mb-6 mx-auto px-4">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 md:w-96 h-12 rounded-xl"
        />
      </section>

      {/* 文章列表區塊 */}
      <section className="grid gap-6 md:grid-cols-2 max-w-7xl mx-auto">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="rounded-2xl shadow-md transition-transform hover:scale-[1.02] duration-300">
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <div className="flex gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mb-4">{post.summary}</p>
              <Link to={`/post/${post.id}`}>
                <Button className="rounded-xl">閱讀更多</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-8 md:col-span-2">找不到符合條件的文章。</p>
        )}
      </section>
    </main>
  );
}

/**
 * 文章詳情頁元件
 */
function PostPage() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const latestPosts = [...posts]
    .filter(p => p.id !== id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (!post)
    return (
      <main className="min-h-screen bg-orange-50 text-brown-900 p-6 text-center">
        <Navbar />
        <p className="text-xl">找不到文章</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-orange-50 text-brown-900 p-6">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
        {/* 主要文章內容區 */}
        <section className="lg:w-2/3 bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{post.date}</p>
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mb-6 leading-relaxed whitespace-pre-wrap">{post.content}</p>
          <Link to="/">
            <Button className="rounded-xl">返回上一頁</Button>
          </Link>
        </section>

        {/* 側邊欄最新文章區 */}
        <aside className="lg:w-1/3 space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">最新文章</h3>
            <ul className="space-y-3">
              {latestPosts.map(p => (
                <li key={p.id}>
                  <Link to={`/post/${p.id}`} className="block text-orange-700 hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </main>
  );
}

/**
 * 關於我頁面元件
 */
function AboutPage() {
  return (
    <main className="min-h-screen bg-orange-50 text-brown-900 p-6">
      <Navbar />
      <section className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-3xl font-bold mb-4">關於我</h2>
        <p className="mb-4">
          這是我的個人部落格，紀錄學習與生活。
        </p>
      </section>
    </main>
  );
}

/**
 * 404 找不到頁面元件
 */
function NotFoundPage() {
  return (
    <main className="min-h-screen bg-orange-50 text-brown-900 p-6 text-center">
      <Navbar />
      <h2 className="text-3xl font-bold mb-2">404 - 找不到頁面</h2>
      <p className="mb-4">您造訪的頁面不存在，請檢查網址或返回首頁。</p>
      <Link to="/">
        <Button className="rounded-xl">回首頁</Button>
      </Link>
    </main>
  );
}

/**
 * 主應用程式元件
 * 使用 react-router-dom 管理頁面路由
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
