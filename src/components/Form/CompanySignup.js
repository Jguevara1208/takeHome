import { useState } from "react";

import company, { roleTemplate } from './CompanyData'

import InfoIcon from '@mui/icons-material/Info';

import CompanyDetails from './CompanySignupPages/CompanyDetails';
import RoleDetails from './CompanySignupPages/RoleDetails';
import Confirmation from './CompanySignupPages/Confirmation';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import './CompanySignup.css';

const CompanySignup = () => {

    const [ companyDetails, setCompanyDetails ] = useState(company)
    const { roles } = companyDetails
    const steps = ['Company Details', 'Roles', 'Confirmation']

    const handleSubmit = () => {
        console.log(companyDetails)
    }

    const prevStep = (e) => {
        e.preventDefault()
        if (companyDetails.step > 0) {
            const companyCopy = { ...companyDetails }
            companyCopy.step -= 1
            setCompanyDetails(companyCopy)
        }
    }

    const nextStep = (e) => {
        e.preventDefault()
        if (companyDetails.step < 2) {
            const companyCopy = { ...companyDetails }
            companyCopy.step += 1
            setCompanyDetails(companyCopy)
        }
    }

    const handleChange =  (e, obj) => {
        e.preventDefault()
        const companyCopy = { ...companyDetails }
        const keys = Object.keys(obj)
        keys.forEach(key => {
            companyCopy[key] = obj[key]
        })
        companyCopy.step += 1
        setCompanyDetails(companyCopy)
    }

    console.log(companyDetails)
    const handleInputChange = (e, idx=false) => {
        const { name, value } = e.target
        const companyCopy = { ...companyDetails }        

        idx !== false 
            ? companyCopy.roles[idx][name] = value 
            : companyCopy[name] = value

        setCompanyDetails(companyCopy)
    }

    const handleSalaryChange = (e, idx) => {
        const {value} = e.target
        const companyCopy = { ...companyDetails }
        companyCopy.roles[idx].salary = value
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

    return (
        <div className='container'>
            <div className='wrapper'>
                <h1>Propose a Bounty</h1>
                <p>Talentdrop will approve new bounties on an ongoing basis.</p>
                <div className='notice'>
                    <InfoIcon/>
                    <p>We have an ongoing waitlist for new bounties, but we review new proposals on a regular basis. Fill out the form if you'd like us to get in touch!</p>
                </div>
                <div className='form-container'>
                    <Box sx={{ mb: 10, width: '100%' }}>
                        <Stepper activeStep={companyDetails.step} alternativeLabel>
                            {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                            ))}
                        </Stepper>
                    </Box>
                    {companyDetails.step === 0 && (
                        <CompanyDetails 
                                handleChange={handleChange}
                                companyDetails={companyDetails}
                        />
                    )}            
                    {companyDetails.step === 1 && (
                        <RoleDetails 
                                nextStep={nextStep}
                                prevStep={prevStep}
                                handleInputChange={handleInputChange}
                                handleSalaryChange={handleSalaryChange}
                                addRole={addRole}
                                removeRole={removeRole}
                                roles={roles}
                        />
                    )}
                    {companyDetails.step === 2 && (
                        <Confirmation
                                prevStep={prevStep}
                                companyDetails={companyDetails}
                                handleSubmit={handleSubmit}
                        />
                    )}
                </div>
            </div>
        </div>
    )
};

export default CompanySignup;