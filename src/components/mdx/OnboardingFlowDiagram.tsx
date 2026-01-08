interface OnboardingFlowDiagramProps {
  title?: string;
}

export function OnboardingFlowDiagram({ title = 'Onboarding durch QR-Code' }: OnboardingFlowDiagramProps) {
  return (
    <div className="my-8 bg-base-200 rounded-xl p-6">
      {title && (
        <h3 className="text-lg font-semibold text-center mb-6">{title}</h3>
      )}

      {/* Flow Diagram */}
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
        {/* Step 1 */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center mb-2 shadow-lg">
            <img src="/ui/Phone Profile.png" alt="QR-Code" className="w-14 h-14 object-contain" />
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            1
          </div>
          <span className="text-sm font-medium mb-1">QR-Code scannen</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Ben scannt Annas QR-Code (enthält öffentlichen Schlüssel + DID)
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-start justify-center text-base-content/30 shrink-0 pt-7">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <div className="flex justify-center text-base-content/30 md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Step 2 */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-base-100 flex items-center justify-center mb-2 shadow-lg border border-base-300">
            <img src="/ui/Profile View.png" alt="Profil" className="w-14 h-14 object-contain" />
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            2
          </div>
          <span className="text-sm font-medium mb-1">Profil bestätigen</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Ben erstellt seine eigene DID (falls noch nicht vorhanden)
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-start justify-center text-base-content/30 shrink-0 pt-7">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <div className="flex justify-center text-base-content/30 md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Step 3 */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-base-100 flex items-center justify-center mb-2 shadow-lg border border-base-300">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            3
          </div>
          <span className="text-sm font-medium mb-1">Verifizieren</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Ben signiert: "Ich bestätige Annas Identität" und speichert ihren Key
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-start justify-center text-base-content/30 shrink-0 pt-7">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <div className="flex justify-center text-base-content/30 md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Step 4 */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-success text-success-content flex items-center justify-center mb-2 shadow-lg">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            4
          </div>
          <span className="text-sm font-medium mb-1">Verbunden!</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Annas verschlüsselter Content wird für Ben entschlüsselbar
          </p>
        </div>
      </div>
    </div>
  );
}
