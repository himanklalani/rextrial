import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Rex International',
  alternates: { canonical: '/legal/terms' }
};

export default function TermsPage() {
  return (
    <main className="section-padding flex-1 bg-brand-white-pure">
      <div className="container-inner max-w-4xl">
        <h1 className="heading-section text-4xl mb-8 border-b border-brand-gray/20 pb-8">Terms of Service</h1>
        <div className="prose prose-brand max-w-none text-brand-dark-muted">
          <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing or using the Rex International website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>
          <h3>2. AMC and Repair Services</h3>
          <p>Annual Maintenance Contracts (AMCs) cover labor and regular diagnostics. Free replacement parts are only included in Comprehensive AMC plans, subject to the specific contract agreement. Rex International reserves the right to void warranties if hardware has been tampered with by unauthorized third parties.</p>
          <h3>3. Data Loss Liability</h3>
          <p>While printers generally do not store critical business data long-term, some enterprise laser models possess internal storage. Rex International is not liable for any data loss, confidential document leaks, or network configurations lost during the hardware repair or servicing process. Clients are advised to clear memory queues before handing over hardware.</p>
          <h3>4. Parts Warranty</h3>
          <p>All OEM replacement parts installed by Rex International come with the standard manufacturer's warranty. Compatible or refurbished parts carry a limited 30-day functional warranty unless otherwise stated in writing.</p>
          <h3>5. Contact</h3>
          <p>For any service disputes or terms inquiries, please reach out through our official contact channels.</p>
        </div>
      </div>
    </main>
  );
}
