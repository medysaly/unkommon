export default function Privacy() {
  return (
    <div className="bg-white px-6 lg:px-10 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-8">
          Privacy Policy
        </h1>
        <p className="text-[13px] text-muted-foreground mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-[15px] text-secondary-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly: name, email address, company name, and any details shared
              during consultations or through our AI chatbot. We also collect standard usage data (pages visited, time on site)
              through analytics tools.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">2. How We Use Your Information</h2>
            <p>
              Your information is used to respond to inquiries, schedule consultations, deliver engineering services,
              and improve our website. We do not sell your personal data to third parties. Ever.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">3. Data Storage & Security</h2>
            <p>
              All data is stored on secure AWS infrastructure with encryption at rest and in transit.
              Client project data is isolated in private VPCs and never shared across engagements.
              Our architecture is aligned with HIPAA and SOC 2 requirements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">4. AI Chatbot</h2>
            <p>
              Our website chatbot is powered by AWS Bedrock. Conversations are stored temporarily (24-hour TTL)
              to maintain context during your session. Chat data is not used to train any AI models.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">5. Third-Party Services</h2>
            <p>
              We use Cal.com for scheduling, AWS for infrastructure, and standard analytics tools.
              Each third-party service has its own privacy policy governing their use of data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">6. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time
              by contacting us at contact@unkommon.ai.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">7. Contact</h2>
            <p>
              For privacy-related questions, contact us at{" "}
              <a href="mailto:contact@unkommon.ai" className="text-foreground underline">contact@unkommon.ai</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
