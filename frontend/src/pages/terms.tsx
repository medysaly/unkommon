export default function Terms() {
  return (
    <div className="bg-white px-6 lg:px-10 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-8">
          Terms of Service
        </h1>
        <p className="text-[13px] text-muted-foreground mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-[15px] text-secondary-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">1. Services</h2>
            <p>
              Unkommon provides custom AI/ML engineering services including RAG system development,
              AI agent development, ML consulting, and cloud infrastructure deployment.
              All engagements are scoped individually after an initial consultation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">2. Engagement Structure</h2>
            <p>
              Each project begins with a free 30-minute architecture review. If we proceed,
              you receive a fixed-scope proposal with clear deliverables and pricing before any work begins.
              There are no surprise invoices or hourly billing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">3. Intellectual Property</h2>
            <p>
              All code, systems, and infrastructure built during an engagement are owned by you, the client.
              They deploy on your AWS accounts and you retain full access and control.
              Unkommon does not retain copies of client code or data after project completion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">4. Confidentiality</h2>
            <p>
              All client data, business information, and project details are treated as confidential.
              We do not share client information with third parties. NDAs are available upon request
              and are standard for regulated industry engagements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">5. Website Use</h2>
            <p>
              This website is provided for informational purposes. The AI chatbot on this site is a
              demonstration of our engineering capabilities and provides general information about our services.
              It does not constitute professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">6. Limitation of Liability</h2>
            <p>
              Unkommon's liability for any engagement is limited to the fees paid for that specific project.
              We are not liable for indirect, incidental, or consequential damages arising from the use
              of systems we build.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">7. Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href="mailto:contact@unkommon.ai" className="text-foreground underline">contact@unkommon.ai</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
