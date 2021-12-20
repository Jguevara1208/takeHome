import { useState } from 'react';

import {TextField} from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const CompanyDetails = ({handleChange, companyDetails}) => {

    const [username, setUsername] = useState(companyDetails.username)
    const [companyName, setCompanyName] = useState(companyDetails.companyName)
    const [location, setLocation] = useState(companyDetails.location)
    const [remoteWorkPolicy, setRemoteWorkPolicy] = useState(companyDetails.remoteWorkPolicy)
    const [companySize, setCompanySize] = useState(companyDetails.companySize)
    const [fundingStage, setFundingStage] = useState(companyDetails.fundingStage)
    const [errors, setErrors] = useState({})

    const isValid = () => {
        const errors = {}
        if (username.length < 5) errors['username'] = 'Username must be atleast 5 characters'
        if (!companyName.length) errors['companyName'] = 'Company name is required'
        if (!location.length) errors['location'] = 'Location is required'
        if (!remoteWorkPolicy.length) errors['remoteWorkPolicy'] = 'Remote Work Policy is required'
        if (!companySize.length) errors['companySize'] = 'Company Size is required'
        if (!fundingStage.length) errors['fundingStage'] = 'Funding Stage is required'
        if (!username.length) errors['username'] = 'Company Username is required'
        console.log(errors)
        if (Object.keys(errors).length) return errors
        return true
    }

    const handleContinue = (e) => {
        e.preventDefault()
        const valid = isValid()
        if (valid === true) {
            setErrors({})
            handleChange({
                username, companyName,
                location, remoteWorkPolicy,
                companySize, fundingStage
            }, 1)
        } else {
            setErrors(valid)
        }
    }

    const onBlurValidate = () => {
        const valid = isValid()
        if (Object.keys(valid).length) {
            setErrors(valid)
        } else {
            setErrors({})
        }
    }

    return (
        <form className='company-details-form' autocomplete="off" >
            <h1>Company Details</h1>
            <TextField 
                id="outlined-basic" 
                label="Company Username" 
                variant="outlined" 
                name='username' 
                required
                value={username} 
                error={'username' in errors}
                helperText={'username' in errors ? errors['username'] : ''}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={onBlurValidate}
            />
            <TextField 
                id="outlined-basic" 
                label="Company Name" 
                variant="outlined" 
                name='companyName'
                required
                error={'companyName' in errors}
                helperText={'companyName' in errors ? errors['companyName'] : ''}
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)}
                onBlur={onBlurValidate}
            />
            <TextField 
                id="outlined-basic" 
                label="Location" 
                variant="outlined" 
                name='location' 
                required
                error={'location' in errors}
                helperText={'location' in errors ? errors['location'] : ''}
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                onBlur={onBlurValidate}
            />
            <TextField 
                id="outlined-basic" 
                label="Remote Work Policy" 
                variant="outlined" 
                multiline
                rows={4}
                name='remoteWorkPolicy'
                required 
                error={'remoteWorkPolicy' in errors}
                helperText={'remoteWorkPolicy' in errors ? errors['remoteWorkPolicy'] : ''}
                value={remoteWorkPolicy} 
                onChange={(e) => setRemoteWorkPolicy(e.target.value)}
                onBlur={onBlurValidate}
            />
            <FormControl sx={{ minWidth: 200 }} error={'companySize' in errors}>
                <InputLabel id='company-size-label'>Company Size *</InputLabel>
                <Select 
                    labelId='company-size-label'
                    id='companySize'
                    label='Company Size *'
                    variant='outlined'
                    name='companySize'
                    required
                    error={'companySize' in errors}
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    onBlur={onBlurValidate}
                >
                    <MenuItem value='0-10' >0-10</MenuItem>
                    <MenuItem value='10-50' >10-50</MenuItem>
                    <MenuItem value='50-100' >50-100</MenuItem>
                    <MenuItem value='100+' >100+</MenuItem>
                </Select>
                {'companySize' in errors && <FormHelperText>{errors['companySize']}</FormHelperText>}
            </FormControl>
            <FormControl sx={{ minWidth: 200 }} error={'fundingStage' in errors}>
                <InputLabel id='funding-stage-label'>Funding Stage *</InputLabel>
                <Select 
                    labelId='funding-stage-label'
                    id='funding-stage'
                    label='Funding Stage *'
                    variant='outlined'
                    name='fundingStage'
                    required
                    error={'fundingStage' in errors}
                    value={fundingStage}
                    onChange={(e) => setFundingStage(e.target.value)}
                    onBlur={onBlurValidate}
                >
                    <MenuItem value="Pre-seed">Pre-seed</MenuItem>
                    <MenuItem value="Seed">Seed</MenuItem>
                    <MenuItem value="Series A">Series A</MenuItem>
                    <MenuItem value="Series B">Series B</MenuItem>
                    <MenuItem value="Series C">Series C</MenuItem>
                </Select>
                 {'fundingStage' in errors && <FormHelperText>{errors['fundingStage']}</FormHelperText>}
            </FormControl>
            <Button 
                style={{textTransform: 'none', maxWidth: '100px', alignSelf: 'flex-end'}} 
                variant="contained" 
                disableElevation 
                onClick={handleContinue} 
                size='medium'
            >
                Continue
            </Button>
        </form>
    );
};

export default CompanyDetails;