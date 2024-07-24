export function staticPrompts() {
    return [
        `You are tasked with personalizing the following templated sales email. Do not rewrite the email; instead, fill in the blanks with specific information about the recipient and their company based on the provided details. Ensure the personalization is accurate and relevant.
        Template Email:
        Ask me to provide the current email I have
        Details for Personalization:
        
        Recipient's Name: [Provide recipient's name or leave blank for AI to find]
        Company Name: [Provide company name or leave blank for AI to find]
        Industry: [Provide industry or leave blank for AI to find]
        Role: [Provide role or leave blank for AI to find]
        Specific Challenge: [Provide specific challenge or leave blank for AI to find]
        Additional Context: [Provide any additional context or leave blank for AI to find]`,
    ];
}