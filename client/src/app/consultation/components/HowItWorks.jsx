const HowItWorks = () => {
  return (
    <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">How It Works</h2>
          <div className="space-y-4 text-gray-700 text-[16px] leading-[1.6]">
            <p>
              First-time clients receive a free 30-minute consultation with a
              Bosnia—whether it's about residency, citizenship, healthcare,
              property investment, rentals, business operations, daily life,
              bureaucracy, or cultural nuances. Our advice is tailored to your
              needs.
            </p>
            <p className="leading-relaxed bg-main/5 p-4 rounded-lg border border-main/10">
              After the call, you'll receive a personalized follow-up with
              additional resources and connections to trusted professionals,
              including lawyers, insurance providers, real estate agents,
              translators, and tax experts.
            </p>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-main">📝</span>
              <p className="my-0">
                Legal matters will be handled by our vetted lawyer network—for
                everything else, we're here to help.
              </p>
            </div>
            <p className="font-medium text-main">
              Appointments are scheduled over Zoom.
            </p>
          </div>
        </div>
  )
}

export default HowItWorks
