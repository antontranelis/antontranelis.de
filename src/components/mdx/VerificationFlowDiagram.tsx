interface VerificationFlowDiagramProps {
  title?: string;
}

export function VerificationFlowDiagram({ title = 'Bestehenden User verifizieren' }: VerificationFlowDiagramProps) {
  return (
    <div className="my-8 bg-base-200 rounded-xl p-6">
      {title && (
        <h3 className="text-lg font-semibold text-center mb-6">{title}</h3>
      )}

      {/* Flow Diagram */}
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
        {/* Step 1 - Treffen */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center mb-2 shadow-lg">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            1
          </div>
          <span className="text-sm font-medium mb-1">Persönliches Treffen</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Anna und Ben treffen sich - beide haben bereits eine DID
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

        {/* Step 2 - QR-Code Austausch */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-base-100 flex items-center justify-center mb-2 shadow-lg border border-base-300">
            <img src="/ui/Phone Profile.png" alt="QR-Code Austausch" className="w-14 h-14 object-contain" />
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            2
          </div>
          <span className="text-sm font-medium mb-1">QR-Code Austausch</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Gegenseitiges Scannen der QR-Codes (enthält öffentlichen Schlüssel + DID)
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

        {/* Step 3 - Signatur */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-base-100 flex items-center justify-center mb-2 shadow-lg border border-base-300">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            3
          </div>
          <span className="text-sm font-medium mb-1">Gegenseitige Signatur</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Beide signieren: "Ich bestätige die Identität dieser Person"
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

        {/* Step 4 - Netzwerke verbunden */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-success text-success-content flex items-center justify-center mb-2 shadow-lg">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            4
          </div>
          <span className="text-sm font-medium mb-1">Netzwerke verbunden</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Beide sehen jetzt den verschlüsselten Content des anderen
          </p>
        </div>
      </div>
    </div>
  );
}
