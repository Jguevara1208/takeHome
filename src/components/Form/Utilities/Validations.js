/*---------------------------------------------------------------------------------*/
/*------------------------Company Details Validations------------------------------*/
/*---------------------------------------------------------------------------------*/

export const usernameValidations = (username) => {
    let companies = JSON.parse(localStorage.getItem('companies')) || {};
    // if (username.length < 5) return ['username', 'Username must be atleast 5 characters'];
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

/*---------------------------------------------------------------------------------*/
/*--------------------------Role Details Validations-------------------------------*/
/*---------------------------------------------------------------------------------*/

export const roleTitleValidations = (roleTitle) => {
    if (!roleTitle.length) return ['roleTitle', 'Role title is required'];
    return null
}

export const divisionValidations = (division) => {
    if (!division.length) return ['division', 'Role division is required'];
    return null
}

export const roleLocationValidations = (location) => {
    if (!location.length) return ['location', 'Role location is required'];
    return null
}

export const experienceValidations = (experience) => {
     if (!experience.length) return ['experience', 'Role years of experience is required'];
    return null
}

export const salaryValidations = (salary) => {
    if (salary[0] === 0 && salary[1] === 0) return ['salary', 'Role salary is required'];
    return null
}

export const rolesValidationMap = {
    'roleTitle': roleTitleValidations,
    'division': divisionValidations,
    'location': locationValidations,
    'experience': experienceValidations,
    'salary': salaryValidations,
}

/*---------------------------------------------------------------------------------*/
/*-------------------------Roles Validation Utilities------------------------------*/
/*---------------------------------------------------------------------------------*/

export const isValidRoles = (rolesState) => {
    const tempErrors = [];

    rolesState.forEach(role => {
        const errorsArr = [
            roleTitleValidations(role.roleTitle),
            divisionValidations(role.division),
            roleLocationValidations(role.location),
            experienceValidations(role.experience),
            salaryValidations(role.salary)
        ]

        const roleErrors = errorsArr.reduce((obj, err) => {
            if (err !== null) obj[err[0]] = err[1]
            return obj
        }, {})

        tempErrors.push(roleErrors);
    });

    const isErrors = tempErrors.some(err => Object.keys(err).length > 0)
    if (isErrors) return tempErrors
    return true;
}