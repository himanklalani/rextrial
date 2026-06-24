import { connectDB, Lead } from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

// Force dynamic rendering so it always fetches fresh data
export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage({ params }: { params: Promise<{ secret: string }> }) {
  // 1. Verify Secret Key
  const validSecret = process.env.ADMIN_SECRET_KEY;
  const { secret } = await params;
  
  if (!validSecret || secret !== validSecret) {
    return notFound();
  }

  // 2. Fetch all leads from the database securely
  await connectDB();
  const leadsRaw = await Lead.find({}).sort({ createdAt: -1 }).lean();
  
  // Convert _id to string for React keys
  const leads = leadsRaw.map(lead => ({
    ...lead,
    id: lead._id.toString(),
  }));

  return (
    <div className="min-h-screen bg-brand-dark text-brand-white-pure p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b border-brand-white-pure/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold font-outfit text-brand-green mb-2">Lead Dashboard</h1>
            <p className="text-brand-gray-light/60">Showing {leads.length} total form submissions.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href={`/admin/leads/${secret}/blogs`}
              className="text-sm font-bold bg-brand-green/20 text-brand-green px-4 py-2 rounded border border-brand-green/30 hover:bg-brand-green hover:text-brand-dark transition-colors"
            >
              Manage Blogs
            </Link>
            <div className="text-xs font-mono bg-brand-white-pure/5 px-3 py-1.5 rounded-md border border-brand-white-pure/10">
              Secure Session Active
            </div>
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-20 bg-brand-white-pure/5 rounded-xl border border-brand-white-pure/10">
            <p className="text-brand-gray-light/50">No leads have been captured yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-brand-white-pure/5 p-6 rounded-xl border border-brand-white-pure/10 hover:border-brand-green/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-brand-white-pure">{lead.name}</h3>
                    <p className="text-brand-green-light font-mono text-sm mt-1">{lead.email} &nbsp;|&nbsp; {lead.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-brand-green/20 text-brand-green px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                      {lead.status}
                    </span>
                    <p className="text-xs text-brand-gray-light/40 mt-2">
                      {new Date(lead.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="bg-brand-dark p-4 rounded-lg border border-brand-white-pure/5 mt-4">
                  <div className="text-brand-gray-light/80 text-sm whitespace-pre-wrap">{lead.message}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
