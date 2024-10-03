export const RequirementToU = "terms-of-use"
export const RequirementImpressoAccount = "impresso-account"
export const RequirementProofStudentEnrollment = "proof-of-student-enrollment"
export const RequirementProofAcademicAffiliation =
  "proof-of-academic-affiliation"
export const RequirementDataAccessGranted = "data-access-granted"

export const Requirements: string[] = [
  RequirementToU,
  RequirementImpressoAccount,
  RequirementProofStudentEnrollment,
  RequirementProofAcademicAffiliation,
  RequirementDataAccessGranted,
]

export const RequirementsLabels: Record<string, string> = {
  [RequirementToU]: "Terms of Use",
  [RequirementImpressoAccount]: "Impresso Account",
  [RequirementProofStudentEnrollment]: "Proof of Student Enrollment",
  [RequirementProofAcademicAffiliation]: "Proof of Academic Affiliation",
  [RequirementDataAccessGranted]: "Data Access Granted",
}

export const PlanGuest = "guest"
export const PlanImpressoUser = "impresso-user"
export const PlanStudentUser = "student-user"
export const PlanAcademicUser = "academic-user"
export const PlanAcademicUserPlus = "academic-user-plus"

// constants for the browser view store
export const BrowserViewLogin = "login"
export const BrowserViewSignup = "signup"
export const BrowserWsStatusIdle = "idle"
export const BrowserWsStatusConnecting = "connecting"
export const BrowserWsStatusConnected = "connected"
export const BrowserWsStatusClosed = "closed"
