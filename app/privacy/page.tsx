const page = () => {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy – ArcFlow</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: August 9, 2025</p>

      <section className="space-y-6">
        <p>We respect your privacy and are committed to protecting your personal data.</p>

        <div>
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p>Account Information: Email address, username (if provided). Usage Data: App usage patterns, habit tracking data you choose to log. Device Data: Basic technical information to ensure proper app functionality.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <p>To provide and improve ArcFlow’s features. To send reminders and notifications (if you enable them). To analyze anonymized usage patterns for better user experience.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. Data Sharing & Disclosure</h2>
          <p>We do not sell your personal data to third parties. We may share anonymized data with trusted partners to improve the service. We may disclose data if required by law.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. Data Security</h2>
          <p>We use technical and organizational measures to protect your data. However, no online service is 100% secure, and we cannot guarantee absolute protection.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. Your Rights</h2>
          <p>You can request to delete your account and all associated data at any time. You can update or change your information in the app settings.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. Changes to This Policy</h2>
          <p>We may update this policy, and we will notify you of major changes via in-app notice or email.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">7. Contact Us</h2>
          <p>For privacy or terms-related inquiries: <a href="mailto:support@arcflow.app" className="text-blue-600 underline">mohamedaytsidibah@gmail.com</a></p>
        </div>
      </section>
    </main>
  );
}

export default page;