import HVACCalculator from "@/components/hvac-calculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <i className="fas fa-calculator text-primary text-2xl"></i>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">HVAC Duct Calculator</h1>
                <p className="text-sm text-gray-500">PragmaticPE Engineering Tools</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-600">Professional HVAC Calculations</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HVACCalculator />

        {/* Information Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            <i className="fas fa-book mr-3 text-primary"></i>
            HVAC Duct Calculation Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Velocity Guidelines</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Supply ducts: 500-1500 ft/min</li>
                <li>• Return ducts: 500-1000 ft/min</li>
                <li>• Main ducts: 1000-2000 ft/min</li>
                <li>• High-velocity: 2000-4000 ft/min</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Friction Guidelines</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Low-pressure: 0.05-0.08 in./100ft</li>
                <li>• Medium-pressure: 0.08-0.12 in./100ft</li>
                <li>• High-pressure: 0.12-0.15 in./100ft</li>
                <li>• Maximum recommended: 0.15 in./100ft</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Calculation Formulas</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• CFM = Area × Velocity</li>
                <li>• Area = π × (D/2)²</li>
                <li>• D = √(4 × CFM / (π × V))</li>
                <li>• Friction calculations per ASHRAE</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <i className="fas fa-hard-hat text-primary text-xl"></i>
              <span className="text-gray-900 font-semibold">PragmaticPE</span>
            </div>
            <div className="text-sm text-gray-600">
              Professional HVAC Engineering Calculator • Built for Accuracy
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
