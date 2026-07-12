import TripStatusBadge from "./TripStatusBadge";


export default function TripItem({
	trip,
	onUpdate,
	onSelect,
}){


return (

<div
	onClick={() => onSelect?.(trip.id)}
	className="
border
border-gray-700
rounded-xl
p-5
mb-5
cursor-pointer
"
>


<div className="
flex
justify-between
">


<div>


<h3 className="font-bold">

{trip.id}

</h3>


<p className="text-gray-400">

{trip.route}

</p>


</div>



<div className="text-right">


<p>
{trip.vehicle}
</p>


<p className="text-gray-400">

{trip.time}

</p>


</div>


</div>



<TripStatusBadge
status={trip.status}
/>

{(trip.status === "DISPATCHED" || trip.status === "DRAFT") && (
	<div className="mt-4 flex gap-3" onClick={(e) => e.stopPropagation()}>
		{trip.status === "DISPATCHED" && (
			<button
				onClick={() => onUpdate?.(trip.id, { status: "COMPLETED" })}
				className="bg-green-600 px-4 py-2 rounded text-white"
			>
				Complete
			</button>
		)}
		<button
			onClick={() => onUpdate?.(trip.id, { status: "CANCELLED" })}
			className="px-4 py-2 border rounded"
		>
			Cancel
		</button>
	</div>
)}


</div>


)

}