import { useState } from "react";

import company from './CompanyData'

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
    const steps = ['Company Details', 'Role Details', 'Confirmation']

    const handleSubmit = () => {
        
    }

    const handleChange =  (obj, stepNum) => {
        const companyCopy = { ...companyDetails }
        const keys = Object.keys(obj)
        keys.forEach(key => {
            companyCopy[key] = obj[key]
        })
        companyCopy.step += stepNum
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
                                handleChange={handleChange}
                                companyDetails={companyDetails}
                        />
                    )}
                    {companyDetails.step === 2 && (
                        <Confirmation
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