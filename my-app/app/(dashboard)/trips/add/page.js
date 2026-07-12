import PageHeader from "@/components/common/PageHeader";

export default function AddTripPage() {
  return (
    <div>
      <PageHeader title="Add Trip" description="Create a new trip." />
      <div className="mt-6 p-6 rounded-xl border border-white/10 bg-[#12151a]">
        <p className="text-slate-400">Add trip form goes here.</p>
      </div>
    </div>
  );
}
