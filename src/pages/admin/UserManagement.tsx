import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pencil, Trash2, X } from "lucide-react";
import { getAdminUsers, patchAdminUser, deleteAdminUser, patchAdminUserAction } from "@/api/admin";

type UserType = {
  user_id: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  phone?: string | null;
  active_role?: string | null;
  is_active: boolean;
  is_provider: boolean;
  is_customer: boolean;
  referral_count: number | string;
  avatar?: string;
  login_provider?: string;
  is_verified?: boolean;
  created_at?: string;
};

export default function UserManagement() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Search & Filter State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const itemsPerPage = 50; // DRF backend returns 50 users per page
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        search: searchQuery.trim() || undefined,
      };
      if (roleFilter === "PROVIDER") {
        params.is_provider = true;
      } else if (roleFilter === "CUSTOMER") {
        params.is_customer = true;
      } else if (roleFilter === "ACTIVE") {
        params.is_active = true;
      }

      const data = await getAdminUsers(params);
      if (data) {
        const payload = data.data || data;
        const list = Array.isArray(payload.results)
          ? payload.results
          : Array.isArray(payload)
          ? payload
          : [];
        setUsers(list);
        setTotalCount(payload.count ?? list.length ?? 0);
      }
    } catch (error) {
      console.error("UserManagement fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, roleFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "…", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "…", currentPage - 1, currentPage, currentPage + 1, "…", totalPages);
      }
    }
    return pages;
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const openEditModal = (user: UserType) => {
    setEditingUser(user);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Edit existing user
        await patchAdminUser(editingUser.user_id, formData);
      } else {
        // Add new user is not directly supported via a simple post in this admin resource in the schema,
        // but we can update if needed, or fallback. Since registering an admin/user is done via registration:
        alert("Please register users via the Signup/Onboarding endpoints.");
      }
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteAdminUser(id);
        fetchUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleToggleActive = async (user: UserType) => {
    const action = user.is_active ? "deactivate" : "activate";
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        await patchAdminUserAction(user.user_id, action, {});
        fetchUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full mt-2 relative">
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">User Management</h1>

      <div className="bg-[#EAEBEA]/50 rounded-2xl p-6 sm:p-8 flex-1 box-border">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {totalCount.toLocaleString()} Total Users
          </h2>
          
          <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">All Users</option>
              <option value="PROVIDER">Service Providers</option>
              <option value="CUSTOMER">Customers</option>
              <option value="ACTIVE">Active Users</option>
            </select>
            <button
              type="submit"
              className="bg-[#243cd6] hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg text-sm transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <span className="text-gray-500 font-medium">Loading users...</span>
            </div>
          ) : (
            <table className="w-full text-left whitespace-nowrap min-w-[800px]">
              <thead>
                <tr className="text-gray-800 font-semibold border-b border-transparent">
                  <th className="pb-4 font-semibold text-[15px]">Name</th>
                  <th className="pb-4 font-semibold text-[15px]">Email</th>
                  <th className="pb-4 font-semibold text-[15px]">Phone</th>
                  <th className="pb-4 font-semibold text-[15px]">Role</th>
                  <th className="pb-4 font-semibold text-[15px]">Status</th>
                  <th className="pb-4 font-semibold text-[15px] text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {users.map((user) => {
                  const initial1 = user.first_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U";
                  const initial2 = user.last_name?.[0]?.toUpperCase() || "";
                  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email || "User";
                  const roleLabel = user.active_role || (user.is_provider ? "PROVIDER" : user.is_customer ? "CUSTOMER" : "USER");

                  return (
                    <tr 
                      key={user.user_id} 
                      className="group text-[15px] font-medium text-gray-700 hover:bg-white/40 rounded-lg transition-colors"
                    >
                      <td className="py-3 pl-2 rounded-l-lg truncate max-w-[200px]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0 flex items-center justify-center font-bold text-blue-600 text-sm">
                            {initial1}{initial2}
                          </div>
                          <span className="truncate" title={fullName}>{fullName}</span>
                        </div>
                      </td>
                      <td className="py-3 truncate max-w-[200px]" title={user.email || "N/A"}>{user.email || "N/A"}</td>
                      <td className="py-3">{user.phone || "N/A"}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-800">
                          {roleLabel}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => handleToggleActive(user)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                            user.is_active 
                              ? "bg-green-100 text-green-700 hover:bg-green-200" 
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {user.is_active ? "Active" : "Deactivated"}
                        </button>
                      </td>
                      <td className="py-3 pr-2 rounded-r-lg">
                        <div className="flex items-center justify-end gap-3 pr-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(user);
                            }}
                            className="text-gray-600 hover:text-blue-600 transition-colors p-1 bg-transparent hover:bg-white rounded-md shadow-sm"
                            title="Edit"
                          >
                            <Pencil className="w-[18px] h-[18px]" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(user.user_id);
                            }}
                            className="text-gray-600 hover:text-red-500 transition-colors p-1 bg-transparent hover:bg-white rounded-md shadow-sm"
                            title="Delete"
                          >
                            <Trash2 className="w-[18px] h-[18px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 mb-4 gap-4 text-sm font-medium">
            <span className="text-gray-500">
              Page {currentPage} of {totalPages} ({totalCount.toLocaleString()} total users)
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5"/>
              </button>
              
              {getPageNumbers().map((p, idx) => {
                if (p === "…") {
                  return (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">
                      …
                    </span>
                  );
                }
                const pageNumber = p as number;
                const isActive = pageNumber === currentPage;
                return (
                  <button 
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`min-w-[36px] h-9 px-2 rounded-lg flex justify-center items-center text-sm font-medium transition-colors ${
                      isActive ? "bg-[#243cd6] text-white" : "hover:bg-gray-200 text-gray-700 bg-white/70"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5"/>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit User
              </h3>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.first_name}
                  onChange={e => setFormData({...formData, first_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.last_name}
                  onChange={e => setFormData({...formData, last_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-[#243cd6] text-white font-medium hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
