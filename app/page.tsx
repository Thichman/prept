'use client'
export default function Index() {
  return (
    <div className=" min-h-screen">
      <div className="flex flex-col items-center py-10">
        <div className="max-w-4xl px-6">
          {/* Test Launch Announcement */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="font-bold text-4xl mb-4 text-prept-color-header-gray-black">Welcome to Prept.ai</h1>
            <p className="text-lg mb-2">Unlock the Power of Personalized Insights</p>
            <p className="text-md mb-6">At Prept.ai, we're excited to announce our test launch phase and invite early adopters to join us in shaping the future of our platform. We're looking for enthusiastic users like you to provide valuable feedback and help us refine our features.</p>
            <p className="text-md mb-6">Sign up now for early access and experience the potential of Prept.ai firsthand!</p>
          </section>

          {/* Why Prept.ai and Features & Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Why Prept.ai */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-2xl mb-4 text-prept-color-header-gray-black">Why Prept.ai?</h2>
              <p className="text-md mb-4">- <strong>Intuitive User Interface</strong>: Navigate through a user-focused interface designed to guide you seamlessly.</p>
              <p className="text-md mb-4">- <strong>Targeted for Success</strong>: Perfect for sales agents and C-suite executives who require comprehensive background information for meetings and pitches.</p>
              <p className="text-md mb-6">- <strong>Comprehensive Data Scraping</strong>: Start with easily accessible data and expand to deeper, richer sources like LinkedIn, Facebook, and news articles.</p>
              {/* <img src="/images/ui-ux.png" alt="UI/UX Design" className="mt-4 rounded-md shadow-md" /> */}
            </section>

            {/* Features & Capabilities */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-2xl mb-4 text-prept-color-header-gray-black">Features and Capabilities</h2>
              <p className="text-md mb-4">- <strong>Executive Reports</strong>: Generate detailed reports that include contact information, work history, and recent activities.</p>
              <p className="text-md mb-4">- <strong>Seamless Integration</strong>: Export results in PDF format and plan for future API integrations with CRM systems like Salesforce or HubSpot.</p>
              <p className="text-md mb-4">- <strong>Enhanced Security</strong>: Built with robust security measures to protect sensitive data and ensure compliance with industry standards.</p>
              <p className="text-md mb-4">- <strong>Customizable Insights</strong>: Tailor reports and data visualizations to fit specific business needs and decision-making processes.</p>
              {/* <img src="/images/tech-integration.png" alt="Tech Integration" className="mt-4 rounded-md shadow-md" /> */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
