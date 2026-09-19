import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { providerOverviewData } from "@/assets/data";
import Container from "@/components/global/Container";
import MobileServicesOverviewHeader from "@/components/header/MobileServicesOverviewHeader";
import DesktopServicesOverviewHeader from "@/components/header/DesktopServicesOverviewHeader";
import { Link } from "react-router-dom";
import NoRequestCard from "@/components/overview/NoRequestCard";
import RequestCard from "@/components/overview/RequestCard";
import NoReviewCard from "@/components/reviews/NoReviewCard";
import ReferAndEarnBanner from "@/components/services/ReferAndEarnBanner";

export default function ProviderOverview() {
  const { user, stats, chart, newBookingRequest, reviews } =
    providerOverviewData;

  return (
    <div className="space-y-2 md:space-y-6">
      <Container className="bg-white">
        <MobileServicesOverviewHeader />
        <DesktopServicesOverviewHeader />
      </Container>
      <Container>
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-md p-3 text-sm md:text-base text-gray-700 w-full space-y-1 md:max-w-xs ">
            <p>
              Provider Type: <span className="font-semibold">{user.role}</span>
            </p>
            <p>
              App Commission: {""}
              <span className="font-semibold">{user.commission}</span>
            </p>
          </div>
          <section className="grid grid-cols-2 sm:grid-cols-2 gap-2 md:gap-4">
            <h2 className="sr-only">Stat</h2>
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-primary rounded-md py-3 md:py-4 px-1.5 md:px-2 shadow space-y-4 text-white w-full"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xl md:text-2xl font-semibold leading-tight">
                      {item.value}
                    </span>
                    <span className="bg-white rounded-full p-2 flex items-center justify-center">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm opacity-90">
                    {item.label}
                  </h3>
                </div>
              );
            })}
          </section>
          <section className="bg-white rounded-lg px-2 py-4 md:px-3 md:py-6 space-y-4 md:space-y-6 shadow-md ">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">
                {newBookingRequest.title} (
                {newBookingRequest && newBookingRequest.requests.length})
              </h2>
              <Link
                to="request"
                className="text-xs md:text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            <div>
              <RequestCard {...newBookingRequest.requests[0]} />
              {newBookingRequest.requests.length === 0 && <NoRequestCard />}
            </div>
          </section>
          <ReferAndEarnBanner />
          <section className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="font-semibold text-gray-900 mb-4 text-center">
              Monthly Revenue (₦)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chart}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--primary))", fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={(val) => val.toLocaleString()}
                  tick={{ fill: "#111", fontSize: 12 }}
                  domain={[0, 500000]}
                  ticks={[
                    0, 50000, 100000, 150000, 200000, 250000, 300000, 350000,
                    400000, 450000, 500000,
                  ]}
                />
                <Tooltip
                  formatter={(val) => `₦${val?.toLocaleString() ?? 0}`}
                />
                <Bar dataKey="revenue" fill="#222BDE" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
          <section className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">
                Reviews ({reviews && reviews.length})
              </h2>
              <Link
                to="/service_provider/reviews"
                className="text-xs md:text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* {reviews.slice(0, 1).map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))} */}
            </div>
            {reviews?.length === 0 && <NoReviewCard />}
          </section>
        </div>
      </Container>
    </div>
  );
}
