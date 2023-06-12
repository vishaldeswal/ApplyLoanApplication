export default interface AdvisorLoanApplicationDTO {
    id: string
    emailId: string,
    address: string,
    size: number,
    cost: number,
    registrationCost: number,
    monthlyFamilyIncome: number,
    otherIncome: number,
    loanAmount: number,
    loanDuration: number,
    loanStartDate: string,
    type: string,
    value: number,
    share: number,
    eligibility: string,
    status: string
}