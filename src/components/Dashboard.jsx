import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip } from "recharts";
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiOutlineArrowTrendingDown } from "react-icons/hi2";
import lightMap from "../assets/images/lightMap.png";
import darkMap from "../assets/images/darkMap.png";
import { LineChart, Line } from "recharts";
import { Link } from "react-router-dom";
import { useUIState } from "./Context";
import { motion } from "framer-motion";

/**
 * DashboardPage - Main dashboard view for analytics and summary
 */
export default function DashboardPage() {
	// Data for summary boxes
	const summaryBoxes = [
		{ name: "Customers", number: "3,781", hike: "+11.01%", link: "/" },
		{ name: "Orders", number: "1,219", hike: "-0.03%", link: "/orders" },
		{ name: "Revenue", number: "$695", hike: "+15.03%", link: "/" },
		{ name: "Growth", number: "30.1%", hike: "+6.08%", link: "/" },
	];

	// Table headers and data
	const tableHeaders = [
		{ name: "Name", key: "name" },
		{ name: "Price", key: "price" },
		{ name: "Quantity", key: "quantity" },
		{ name: "Amount", key: "amount" },
	];
	const salesData = [
		{ name: "Jan", Actual: 18, Projection: 22 },
		{ name: "Feb", Actual: 20, Projection: 25 },
		{ name: "Mar", Actual: 22, Projection: 23 },
		{ name: "Apr", Actual: 24, Projection: 27 },
		{ name: "May", Actual: 15, Projection: 20 },
		{ name: "Jun", Actual: 19, Projection: 23 },
	];
	const revenueSummary = [
		{ title: "Current Week", value: "$58,211" },
		{ title: "Previous Week", value: "$68,768" },
	];
	const productTableData = [
		{ name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6518.18" },
		{ name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4754.50" },
		{ name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2559.36" },
		{ name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3680.00" },
		{ name: "Long Sleeve Shirt", price: "$25.50", quantity: 10, amount: "$255.00" },
		{ name: "Cotton T-Shirt", price: "$10.99", quantity: 184, amount: "$2023.16" },
		{ name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3680.00" },
		{ name: "Long Sleeve Shirt", price: "$25.50", quantity: 10, amount: "$255.00" },
		{ name: "Cotton T-Shirt", price: "$10.99", quantity: 184, amount: "$2023.16" },
		{ name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3680.00" },
		{ name: "Long Sleeve Shirt", price: "$25.50", quantity: 10, amount: "$255.00" },
		{ name: "Cotton T-Shirt", price: "$10.99", quantity: 184, amount: "$2023.16" },
		{ name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3680.00" },
		{ name: "Long Sleeve Shirt", price: "$25.50", quantity: 10, amount: "$255.00" },
		{ name: "Cotton T-Shirt", price: "$10.99", quantity: 184, amount: "$2023.16" },
		{ name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3680.00" },
		{ name: "Long Sleeve Shirt", price: "$25.50", quantity: 10, amount: "$255.00" },
		{ name: "Cotton T-Shirt", price: "$10.99", quantity: 184, amount: "$2023.16" },
		{ name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3680.00" },
	];
	const trafficSources = [
		{ name: "Direct", value: 300.56 },
		{ name: "Affilliate", value: 135.18 },
		{ name: "Sponsored", value: 154.02 },
		{ name: "E-mail", value: 48.96 },
	];
	const revenueByCountry = [
		{ location: "New York", revenue: 72, maxRevenue: 100 },
		{ location: "San Francisco", revenue: 39, maxRevenue: 100 },
		{ location: "Sydney", revenue: 25, maxRevenue: 100 },
		{ location: "Singapore", revenue: 61, maxRevenue: 100 },
	];
	const pieColors = ["#1c1c1c", "#b9edbd", "#b1e3fe", "#95a4fd"];
	const { darkModeEnabled } = useUIState();

	// Accessibility: ARIA roles for main dashboard
	return (
		<main aria-label="Dashboard analytics and summary">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
				className={`p-4 font-inter ${darkModeEnabled ? "bg-zinc-900 text-white fade-in" : "bg-white text-zinc-900 fade-out"}`}
			>
				<div className="font-bold w-full py-6 px-1">eCommerce</div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.7 }}
					className="flex flex-col md:flex-row w-full gap-x-6"
				>
					{/* Summary boxes container */}
					<div className="basis-0 flex-1" style={{ minWidth: 400, height: 252 }}>
						<div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
							{[
								{ name: "Customers", number: "3,781", hike: "+11.01%", link: "/" },
								{ name: "Orders", number: "1,219", hike: "-0.03%", link: "/orders" },
								{ name: "Revenue", number: "$695", hike: "+15.03%", link: "/" },
								{ name: "Growth", number: "30.1%", hike: "+6.08%", link: "/" },
							].map((data, index) => {
								let alternateColor;
								if (index === 0 || index === 3) {
									alternateColor = "bg-blue-100 text-black";
								} else if (index === 1 || index === 2) {
									alternateColor = darkModeEnabled
										? "bg-zinc-800 hover:bg-zinc-700 text-white fade-in"
										: "bg-zinc-100 hover:bg-zinc-200 text-black fade-out";
								}
								return (
									<Link
										to={data.link}
										key={index}
										className={`${alternateColor} p-6 rounded-3xl flex flex-col justify-between items-start transition-all duration-300`}
										aria-label={`Go to ${data.name}`}
										style={{ width: '100%', height: '100%' }}
									>
										<div className="text-md font-bold">{data.name}</div>
										<div className="mt-4 flex justify-between items-center w-full">
											<span className="text-2xl font-bold">{data.number}</span>
											<span
												className={`text-sm flex items-center ${
													(index === 0 || index === 3)
														? 'text-black'
														: (darkModeEnabled ? 'text-white' : 'text-black')
												} transform transition-transform`}
												aria-label={data.hike.startsWith('-') ? 'Decrease' : 'Increase'}
											>
												{data.hike}{" "}
												{data.hike.startsWith("+") ? (
													<FaArrowTrendUp className="ml-1 group-hover:translate-y-[-10px] duration-500" />
												) : (
													<HiOutlineArrowTrendingDown className="ml-1 group-hover:translate-y-[10px] duration-500" />
												)}
											</span>
										</div>
									</Link>
								);
							})}
						</div>
					</div>
					{/* Bar chart container */}
					<div
						className={`basis-0 flex-1 flex items-center rounded-2xl transition-colors duration-300 ${darkModeEnabled ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-zinc-100 text-black hover:bg-zinc-200'}`}
						style={{ minWidth: 400, height: 252 }}
					>
						<div className="w-full h-full flex flex-col justify-between p-6">
							<h3 className="font-bold text-md mb-2">Projections vs Actuals</h3>
							<div style={{ height: 180, width: '100%' }}>
								<ResponsiveContainer width="100%" height={180}>
										<BarChart
										width={432}
										height={180}
										data={[
											{ name: "Jan", Actual: 18, Projection: 22 },
											{ name: "Feb", Actual: 20, Projection: 25 },
											{ name: "Mar", Actual: 22, Projection: 23 },
											{ name: "Apr", Actual: 24, Projection: 27 },
											{ name: "May", Actual: 15, Projection: 20 },
											{ name: "Jun", Actual: 19, Projection: 23 },
										]}
										margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
									>
										<CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} stroke={darkModeEnabled ? '#444' : '#ccc'} />
										<XAxis dataKey="name" stroke={darkModeEnabled ? '#fff' : '#000'} />
										<YAxis stroke={darkModeEnabled ? '#fff' : '#000'} />
										<Tooltip contentStyle={{ backgroundColor: darkModeEnabled ? '#27272a' : '#fff', color: darkModeEnabled ? '#fff' : '#000' }} />
											<Legend />
										<Bar dataKey="Actual" stackId="a" fill="#a8c5da" barSize={20} />
										<Bar dataKey="Projection" stackId="a" fill="#cedfe9" radius={[6, 6, 0, 0]} barSize={20} />
										</BarChart>
									</ResponsiveContainer>
							</div>
						</div>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.7 }}
					className="flex flex-col md:flex-row gap-6 h-auto w-full mt-6"
				>
					{/* Revenue section parent container */}
					<div className="w-full flex flex-row gap-x-6">
						{/* Revenue graph container */}
						<div className={`flex-1 rounded-xl px-8 py-6 transition-colors duration-300 ${darkModeEnabled ? 'bg-[#232325] text-white hover:bg-zinc-800' : 'bg-[#f8f9fb] text-zinc-900 hover:bg-zinc-200'}`} style={{ minWidth: 662, height: 318 }}>
							{/* Custom Legend */}
							<div className="flex items-center mb-2">
								<span className="font-bold text-lg mr-4" style={{ color: darkModeEnabled ? '#fff' : '#232325' }}>Revenue</span>
								<span className="h-6 border-l border-[#E5E7EB] mx-4"></span>
								<span className="flex items-center mr-6">
									<span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: darkModeEnabled ? '#B5BAFF' : '#000' }}></span>
									<span className="text-xs font-medium mr-1" style={{ color: darkModeEnabled ? '#B5BAFF' : '#232325' }}>Current Week</span>
									<span className="font-bold text-xs" style={{ color: darkModeEnabled ? '#fff' : '#232325' }}>$58,211</span>
									</span>
								<span className="flex items-center">
									<span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: darkModeEnabled ? '#AEE2FF' : '#B5D6F6' }}></span>
									<span className="text-xs font-medium mr-1" style={{ color: darkModeEnabled ? '#AEE2FF' : '#232325' }}>Previous Week</span>
									<span className="font-bold text-xs" style={{ color: darkModeEnabled ? '#fff' : '#232325' }}>$68,768</span>
									</span>
								</div>
							<div style={{ height: 200 }}>
							<ResponsiveContainer width="100%" height="100%">
									<LineChart data={salesData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
										<CartesianGrid strokeDasharray="3 3" stroke={darkModeEnabled ? '#39394a' : '#E5E7EB'} />
										<XAxis dataKey="name" stroke={darkModeEnabled ? '#B5BAFF' : '#B5B5B5'} tick={{ fontSize: 14, fontWeight: 500 }} />
										<YAxis stroke={darkModeEnabled ? '#B5BAFF' : '#B5B5B5'} tick={{ fontSize: 14, fontWeight: 500 }} />
									<Tooltip />
										{/* Previous Week: always solid, thin, light blue/purple */}
									<Line
										type="monotone"
										dataKey="Projection"
											stroke={darkModeEnabled ? '#AEE2FF' : '#B5D6F6'}
											strokeWidth={2}
											dot={false}
											activeDot={false}
										/>
										{/* Current Week: single continuous line, solid then dotted */}
									<Line
										type="monotone"
										dataKey="Actual"
											stroke={darkModeEnabled ? '#B5BAFF' : '#000'}
											strokeWidth={3.5}
											dot={false}
											activeDot={false}
											strokeDasharray={darkModeEnabled ? '0 0 180 12 6 12 6 1000' : '0 0 180 12 6 12 6 1000'}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
						{/* Revenue by location container */}
						<div
							className={`flex-1 rounded-3xl py-6 px-4 flex flex-col justify-between items-center h-full transition-colors duration-300 ${darkModeEnabled ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-[#f8f9fb] text-zinc-900 hover:bg-zinc-200'}`}
							style={{ minWidth: 200, maxWidth: 272, height: 318 }}
					>
						<h6 className="text-md font-semibold text-center mb-4">
							Revenue by Location
						</h6>

							<div className="relative w-full flex justify-center items-center mb-4">
								{darkModeEnabled ? (
								<img
									src={darkMap}
									alt="Dark Mode Map"
										className="object-cover rounded-3xl"
										style={{ width: 154, height: 82 }}
								/>
							) : (
								<img
									src={lightMap}
									alt="Light Mode Map"
										className="object-cover rounded-3xl"
										style={{ width: 154, height: 82 }}
								/>
							)}
						</div>

						<div
							className={` ${
									darkModeEnabled ? "text-white" : "text-black"
							} rounded-lg`}
						>
								{revenueByCountry.map((data, index) => (
									<div key={index} className="mb-2 px-2 w-full">
										<div className="flex items-center justify-between text-[15px] font-medium w-full mb-1">
											<span className="truncate max-w-[200%]">{data.location}</span>
											<span className="font-mono tabular-nums min-w-[48px] text-right">{data.revenue}K</span>
									</div>
									<div
											className="w-full h-[4px] bg-[#D6E7F5] rounded-full"
									>
										<div
												className="h-[4px] bg-[#7DB6EC] rounded-full"
											style={{
												width: `${(data.revenue / data.maxRevenue) * 100}%`,
											}}
										></div>
									</div>
								</div>
							))}
							</div>
						</div>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.7 }}
					className="flex flex-col md:flex-row gap-6 h-auto w-full mt-6"
				>
					<div
						className={`w-full md:w-[70%] rounded-3xl overflow-y-scroll py-6 px-4 ${
							darkModeEnabled
								? "bg-zinc-800 hover:bg-zinc-700 text-white fade-in"
								: "bg-zinc-100 hover:bg-zinc-200 text-black fade-out"
						}`}
						style={{ maxHeight: "400px" }}
					>
						<div className="font-bold mb-3 ml-3">Top Selling Products</div>
						<div className="overflow-x-auto">
							<table className="min-w-full table-auto text-left border-collapse">
								<thead>
									<tr className="text-sm border-b-2 border-[#a9aaac]">
										{tableHeaders.map((header, index) => (
											<th key={index} className="px-4 py-2">
												{header.name}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{productTableData.map((item, index) => (
										<tr key={index}>
											{" "}
											{tableHeaders.map((header, index) => (
												<td key={index} className="px-4 py-2">
													{item[header.key]}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					<div
						className={`w-full md:w-[30%] h-auto rounded-3xl py-6 px-4 ${
							darkModeEnabled
								? "bg-zinc-800 hover:bg-zinc-700 text-white fade-in"
								: "bg-zinc-100 hover:bg-zinc-200 text-black fade-out"
						}`}
					>
						<div className="font-bold mb-3">Total Sales</div>
						<ResponsiveContainer width="100%" height={190}>
							<PieChart>
								<Pie
									data={trafficSources}
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={80}
									fill="#8884d8"
									paddingAngle={0}
									dataKey="value"
								>
									{trafficSources.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
									))}
								</Pie>
								<RechartsTooltip content={<PieCustomTooltip />} />
							</PieChart>
						</ResponsiveContainer>

						<div>
							{trafficSources.map((data, index) => (
								<div
									className="flex py-1 justify-between text-center"
									key={index}
								>
									<div className="flex items-center gap-2">
										<span
											style={{
												backgroundColor: pieColors[index],
												width: "12px",
												height: "12px",
												borderRadius: "50%",
												display: "inline-block",
											}}
										></span>
										<span>{data.name}</span>
									</div>
									<span>${data.value}</span>
								</div>
							))}
						</div>
					</div>
				</motion.div>
			</motion.div>
		</main>
	);
}

// Custom Tooltip for PieChart
const PieCustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 16px', fontWeight: 500, fontSize: 16, color: '#232325', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        {name} : {value}
      </div>
    );
  }
  return null;
};
