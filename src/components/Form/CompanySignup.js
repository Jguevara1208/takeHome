import { useState } from "react";

import company, { roleTemplate } from './CompanyData'

import CompanyDetails from './CompanySignupPages/CompanyDetails';
import RoleDetails from './CompanySignupPages/RoleDetails';
import Confirmation from './CompanySignupPages/Confirmation';

const CompanySignup = () => {

    const [ companyDetails, setCompanyDetails ] = useState(company)
    const { roles } = companyDetails

    const prevStep = (e) => {
        e.preventDefault()
        if (companyDetails.step > 1) {
            const companyCopy = { ...companyDetails }
            companyCopy.step -= 1
            setCompanyDetails(companyCopy)
        }
    }

    const nextStep = (e) => {
        e.preventDefault()
        if (companyDetails.step < 3) {
            const companyCopy = { ...companyDetails }
            companyCopy.step += 1
            setCompanyDetails(companyCopy)
        }
    }

    const handleInputChange = (e, idx=false) => {
        const { name, value } = e.target
        const companyCopy = { ...companyDetails }        
        idx !== false ? companyCopy.roles[idx][name] = value : companyCopy[name] = value
        setCompanyDetails(companyCopy)
    }

    const addRole = (e) => {
        e.preventDefault()
        const companyCopy = { ...companyDetails }
        const { roles } = companyCopy

        if (roles.length < 3) {
            roles.push(roleTemplate())
            setCompanyDetails(companyCopy)
        }
    }

    const removeRole = (e, idx) => {
        e.preventDefault()
        const companyCopy = { ...companyDetails }
        const { roles } = companyCopy
        roles.splice(idx, 1)
        setCompanyDetails(companyCopy)
    }


    switch (companyDetails.step) {
        case 1:
            return <CompanyDetails 
                        nextStep={nextStep}
                        handleInputChange={handleInputChange}
                        companyDetails={companyDetails}
                    />

        case 2:
            return <RoleDetails 
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleInputChange={handleInputChange}
                        addRole={addRole}
                        removeRole={removeRole}
                        roles={roles}
                    />

        case 3:
            return <Confirmation
                        prevStep={prevStep}
                        handleInputChange={handleInputChange}
                        companyDetails={companyDetails}
                    />
        default:
            break;
    }
};

export default CompanySignup;