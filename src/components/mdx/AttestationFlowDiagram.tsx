interface AttestationFlowDiagramProps {
  title?: string;
}

export function AttestationFlowDiagram({ title = 'Attestation erstellen' }: AttestationFlowDiagramProps) {
  return (
    <div className="my-8 bg-base-200 rounded-xl p-6">
      {title && (
        <h3 className="text-lg font-semibold text-center mb-6">{title}</h3>
      )}

      {/* Flow Diagram */}
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
        {/* Step 1 - Hand die was macht */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center mb-2 shadow-lg">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            1
          </div>
          <span className="text-sm font-medium mb-1">Gute Tat</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Ben hilft Anna im Garten - eine reale Interaktion findet statt
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

        {/* Step 2 - Stift */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-base-100 flex items-center justify-center mb-2 shadow-lg border border-base-300">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            2
          </div>
          <span className="text-sm font-medium mb-1">Attestation erstellen</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Anna erstellt signierte Aussage: "Ben kann Garten" mit Tags
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

        {/* Step 3 - Profil */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-base-100 flex items-center justify-center mb-2 shadow-lg border border-base-300">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            3
          </div>
          <span className="text-sm font-medium mb-1">Teil des Profils</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Attestation wird kryptographisch an Bens DID gebunden
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

        {/* Step 4 - Netzwerk */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-success text-success-content flex items-center justify-center mb-2 shadow-lg">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="bg-primary text-primary-content text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center -mt-4 mb-2 border-2 border-base-200">
            4
          </div>
          <span className="text-sm font-medium mb-1">Sichtbar im Netzwerk</span>
          <p className="text-xs text-base-content/60 leading-relaxed">
            Alle die Ben verifiziert haben sehen seine gesammelten Attestationen
          </p>
        </div>
      </div>
    </div>
  );
}
