import { useEffect, useState, useMemo } from "react";
import { Users, UserPlus, TrendingUp, ChevronDown } from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { getAdminBookings, getAdminUsers } from "@/api/admin";
import { api } from "@/utils/axiosConfig";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const STATUS_COLORS: Record<string, string> = {
  Completed:   "#10b981",
  Pending:     "#facc15",
  Cancelled:   "#ef4444",
  Funded:      "#3b82f6",
  Refunded:    "#9ca3af",
  In_progress: "#f97316",
};

const SUPPORT_DATA = [
  { name: "Yet to start", value: 15, color: "#9ca3af" },
  { name: "On hold",      value: 25, color: "#facc15" },
  { name: "Escalate",     value: 10, color: "#ef4444" },
  { name: "Completed",    value: 40, color: "#10b981" },
];

export default function Overview() {
  const [usersCount, setUsersCount] = useState(0);
  const [bookings, setBookings] = useState<any[]>([]);
  const [serviceCategories, setServiceCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsData, usersData, categoriesData] = await Promise.all([
          getAdminBookings({ page_size: 200 }),
          getAdminUsers(),
          api.get("/api/v1/services-categories/").catch(() => ({ data: { results: [] } })),
        ]);
        if (bookingsData) {
          const bResults = bookingsData.results ?? bookingsData.data?.results ?? (Array.isArray(bookingsData) ? bookingsData : []);
          setBookings(bResults);
        }
        if (usersData) {
          setUsersCount(usersData.count ?? usersData.data?.count ?? usersData.results?.length ?? 0);
        }
        if (categoriesData?.data) {
          const raw = categoriesData.data;
          // Safely extract array — API may return {count, results:[]} or just []
          const cats = Array.isArray(raw)
            ? raw
            : Array.isArray(raw?.results)
              ? raw.results
              : [];
          setServiceCategories(cats);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Booking status breakdown for PieChart — derived from real API data
  const BOOKINGS_DATA = useMemo(() => {
    const counts: Record<string, number> = {};
    bookings.forEach(b => {
      const s = b.booking_status || "Pending";
      counts[s] = (counts[s] || 0) + 1;
    });
    const result = Object.entries(counts).map(([name, value]) => ({
      name, value, color: STATUS_COLORS[name] || "#9ca3af",
    }));
    // Fallback if no data yet
    return result.length > 0 ? result : [
      { name: "Completed", value: 60, color: "#10b981" },
      { name: "Pending",   value: 30, color: "#facc15" },
      { name: "Cancelled", value: 10, color: "#ef4444" },
    ];
  }, [bookings]);

  // Monthly trend — real booking counts per month
  const LINE_CHART_DATA = useMemo(() => {
    const monthly: Record<number, number> = {};
    bookings.forEach(b => {
      if (b.created_at) {
        const month = new Date(b.created_at).getMonth();
        monthly[month] = (monthly[month] || 0) + 1;
      }
    });
    return MONTH_NAMES.map((name, i) => ({ name, value: monthly[i] || 0 }));
  }, [bookings]);

  // Top services from real categories
  const TOP_SERVICES = useMemo(() => {
    // Guard: ensure it's always an array before calling slice
    const cats = Array.isArray(serviceCategories) ? serviceCategories : [];
    if (cats.length === 0) return [
      { id: 1, name: "Loading...", bookings: 0, percentage: 0 },
    ];
    return cats.slice(0, 5).map((cat: any, i: number) => ({
      id: cat.id || i,
      name: cat.name,
      bookings: "—",
      percentage: Math.max(15, 100 - i * 18),
    }));
  }, [serviceCategories]);

  const bookingsCount = bookings.length;

  return (
    <div className="flex flex-col w-full h-full mt-2 relative pb-10">
      <h1 className="text-[28px] lg:text-3xl font-semibold text-gray-900 tracking-tight mb-8">
        Dashboard
      </h1>

      <div className="flex flex-col gap-6">
        
        {/* Top Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          
          {/* Main Bookings Card (Col Span 4) */}
          <div className="lg:col-span-4 bg-[#C2C1BD]/60 rounded-2xl p-6 relative flex flex-col justify-between shadow-sm min-h-[220px]">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800 tracking-tight">Bookings</h2>
              <button className="flex items-center gap-1.5 bg-transparent border border-gray-400 text-gray-700 rounded-md px-2 py-1 text-[13px] font-medium hover:bg-black/5 transition-colors">
                Today <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex-1 flex gap-8 items-center mt-2">
              <div style={{ position: 'relative', width: 130, height: 130, flexShrink: 0 }}>
                <ResponsiveContainer width={130} height={130}>
                  <PieChart>
                    <Pie
                      data={BOOKINGS_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                    >
                      {BOOKINGS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text inside Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                  <span className="text-[11px] font-semibold text-gray-700 leading-none">Bookings</span>
                  <span className="text-[13px] font-bold text-gray-900 leading-none mt-1">{bookingsCount}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {BOOKINGS_DATA.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[14px] font-medium text-gray-800">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Grid (Col Span 6) - 2x2 grid */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Active Users */}
            <div className="bg-[#C2C1BD]/60 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] text-gray-800 font-semibold">Active Users</span>
                  <span className="text-[26px] font-bold text-gray-900 leading-none">{usersCount.toLocaleString()}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-400/30 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-auto">
                <TrendingUp className="w-4 h-4 text-emerald-600 stroke-[2.5px]" />
                <span className="text-[13px] font-semibold text-gray-700">
                  <span className="text-emerald-600">Live</span> from API
                </span>
              </div>
            </div>

            {/* Total Bookings */}
            <div className="bg-[#C2C1BD]/60 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] text-gray-800 font-semibold">Total Bookings</span>
                  <span className="text-[26px] font-bold text-gray-900 leading-none">{bookingsCount.toLocaleString()}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-400/30 flex items-center justify-center shrink-0">
                  <UserPlus className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-auto">
                <TrendingUp className="w-4 h-4 text-emerald-600 stroke-[2.5px]" />
                <span className="text-[13px] font-semibold text-gray-700">
                  <span className="text-emerald-600">Live</span> from API
                </span>
              </div>
            </div>

            {/* Support Chart */}
            <div className="bg-[#C2C1BD]/60 rounded-2xl p-5 shadow-sm flex flex-col relative h-[180px]">
              <h3 className="text-[15px] font-semibold text-gray-800 absolute top-4 left-5 z-10">Support</h3>
              <div className="w-full h-full min-w-0 min-h-0 flex items-center justify-center mt-3 pt-6 relative">
                 <ResponsiveContainer width="100%" height={120} minWidth={0} minHeight={120}>
                    <PieChart>
                       <Pie
                         data={SUPPORT_DATA}
                         cx="50%"
                         cy="50%"
                         innerRadius={0}
                         outerRadius={50}
                         paddingAngle={0}
                         dataKey="value"
                         stroke="#C2C1BD"
                         strokeWidth={2}
                       >
                         {SUPPORT_DATA.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                       <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              
              <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 mt-auto pb-1 text-[9px] font-semibold text-gray-700 w-full relative z-10">
                {SUPPORT_DATA.map(item => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="w-1.5 h-3 rounded-[1px]" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Gauge */}
            <div className="bg-[#C2C1BD]/60 rounded-2xl p-5 shadow-sm flex flex-col relative h-[180px] overflow-hidden">
               <div className="flex justify-between items-start z-10 relative">
                 <h3 className="text-[15px] font-semibold text-gray-800">Revenue</h3>
                 <button className="flex items-center gap-1 text-gray-600 text-[11px] font-semibold hover:text-gray-900 transition-colors">
                   Aug 2024 <ChevronDown className="w-3 h-3" />
                 </button>
               </div>
               
               <div className="flex-1 flex items-center justify-center mt-8 relative w-full px-2">
                 <svg viewBox="0 0 200 100" className="w-full h-full max-h-[80px] overflow-visible">
                    <path d="M 10 90 A 80 80 0 0 1 190 90" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="10" cy="90" r="4" fill="#243cd6" />
                    <circle cx="50" cy="40" r="4" fill="#243cd6" />
                    <circle cx="100" cy="10" r="4" fill="#888888" />
                    <circle cx="150" cy="40" r="4" fill="#888888" />
                    <circle cx="190" cy="90" r="4" fill="#888888" />
                    <path d="M 50 90 A 30 30 0 0 1 100 30" fill="none" stroke="#10b981" strokeWidth="2" />
                    <path d="M 100 30 A 30 30 0 0 1 150 90" fill="none" stroke="#10b981" strokeWidth="2" />
                 </svg>
                 
                 <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 gap-1">
                   <span className="text-[13px] font-bold text-[#10b981] leading-none">Live</span>
                   <span className="text-[13px] font-bold text-[#243cd6] leading-none">Revenue</span>
                 </div>
               </div>
            </div>

          </div>
        </div>

        {/* Bottom Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-2">
          
          {/* Line Chart Area (Col Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 flex flex-col relative w-full min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-gray-900">Monthly Bookings Trend</h3>
               <span className="text-[12px] text-gray-400 font-medium">Jan–Dec {new Date().getFullYear()}</span>
            </div>
            
            <div style={{ width: '100%', height: 300, minHeight: 300 }}>
              <ResponsiveContainer width="100%" height={300} minHeight={300}>
                <LineChart data={LINE_CHART_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#6B7280", fontSize: 13, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 13, fontWeight: 500 }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="natural" 
                    dataKey="value" 
                    stroke="#243cd6" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6, fill: "#243cd6", stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Service Component (Col Span 3) */}
          <div className="lg:col-span-3 bg-[#C2C1BD]/80 rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 className="text-[20px] font-semibold text-gray-900 mb-6">Top Service Categories</h3>
            
            <div className="space-y-5 flex-1 overflow-y-auto pr-2">
              {TOP_SERVICES.map((service, index) => (
                <div key={service.id} className="flex flex-col gap-2 relative">
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="font-semibold text-gray-900">{service.name}</span>
                    <span className="font-bold text-gray-900">{service.bookings}</span>
                  </div>
                  <div className="w-full h-[6px] bg-[#EAEBEA] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${service.percentage}%`,
                        backgroundColor: index === 0 ? '#243cd6' : index === 1 ? '#10b981' : index === 2 ? '#facc15' : '#9ca3af'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-8 text-center text-[13px] font-semibold text-gray-800 hover:text-blue-700 transition-colors bg-white/50 py-2.5 rounded-lg w-full">
              View All Services
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
