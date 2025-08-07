import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

const posts = [
  {
    id: "1",
    title: "部落格文章一",
    date: "2025-08-06",
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

const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#fdf6ee] text-[#4b3f35] font-sans">
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-xl font-bold text-[#c25e00]">我的部落格</h1>
      <nav className="space-x-4 text-sm">
        <Link to="/" className="hover:underline">首頁</Link>
        <Link to="/about" className="hover:underline">關於我</Link>
      </nav>
    </header>
    <main className="px-4 py-8 max-w-5xl mx-auto">{children}</main>
  </div>
);

const Tag = ({ label }) => (
  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full mr-2 mb-1 inline-block">{label}</span>
);

const HomePage = () => {
  const [filter, setFilter] = useState("全部");
  const [searchTerm, setSearchTerm] = useState("");

  const uniqueTags = ["全部", ...Array.from(new Set(posts.flatMap(p => p.tags)))];

  const filteredPosts = posts.filter(post => {
    const matchesTag = filter === "全部" || post.tags.includes(filter);
    const matchesSearch = post.title.includes(searchTerm) || post.content.includes(searchTerm);
    return matchesTag && matchesSearch;
  });

  return (
    <Layout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">我的部落格</h2>
        <p className="text-sm text-gray-600">分享生活、創意與靈感</p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-6">
        {uniqueTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-1 text-sm rounded-full border transition ${
              filter === tag ? "bg-[#ff7028] text-white" : "border-orange-400 text-orange-600"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-8 px-2 w-full">
        <input
          type="text"
          placeholder="搜尋文章標題或內容..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-orange-200 rounded-2xl shadow-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-transform hover:scale-[1.02] duration-300">
            <h3 className="text-xl font-bold mb-1">{post.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <div className="mb-2">
              {post.tags.map(tag => <Tag key={tag} label={tag} />)}
            </div>
            <p className="text-sm text-gray-700 mb-4">{post.summary}</p>
            <Link to={`/post/${post.id}`} className="bg-[#ff7028] text-white px-4 py-2 rounded-full text-sm inline-block">閱讀更多</Link>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">找不到符合條件的文章。</p>
      )}
    </Layout>
  );
};

const PostPage = () => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  const otherPosts = posts.filter(p => p.id !== id);
  const latestPosts = [...posts]
    .filter(p => p.id !== id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (!post) return <Layout><p>找不到文章</p></Layout>;

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-4">{post.date}</p>
          <div className="mb-4">
            {post.tags.map(tag => <Tag key={tag} label={tag} />)}
          </div>
          <p className="leading-relaxed bg-white p-6 rounded-2xl shadow text-gray-800 whitespace-pre-wrap">{post.content}</p>
        </div>

        <aside className="lg:w-1/3 space-y-8">
          <div className="bg-white rounded-2xl shadow p-4 h-fit">
            <h3 className="text-lg font-bold mb-4">最新文章</h3>
            <ul className="space-y-2">
              {latestPosts.map(p => (
                <li key={p.id}>
                  <Link to={`/post/${p.id}`} className="text-sm text-[#c25e00] hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 h-fit">
            <h3 className="text-lg font-bold mb-4">其他文章</h3>
            <ul className="space-y-2">
              {otherPosts.map(p => (
                <li key={p.id}>
                  <Link to={`/post/${p.id}`} className="text-sm text-[#c25e00] hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

const AboutPage = () => (
  <Layout>
    <h1 className="text-2xl font-bold mb-4">關於我</h1>
    <p className="leading-relaxed bg-white p-6 rounded-2xl shadow text-gray-800">這是我的個人部落格，紀錄學習與生活。</p>
  </Layout>
);

const NotFoundPage = () => (
  <Layout>
    <h1 className="text-2xl font-bold mb-4">404 - 找不到頁面</h1>
    <p className="leading-relaxed">請確認網址是否正確。</p>
  </Layout>
);

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
