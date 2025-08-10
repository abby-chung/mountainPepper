import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 模擬文章資料
const posts = [
  {
    id: 1,
    title: "部落格文章一",
    date: "2025-08-07",
    tags: ["生活", "風格"],
    excerpt: "這是一篇關於生活風格的文章摘要...",
    content: "這是一篇完整的生活風格文章內容，詳細介紹了各種生活方式與風格搭配技巧..."
  },
  {
    id: 2,
    title: "部落格文章二",
    date: "2025-08-05",
    tags: ["咖啡", "手沖"],
    excerpt: "這篇文章介紹了咖啡文化與手沖技巧...",
    content: "這是一篇完整的咖啡文化與手沖技巧文章內容，分享了咖啡豆挑選與沖煮方法..."
  }
];

function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("全部");
  const filters = ["全部", "生活", "風格", "咖啡", "手沖"];

  const filteredPosts = posts.filter(post => {
    const matchSearch =
      post.title.includes(search) || post.excerpt.includes(search) || post.content.includes(search);
    const matchFilter = filter === "全部" || post.tags.includes(filter);
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <header className="flex justify-between items-center bg-white shadow-md rounded-xl p-4 mb-8">
        <h1 className="text-orange-700 font-bold text-xl">我的部落格</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-orange-600 hover:underline">首頁</Link>
          <Link to="/about" className="text-orange-600 hover:underline">關於我</Link>
        </nav>
      </header>

      <main className="text-center">
        <h2 className="text-3xl font-bold mb-2">我的部落格</h2>
        <p className="mb-6">分享生活、創意與靈感</p>

        {/* 篩選按鈕 */}
        <div className="flex justify-center space-x-2 mb-4">
          {filters.map(f => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className={filter === f ? "bg-orange-500 text-white" : "border-orange-500 text-orange-500"}
            >
              {f}
            </Button>
          ))}
        </div>

        {/* 搜尋框 */}
        <div className="mb-6 max-w-md mx-auto">
          <Input
            placeholder="搜尋文章標題或內容..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl h-12"
          />
        </div>

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <Card key={post.id} className="rounded-2xl shadow hover:shadow-lg transition">
              <CardContent className="p-6 text-left">
                <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <div className="flex space-x-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-sm bg-orange-100 text-orange-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mb-4">{post.excerpt}</p>
                <Link to={`/post/${post.id}`}>
                  <Button className="bg-orange-500 hover:bg-orange-600">閱讀更多</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

function Post() {
  const { id } = useParams();
  const post = posts.find(p => p.id === Number(id));

  if (!post) return <div className="p-6">找不到文章</div>;

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <Link to="/" className="text-orange-600 hover:underline">← 返回首頁</Link>
      <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{post.date}</p>
      <div className="flex space-x-2 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 text-sm bg-orange-100 text-orange-600 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <p>{post.content}</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}
