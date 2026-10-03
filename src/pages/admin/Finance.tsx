import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, TrendingUp, Download, ArrowUpCircle, ArrowDownCircle, Check, X, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  getAdminBookings,
  getAdminReferralWithdrawals,
  approveAdminReferralWithdrawal,
  rejectAdminReferralWithdrawal,
} from "@/api/admin";

type BookingStatusType = "Pending" | "Funded" | "In_progress" | "Completed" | "Cancelled" | "Refunded";
type WithdrawalStatus = "PENDING" | "APPROVED" | "REJECTED";

type BookingRow = {
  booking_id: string;
  booking_status: BookingStatusType;
  customer?: any;
  provider?: any;
  currency?: string;
  price: string;
  platform_fee?: string;
  created_at: string;
};

type WithdrawalRow = {
  request_id: string;
  amount: string;
  status: WithdrawalStatus;
  reference_key?: string;
  eligible_referrals?: string | number;
  rejection_reason?: string;
  requested_at: string;
  client?: string;
};

const formatCurrency = (value: number | string, currency = "NGN") => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "—";
  const sym = currency === "USD" ? "$" : currency === "GBP" ? "£" : "₦";
  return sym + " " + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
};

const getCustomerName = (b: BookingRow) => {
  if (!b.customer) return "Customer";
  if (typeof b.customer === "string") return b.customer;
  return (
    b.customer?.profile?.display_name ||
    [b.customer?.first_name, b.customer?.last_name].filter(Boolean).join(" ") ||
    b.customer?.email ||
    "Customer"
  );
};

const getProviderName = (b: BookingRow) => {
  if (!b.provider) return "—";
  if (typeof b.provider === "string") return b.provider;
  return (
    b.provider?.profile?.display_name ||
    [b.provider?.first_name, b.provider?.last_name].filter(Boolean).join(" ") ||
    b.provider?.email ||
    "—"
  );
};

type BookingStatusUI = "Completed" | "Pending" | "Overdue" | "Failed";

const bookingStatusToUI = (s: BookingStatusType): BookingStatusUI => {
  if (s === "Completed") return "Completed";
  if (s === "Cancelled" || s === "Refunded") return "Failed";
  if (s === "Funded" || s === "In_progress") return "Pending";
  return "Pending";
};

const StatusPill = ({ status }: { status: BookingStatusUI | WithdrawalStatus }) => {
  const norm = status?.toUpperCase();
  return (
    <span
      className={cn(
        "px-3 py-1.5 rounded-full text-[12px] font-semibold text-center inline-block min-w-[90px] bg-opacity-90 shadow-sm",
        (norm === "COMPLETED" || norm === "APPROVED") && "bg-[#d1fae5] text-[#10b981]",
        norm === "PENDING" && "bg-[#fef3c7] text-[#f59e0b]",
        norm === "OVERDUE" && "bg-[#ffe4e6] text-[#f43f5e]",
        (norm === "FAILED" || norm === "REJECTED") && "bg-gray-200 text-gray-700"
      )}
    >
      {status}
    </span>
  );
};

export default function Finance() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRow[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingWithdrawals, setLoadingWithdrawals] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch bookings
  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const data = await getAdminBookings();
      if (data) {
        const list = data.results ?? data.data?.results ?? (Array.isArray(data) ? data : []);
        setBookings(list);
      }
    } catch (err) {
      console.error("Finance: Failed to fetch bookings", err);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Fetch referral withdrawals
  const fetchWithdrawals = async () => {
    setLoadingWithdrawals(true);
    try {
      const data = await getAdminReferralWithdrawals();
      if (data) {
        const list = data.results ?? data.data?.results ?? (Array.isArray(data) ? data : []);
        setWithdrawals(list);
      }
    } catch (err) {
      console.error("Finance: Failed to fetch withdrawals", err);
    } finally {
      setLoadingWithdrawals(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchWithdrawals();
  }, []);

  const handleApproveWithdrawal = async (id: string) => {
    setActionLoading(id + "-approve");
    try {
      await approveAdminReferralWithdrawal(id);
      setWithdrawals(prev =>
        prev.map(w => w.request_id === id ? { ...w, status: "APPROVED" } : w)
      );
    } catch (err) {
      console.error("Approve withdrawal failed", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectWithdrawal = async (id: string) => {
    setActionLoading(id + "-reject");
    try {
      await rejectAdminReferralWithdrawal(id);
      setWithdrawals(prev =>
        prev.map(w => w.request_id === id ? { ...w, status: "REJECTED" } : w)
      );
    } catch (err) {
      console.error("Reject withdrawal failed", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleExport = (type: string) => {
    alert(`Triggered export to CSV for ${type}.`);
  };

  // Summary metrics from real data
  const totalBookingRevenue = useMemo(() =>
    bookings.reduce((acc, b) => acc + (parseFloat(b.price) || 0), 0),
    [bookings]
  );
  const completedBookings = useMemo(() =>
    bookings.filter(b => b.booking_status === "Completed").length,
    [bookings]
  );
  const pendingWithdrawals = useMemo(() =>
    withdrawals.filter(w => w.status === "PENDING").reduce((acc, w) => acc + (parseFloat(w.amount) || 0), 0),
    [withdrawals]
  );
  const approvedWithdrawals = useMemo(() =>
    withdrawals.filter(w => w.status === "APPROVED").reduce((acc, w) => acc + (parseFloat(w.amount) || 0), 0),
    [withdrawals]
  );

  return (
    <div className="flex flex-col w-full h-full mt-2 relative pb-10">
      <h1 className="text-[28px] lg:text-3xl font-semibold text-gray-900 tracking-tight mb-8">Finance</h1>

      <div className="flex flex-col gap-10">

        {/* Summary Cards */}
        <section>
          <h2 className="text-[20px] lg:text-[22px] font-semibold text-gray-800 tracking-tight mb-5">Overall Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-[#BDBCA9] hover:bg-[#b0afa0] rounded-2xl p-6 transition-colors shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] text-gray-700 font-medium">Total Booking Revenue</span>
                  <span className="text-[26px] font-bold text-gray-900 tracking-tight">
                    {loadingBookings ? "—" : formatCurrency(totalBookingRevenue)}
                  </span>
                </div>
                <button className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center shrink-0 hover:bg-black/20 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-gray-800" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <TrendingUp className="w-4 h-4 text-[#10b981] stroke-[2.5px]" />
                <span className="text-sm font-semibold text-[#10b981]">{completedBookings} completed</span>
              </div>
            </div>

            <div className="bg-[#BDBCA9] hover:bg-[#b0afa0] rounded-2xl p-6 transition-colors shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] text-gray-700 font-medium">Total Bookings</span>
                  <span className="text-[26px] font-bold text-gray-900 tracking-tight">
                    {loadingBookings ? "—" : bookings.length.toLocaleString()}
                  </span>
                </div>
                <button className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center shrink-0 hover:bg-black/20 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-gray-800" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <TrendingUp className="w-4 h-4 text-[#10b981] stroke-[2.5px]" />
                <span className="text-sm font-semibold text-[#10b981]">Live from API</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-colors shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] text-gray-500 font-medium">Pending Withdrawals</span>
                  <span className="text-[26px] font-bold text-gray-900 tracking-tight">
                    {loadingWithdrawals ? "—" : formatCurrency(pendingWithdrawals)}
                  </span>
                </div>
                <button className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                  <ArrowDownCircle className="w-5 h-5 text-yellow-600" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-sm font-semibold text-gray-500">Awaiting approval</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-colors shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] text-gray-500 font-medium">Approved Payouts</span>
                  <span className="text-[26px] font-bold text-gray-900 tracking-tight">
                    {loadingWithdrawals ? "—" : formatCurrency(approvedWithdrawals)}
                  </span>
                </div>
                <button className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <ArrowUpCircle className="w-5 h-5 text-red-600" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-sm font-semibold text-gray-500">Outbound Capital</span>
              </div>
            </div>

          </div>
        </section>

        {/* Bookings Ledger */}
        <section className="bg-white rounded-3xl p-6 lg:p-8 flex flex-col shadow-sm border border-gray-200">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-[20px] lg:text-[22px] font-semibold text-gray-800 tracking-tight mb-1">Booking Transactions</h2>
              <p className="text-sm text-gray-500">Live booking records from the platform.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-[#243cd6] hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-full transition-colors shadow-sm flex items-center gap-1 text-[13px]">
                <ChevronLeft className="w-4 h-4" />
                This Month
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleExport("booking records")}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm text-gray-600 border border-gray-200"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-auto min-h-[200px]">
            {loadingBookings ? (
              <div className="flex items-center justify-center py-16 gap-2 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading bookings...</span>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-medium">No bookings found.</div>
            ) : (
              <table className="w-full text-left whitespace-nowrap min-w-[900px]">
                <thead>
                  <tr className="text-gray-800 font-semibold border-b border-transparent">
                    <th className="pb-4 font-semibold text-[14px]">Customer</th>
                    <th className="pb-4 font-semibold text-[14px]">Provider</th>
                    <th className="pb-4 font-semibold text-[14px]">Amount</th>
                    <th className="pb-4 font-semibold text-[14px]">Date</th>
                    <th className="pb-4 font-semibold text-[14px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((row) => (
                    <tr key={row.booking_id} className="text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                      <td className="py-3.5 pl-2 rounded-l-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-700 font-bold text-xs">
                            {getCustomerName(row).charAt(0).toUpperCase()}
                          </div>
                          <span>{getCustomerName(row)}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-gray-500">{getProviderName(row)}</td>
                      <td className="py-3.5 font-semibold text-green-600">
                        + {formatCurrency(row.price, row.currency)}
                      </td>
                      <td className="py-3.5 text-gray-500">{formatDate(row.created_at)}</td>
                      <td className="py-3.5 rounded-r-lg">
                        <StatusPill status={bookingStatusToUI(row.booking_status)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Referral Withdrawal Requests */}
        <section className="bg-white rounded-3xl p-6 lg:p-8 flex flex-col shadow-sm border border-gray-200">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-[20px] lg:text-[22px] font-semibold text-gray-800 tracking-tight mb-1">Referral Withdrawal Requests</h2>
              <p className="text-sm text-gray-500">Review and action pending referral payout requests.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleExport("withdrawal records")}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm text-gray-600 border border-gray-200"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-auto min-h-[200px]">
            {loadingWithdrawals ? (
              <div className="flex items-center justify-center py-16 gap-2 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading withdrawals...</span>
              </div>
            ) : withdrawals.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-medium">No withdrawal requests found.</div>
            ) : (
              <table className="w-full text-left whitespace-nowrap min-w-[900px]">
                <thead>
                  <tr className="text-gray-800 font-semibold border-b border-transparent">
                    <th className="pb-4 font-semibold text-[14px]">Request ID</th>
                    <th className="pb-4 font-semibold text-[14px]">Amount</th>
                    <th className="pb-4 font-semibold text-[14px]">Eligible Referrals</th>
                    <th className="pb-4 font-semibold text-[14px]">Requested At</th>
                    <th className="pb-4 font-semibold text-[14px]">Status</th>
                    <th className="pb-4 font-semibold text-[14px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((row) => (
                    <tr key={row.request_id} className="text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                      <td className="py-3.5 pl-2 rounded-l-lg font-mono text-xs text-gray-500">
                        {row.request_id}
                      </td>
                      <td className="py-3.5 font-semibold text-gray-800">
                        {formatCurrency(row.amount)}
                      </td>
                      <td className="py-3.5 text-gray-500">
                        {row.eligible_referrals ?? "—"}
                      </td>
                      <td className="py-3.5 text-gray-500">
                        {formatDate(row.requested_at)}
                      </td>
                      <td className="py-3.5">
                        <StatusPill status={row.status} />
                      </td>
                      <td className="py-3.5 pr-2 rounded-r-lg text-right">
                        {row.status === "PENDING" ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleApproveWithdrawal(row.request_id)}
                              disabled={!!actionLoading}
                              className="w-8 h-8 rounded bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors disabled:opacity-50"
                              title="Approve Withdrawal"
                            >
                              {actionLoading === row.request_id + "-approve"
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <Check className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleRejectWithdrawal(row.request_id)}
                              disabled={!!actionLoading}
                              className="w-8 h-8 rounded bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
                              title="Reject Withdrawal"
                            >
                              {actionLoading === row.request_id + "-reject"
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <X className="w-4 h-4" />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-[13px] pr-2">Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
