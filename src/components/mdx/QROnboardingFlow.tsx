import { useState } from 'react';

interface QROnboardingFlowProps {
  title?: string;
}

const steps = [
  {
    id: 1,
    title: 'QR-Code scannen',
    description: 'Ben scannt Annas QR-Code mit der App. Der Code enthält Annas öffentlichen Schlüssel und DID.',
    image: '/ui/Phone Profile.png',
    alt: 'Handy zeigt QR-Code mit Profil',
  },
  {
    id: 2,
    title: 'Profil erscheint',
    description: 'Ben sieht Annas Profil auf seinem Bildschirm und kann ihre Identität bestätigen.',
    image: '/ui/Profile View.png',
    alt: 'Profilkarte mit Name und Tags',
  },
  {
    id: 3,
    title: 'ID wird generiert',
    description: 'Falls Ben noch keine eigene ID hat, wird sie jetzt automatisch erstellt.',
    image: '/ui/Phone Profile.png',
    alt: 'Neue Identität wird erstellt',
  },
  {
    id: 4,
    title: 'Gegenseitige Verifizierung',
    description: 'Ben ist jetzt in Annas Netzwerk und sieht ihren verschlüsselten Content.',
    image: '/ui/Phone Friends.png',
    alt: 'Zwei Profile verbunden mit Checkmark',
  },
];

export function QROnboardingFlow({ title = 'Onboarding durch QR-Code' }: QROnboardingFlowProps) {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];

  return (
    <div className="my-8 bg-base-200 rounded-xl overflow-hidden px-6 pb-6 pt-4">
      {title && (
        <h3 className="text-lg font-semibold text-center mb-4 mt-1">{title}</h3>
      )}

      {/* Grafik-Bereich - feste Höhe */}
      <div className="flex items-center justify-center h-64 sm:h-72 mb-4">
        <img
          src={currentStep.image}
          alt={currentStep.alt}
          className="max-h-full w-auto object-contain drop-shadow-lg transition-all duration-300"
        />
      </div>

      {/* Aktuelle Step-Karte */}
      <div className="bg-base-100 p-4 rounded-lg shadow-md border border-base-300 min-h-24 mb-4">
        <h4 className="font-semibold text-base mb-1">{currentStep.title}</h4>
        <p className="text-base-content/70 leading-relaxed text-sm">
          {currentStep.description}
        </p>
      </div>

      {/* Navigation mit Stepper */}
      <div>
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="btn btn-sm btn-ghost btn-circle shrink-0 disabled:opacity-30"
            aria-label="Zurück"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Custom Stepper mit Zahlen */}
          <div className="flex items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`w-8 h-8 rounded-full transition-all flex items-center justify-center text-sm font-semibold ${
                    index <= activeStep
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-300 text-base-content/60'
                  }`}
                  aria-label={step.title}
                >
                  {step.id}
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-6 h-0.5 ${index < activeStep ? 'bg-primary' : 'bg-base-300'}`} />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={activeStep === steps.length - 1}
            className="btn btn-sm btn-ghost btn-circle shrink-0 disabled:opacity-30"
            aria-label="Weiter"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
