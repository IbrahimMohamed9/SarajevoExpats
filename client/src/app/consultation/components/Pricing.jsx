const Pricing = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Pricing</h2>
      <div className="space-y-4 text-gray-700 text-[16px] leading-[1.6]">
        <p>The following rates are per 30-minute session:</p>
        <div className="pl-4">
          <p className="font-medium">Mohammed Nourallah</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>First-time clients: €100 (includes session with a lawyer)</li>
            <li>Repeat clients: €50</li>
          </ul>
        </div>
        <div className="pl-4 py-2 border-l-2 border-main/30 my-4">
          <p className="font-medium">
            Bonus: All first-time clients receive an extra 30-minute session
            with a vetted, English-speaking lawyer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
