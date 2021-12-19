const company = {
    step: 1,
    username: '',
    companyName: '',
    location: '',
    remoteWorkPolicy: '',
    companySize: '',
    fundingStage: '',
    roles: [
        {
            roleTitle: '',
            salary: '',
            division: '',
            location: '',
            experience: ''
        }
    ]
}

export const roleTemplate = () => {
    return {
        roleTitle: '',
        salary: '',
        division: '',
        location: '',
        experience: ''
    }
}

export default company