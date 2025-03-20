export type WizardState = {
  step: number
  userData: {
    role: string
    password: string
    fullName: string
    email: string
    academyId?: string
    paymentCompleted?: boolean
  }
  nextStep: () => void
  prevStep: () => void
  updateUserData: (data: Partial<WizardState["userData"]>) => void
  resetWizard: () => void
}

export type WizardStep = {
  title: string
  description: string
}

export const WIZARD_STEPS: WizardStep[] = [
  {
    title: "Información Personal",
    description: "Agrega información personal",
  },
  {
    title: "Contraseña y Rol",
    description: "Configura tu contraseña y rol",
  },
  {
    title: "Academia",
    description: "Selecciona tu academia",
  },
  {
    title: "Preferencias",
    description: "Configura tus preferencias de la plataforma",
  },
  {
    title: "Confirmación",
    description: "Revisa y confirma tu información",
  },
]