import { useState } from 'react';
import { TextField } from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import {
    usernameValidations,
    companyNameValidations,
    locationValidations,
    remoteWorkValidations,
    companySizeValidations,
    fundingStageValidations,
    validationMap
    } from './validations'

const CompanyDetails = ({handleChange, companyDetails}) => {

    const [username, setUsername] = useState(companyDetails.username);
    const [companyName, setCompanyName] = useState(companyDetails.companyName);
    const [location, setLocation] = useState(companyDetails.location);
    const [remoteWorkPolicy, setRemoteWorkPolicy] = useState(companyDetails.remoteWorkPolicy);
    const [companySize, setCompanySize] = useState(companyDetails.companySize);
    const [fundingStage, setFundingStage] = useState(companyDetails.fundingStage);
    const [errors, setErrors] = useState({});

    const isValid = () => {
        const errorsArr = [
            usernameValidations(username),
            companyNameValidations(companyName),
            locationValidations(location),
            remoteWorkValidations(remoteWorkPolicy),
            companySizeValidations(companySize),
            fundingStageValidations(fundingStage),
        ]
        return errorsArr.reduce((obj, err) => {
                if (err !== null) obj[err[0]] = err[1]
                return obj
        }, {});
    };

    const handleContinue = (e) => {
        e.preventDefault();

        const valid = isValid();
        const company = { 
            username, companyName, 
            location, remoteWorkPolicy, 
            companySize, fundingStage 
        }

        if (!Object.keys(valid).length) handleChange(company, 1);
        setErrors(valid);
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        let res = validationMap[name](value)
        const errorsCopy = { ...errors }

        if (res) errorsCopy[res[0]] = res[1] 
        else if (name in errorsCopy) delete errorsCopy[name]
        setErrors(errorsCopy)

        switch (name) {
            case 'username': return setUsername(value)
            case 'companyName': return setCompanyName(value)
            case 'location': return setLocation(value)
            case 'remoteWorkPolicy': return setRemoteWorkPolicy(value)
            case 'companySize': return setCompanySize(value)
            case 'fundingStage': return setFundingStage(value)
            default: return
        }
    }

    return (
        <form className='company-details-form' autoComplete="off" >
            <h1>Company Details</h1>
            <TextField 
                variant="outlined" 
                label="Company Username" 
                id="outlined-basic" 
                name='username' 
                required
                error={'username' in errors}
                helperText={'username' in errors ? errors['username'] : ''}
                value={username} 
                onChange={handleChangeInput}
            />
            <TextField 
                variant="outlined" 
                label="Company Name" 
                id="outlined-basic" 
                name='companyName'
                required
                error={'companyName' in errors}
                helperText={'companyName' in errors ? errors['companyName'] : ''}
                value={companyName} 
                onChange={handleChangeInput}
            />
            <TextField 
                variant="outlined" 
                label="Location" 
                id="outlined-basic" 
                name='location' 
                required
                error={'location' in errors}
                helperText={'location' in errors ? errors['location'] : ''}
                value={location} 
                onChange={handleChangeInput}
            />
            <TextField 
                variant="outlined" 
                label="Remote Work Policy" 
                id="outlined-basic" 
                name='remoteWorkPolicy'
                multiline
                rows={4}
                required 
                error={'remoteWorkPolicy' in errors}
                helperText={'remoteWorkPolicy' in errors ? errors['remoteWorkPolicy'] : ''}
                value={remoteWorkPolicy} 
                onChange={handleChangeInput}
            />
            <FormControl 
                sx={{ minWidth: 200 }}
                error={'companySize' in errors}
            >
                <InputLabel id='company-size-label'>Company Size *</InputLabel>
                <Select 
                    variant='outlined'
                    labelId='company-size-label'
                    label='Company Size *'
                    id='companySize'
                    name='companySize'
                    required
                    error={'companySize' in errors}
                    value={companySize}
                    onChange={handleChangeInput}

                >
                    <MenuItem value='0-10' >0-10</MenuItem>
                    <MenuItem value='10-50' >10-50</MenuItem>
                    <MenuItem value='50-100' >50-100</MenuItem>
                    <MenuItem value='100+' >100+</MenuItem>
                </Select>
                {'companySize' in errors && (
                    <FormHelperText>{errors['companySize']}</FormHelperText>
                )}
            </FormControl>
            <FormControl 
                sx={{ minWidth: 200 }} 
                error={'fundingStage' in errors}
            >
                <InputLabel id='funding-stage-label'>Funding Stage *</InputLabel>
                <Select 
                    variant='outlined'
                    labelId='funding-stage-label'
                    label='Funding Stage *'
                    id='funding-stage'
                    name='fundingStage'
                    required
                    error={'fundingStage' in errors}
                    value={fundingStage}
                    onChange={handleChangeInput}
                >
                    <MenuItem value="Pre-seed">Pre-seed</MenuItem>
                    <MenuItem value="Seed">Seed</MenuItem>
                    <MenuItem value="Series A">Series A</MenuItem>
                    <MenuItem value="Series B">Series B</MenuItem>
                    <MenuItem value="Series C">Series C</MenuItem>
                </Select>
                 {'fundingStage' in errors && (
                    <FormHelperText>{errors['fundingStage']}</FormHelperText>
                )}
            </FormControl>
            <Button 
                variant="contained" 
                size='medium'
                disableElevation 
                onClick={handleContinue} 
                style={{
                    textTransform: 'none',
                    maxWidth: '100px',
                    alignSelf: 'flex-end'
                }} 
            >
                Continue
            </Button>
        </form>
    );
};

export default CompanyDetails;