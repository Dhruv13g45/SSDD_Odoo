"use client";

import PageHeader from "@/components/common/PageHeader";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account and platform preferences." />
      <div className="rounded-xl border border-white/5 bg-[#12141a] p-10 text-center text-slate-500">
        <p>Settings panel is under construction.</p>
        <p className="mt-2 text-sm">System preferences, notifications, and user management will be available here.</p>
      </div>
    </div>
  );
}
