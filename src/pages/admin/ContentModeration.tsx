import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, TrendingUp, Calendar, Eye, MessageSquare, Rocket, Trash2, ShieldAlert, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { api } from "@/utils/axiosConfig";

type Post = {
  id: string;
  post_id?: string;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  body: string;
  status: "Active" | "Flagged";
  date: string;
  views: number;
  inquiries: number;
  images?: string[];
};

// type EngagementStats = {
//   totalUsers: number;
//   totalPosts: number;
//   totalInteractions: number;
// };

// Map raw API post to our internal Post type
const mapApiPost = (raw: any): Post => {
  const profile = raw.author?.profile || raw.user?.profile || {};
  const displayName =
    profile.display_name ||
    [raw.author?.first_name || raw.user?.first_name, raw.author?.last_name || raw.user?.last_name]
      .filter(Boolean)
      .join(" ") ||
    "Anonymous";

  return {
    id: raw.post_id || raw.id || String(Math.random()),
    post_id: raw.post_id || raw.id,
    author: {
      name: displayName,
      avatar:
        profile.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=243cd6&color=fff&size=80`,
    },
    title: raw.title || raw.content?.substring(0, 80) || "Untitled Post",
    body: raw.content || raw.body || raw.description || "",
    status: raw.is_flagged ? "Flagged" : "Active",
    date: raw.created_at
      ? new Date(raw.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "—",
    views: raw.views_count || raw.views || 0,
    inquiries: raw.comments_count || raw.inquiries || 0,
    images: raw.images?.map((img: any) => (typeof img === "string" ? img : img?.url || img?.image)) || [],
  };
};

export default function ContentModeration() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  // const [stats, setStats] = useState<EngagementStats>({ totalUsers: 0, totalPosts: 0, totalInteractions: 0 });

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/v1/posts/`, { params: { page } });
      const data = response.data;

      // API may return: { count, results: [] } | [] | single object
      let rawList: any[];
      if (Array.isArray(data)) {
        rawList = data;
      } else if (data && Array.isArray(data.results)) {
        rawList = data.results;
      } else if (data && typeof data === "object") {
        // Single object or unknown shape — wrap in array if it looks like a post
        rawList = data.id || data.post_id ? [data] : [];
      } else {
        rawList = [];
      }

      const results: Post[] = rawList.map(mapApiPost);
      setPosts(results);
      const count = data?.count ?? results.length;
      setTotalCount(count);
      // setStats(prev => ({ ...prev, totalPosts: count }));
    } catch (err) {
      console.error("ContentModeration: failed to fetch posts", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleDeleteClick = (id: string) => setDeleteConfirmationId(id);

  const handleConfirmDelete = async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    setActionLoading(id);
    try {
      await api.delete(`/api/v1/posts/${post.post_id || id}/`);
      setPosts(posts.filter(p => p.id !== id));
      setTotalCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Delete post failed", err);
    } finally {
      setActionLoading(null);
      setDeleteConfirmationId(null);
    }
  };

  const handleSuspendUser = (id: string) => {
    // Optimistic: remove from list — real user suspension goes through user management
    setPosts(posts.filter(p => p.id !== id));
    setDeleteConfirmationId(null);
    alert("User flagged for suspension. Please use User Management to suspend.");
  };

  const totalPages = Math.ceil(totalCount / 10) || 1;

  return (
    <div className="flex flex-col w-full h-full mt-2 relative pb-10">
      <h1 className="text-[28px] lg:text-3xl font-semibold text-gray-900 tracking-tight mb-8">
        Content &amp; Social Feed Moderation
      </h1>

      <div className="flex flex-col xl:flex-row gap-8 items-start">

        {/* Left Column - Posts */}
        <div className="flex-1 w-full max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
              Posts {totalCount > 0 && <span className="text-gray-400 font-normal text-base">({totalCount})</span>}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="bg-[#243cd6] disabled:bg-gray-300 text-white flex items-center justify-center rounded-full w-8 h-8 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-gray-600">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="bg-[#243cd6] disabled:bg-gray-300 text-white flex items-center justify-center rounded-full w-8 h-8 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 gap-2 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="font-medium">Loading posts...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative">

                  {/* Author Info & Status */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img src={post.author.avatar} alt="Author" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                      <span className="font-semibold text-gray-800 text-[15px]">{post.author.name}</span>
                    </div>
                    <span className={cn(
                      "text-[13px] font-semibold",
                      post.status === "Active" ? "text-emerald-500" : "text-red-500"
                    )}>
                      {post.status}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    {post.title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>}
                    <p className="text-[15px] text-gray-500 leading-relaxed">{post.body}</p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-[13px] text-gray-400 font-medium mb-5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Posted: {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      {post.views} Views
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" />
                      {post.inquiries} Comments
                    </div>
                  </div>

                  {/* Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {post.images.filter(Boolean).map((img, idx) => (
                        <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                          <img src={img} alt="Post attachment" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-center gap-4 relative">
                    <button className="flex items-center justify-center gap-2 bg-[#fbbd23] hover:bg-[#f5aa0f] text-white font-semibold py-2.5 px-8 rounded-lg transition-colors w-40 text-[15px] shadow-sm">
                      <Rocket className="w-4 h-4" /> Boost
                    </button>
                    <button
                      onClick={() => handleDeleteClick(post.id)}
                      disabled={actionLoading === post.id}
                      className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-8 rounded-lg transition-colors w-40 text-[15px] shadow-sm disabled:opacity-50"
                    >
                      {actionLoading === post.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Trash2 className="w-4 h-4" />}
                      Delete
                    </button>

                    {/* Delete Confirmation Popup */}
                    {deleteConfirmationId === post.id && (
                      <div className="absolute top-12 left-1/2 rounded-2xl bg-[#aaaaaa] shadow-xl p-5 z-10 w-64 border border-gray-300">
                        <p className="text-gray-800 font-medium text-sm mb-4 leading-relaxed">
                          Are you sure you want to delete this post?
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleConfirmDelete(post.id)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-full text-xs font-semibold transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleSuspendUser(post.id)}
                            className="flex-1 bg-[#fbbd23] hover:bg-[#f5aa0f] text-white py-2 rounded-full text-xs font-semibold transition-colors"
                          >
                            Suspend user
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {posts.length === 0 && !loading && (
                <div className="text-center py-12 bg-white border border-gray-200 rounded-2xl">
                  <ShieldAlert className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No posts require moderation at this time.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Engagement Insight */}
        <div className="w-full xl:w-[350px] shrink-0 bg-[#EFEFEF] rounded-[24px] p-6 shadow-sm border border-gray-100 mt-14 xl:mt-0 xl:sticky xl:top-6">
          <h2 className="text-[20px] font-semibold text-gray-800 tracking-tight text-center mb-6">
            Engagement Insight
          </h2>

          <div className="space-y-4 mb-6">
            {/* Posts Card */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-[13px] text-gray-500 font-semibold mb-1">Total Posts</span>
                  <span className="text-[26px] font-bold text-gray-900 leading-none">
                    {loading ? "—" : totalCount.toLocaleString()}
                  </span>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-medium text-gray-600">
                  <span className="text-emerald-500">Live</span> from API
                </span>
              </div>
            </div>

            {/* Interactions Card */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-500 font-semibold mb-1">Posts This Page</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[26px] font-bold text-gray-900 leading-none">{posts.length}</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-[5px] border-blue-600 border-r-gray-200" />
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="space-y-4 px-2">
            <div className="flex justify-between items-center text-[13px] font-semibold text-gray-600">
              <span>Active Posts</span>
              <span className="text-gray-900">{posts.filter(p => p.status === "Active").length}</span>
            </div>
            <div className="flex justify-between items-center text-[13px] font-semibold text-gray-600">
              <span>Flagged Posts</span>
              <span className="text-red-600">{posts.filter(p => p.status === "Flagged").length}</span>
            </div>
            <div className="flex justify-between items-center text-[13px] font-semibold text-gray-600">
              <span>Total Views (this page)</span>
              <span className="text-gray-900">{posts.reduce((a, p) => a + p.views, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-[13px] font-semibold text-gray-600">
              <span>Total Comments (this page)</span>
              <span className="text-gray-900">{posts.reduce((a, p) => a + p.inquiries, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-[13px] font-semibold text-gray-600">
              <span>Page</span>
              <span className="text-gray-900">{currentPage} / {totalPages}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
