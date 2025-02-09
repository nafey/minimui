import { useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

let data = [

];


try {
	const response = await fetch("http://localhost:3333/api/stat/daily/", {
		method: "POST",
		body: JSON.stringify({
			event: "DUMMY_EVENT"
		})
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const result = await response.json();
	console.log(result);

	data = result.data;
	data.reverse();
	// setData(result);
} catch (err) {
	console.log(err);
	// setError(err.message);
} finally {
	// setLoading(false);
}


export default function Chart() {
	useEffect(() => {
		const fetchData = async () => {

		};

		fetchData();
	}, []);

	return (
		<div className="font-mono text-xs">
			<LineChart width={1000} height={240} data={data} >
				<Line type="linear" dataKey="count" stroke="#8884d8" strokeWidth={2} />
				<XAxis dataKey="date" stroke="#ddd" axisLine={false} tickMargin={6} />
				<YAxis stroke="#ddd" axisLine={false} tickLine={false} tickMargin={6} />
				<Tooltip />
				<CartesianGrid
					// strokeDasharray="3 3"
					strokeWidth={1}
					stroke="#555"
					vertical={false}
				/>
			</LineChart>
		</div>
	)
}
