export const usernameValidations = (username) => {
    let companies = JSON.parse(localStorage.getItem('companies')) || {};

    if (username.length < 5) return ['username', 'Username must be atleast 5 characters'];
    if (username.toLowerCase() in companies || username.toLowerCase() === 'talentdrop') return ['username', 'Username already exists'];
    if (/^\d+$/.test(username)) return ['username', 'Username cannot contain only numbers']
    if (!username.length) return ['username', 'Company Username is required'];
    return null
}

export const companyNameValidations = (companyName) => {
    if (!companyName.length) return ['companyName', 'Company name is required'];
    if (/^\d+$/.test(companyName)) return ['companyName', 'Company name cannot contain only numbers']
    return null
}

export const locationValidations = (location) => {
    if (!location.length) return ['location', 'Location is required'];
    if (/^\d+$/.test(location)) return ['location', 'Location cannot contain only numbers']
    return null
}

export const remoteWorkValidations = (remoteWorkPolicy) => {
    if (!remoteWorkPolicy.length) return ['remoteWorkPolicy', 'Remote Work Policy is required'];
    return null
}

export const companySizeValidations = (companySize) => {
    if (!companySize.length) return ['companySize', 'Company Size is required'];
    return null
}

export const fundingStageValidations = (fundingStage) => {
    if (!fundingStage.length) return ['fundingStage', 'Funding Stage is required'];
    return null
}

export const validationMap = {
    'username' : usernameValidations,
    'companyName': companyNameValidations,
    'location': locationValidations,
    'remoteWorkPolicy': remoteWorkValidations,
    'companySize': companySizeValidations,
    'fundingStage': fundingStageValidations
}

//53