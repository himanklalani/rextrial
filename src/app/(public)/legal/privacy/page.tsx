import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Rex International',
  alternates: { canonical: '/legal/privacy' }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="section-padding flex-1 bg-brand-white-pure">
      <div className="container-inner max-w-4xl">
        <h1 className="heading-section text-4xl mb-8 border-b border-brand-gray/20 pb-8">Privacy Policy</h1>
        <div className="prose prose-brand max-w-none text-brand-dark-muted">
          <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
          <h3>1. Information We Collect</h3>
          <p>When you use our website, we may collect the following types of information:</p>
          <ul>
            <li><strong>Contact Form Data:</strong> Name, Email address, Phone number, and specific message content regarding your hardware inquiries.</li>
            <li><strong>Usage Data:</strong> We utilize Vercel Web Analytics to monitor website performance. This service is privacy-first, uses no tracking cookies, and does not collect Personally Identifiable Information (PII).</li>
          </ul>
          <h3>2. How We Store Your Information</h3>
          <p>Data submitted via our contact forms is securely stored in an encrypted MongoDB database. This data is strictly used for fulfilling business inquiries (such as quoting repairs or arranging AMCs). We do not sell, rent, or lease your personal information to any third parties under any circumstances.</p>
          <h3>3. Data Security</h3>
          <p>We implement robust technical and organizational measures designed to protect your personal information. Our web application utilizes server-side data sanitization and schema validation (Zod) to prevent malicious code injection, alongside network-level rate limiting to protect our database infrastructure.</p>
          <h3>4. Third-Party Communications</h3>
          <p>We use WhatsApp Business as our primary communication channel. If you initiate a chat via our WhatsApp CTA links, your interactions are subject to WhatsApp's own Privacy Policy and Terms of Service.</p>
          <h3>5. Data Retention & Your Rights</h3>
          <p>We retain lead data only for as long as necessary to fulfill the business purpose. You have the right to request the deletion of your contact information from our database at any time by contacting us.</p>
        </div>
      </div>
    </main>
  );
}
