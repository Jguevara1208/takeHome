import { useState } from 'react';
import { roleTemplate } from '../CompanyData';

import {TextField} from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormHelperText from '@mui/material/FormHelperText';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import {
    roleTitleValidations,
    divisionValidations,
    roleLocationValidations,
    experienceValidations,
    salaryValidations,
    rolesValidationMap
} from './validations'

const RoleDetails = ({companyDetails, handleChange}) => {

    const divisions = ['Engineering', 'HR', 'Sales', 'Finance', 'Operations', 'People', 'Product', 'Data'];

    const [rolesState, setRolesState] = useState(companyDetails.roles);
    const [errors, setErrors] = useState(new Array(companyDetails.roles.length).fill({}));

    const isValid = () => {
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


    const addRole = (e) => {
        e.preventDefault();
        const rolesCopy = [...rolesState];
        if (rolesCopy.length < 3) {
            setErrors([...errors, {}]);
            setRolesState([...rolesCopy, roleTemplate()]);
        }
    }

    const removeRole = (e, idx) => {
        e.preventDefault();
        const rolesCopy = [...rolesState];
        const errorsCopy = [...errors];
        rolesCopy.splice(idx, 1);
        errorsCopy.splice(idx, 1);
        setErrors(errorsCopy);
        setRolesState(rolesCopy);
    }

    const handleSalaryChange = (e, idx) => {
        const {value} = e.target;
        let res = salaryValidations(value)
        const errorsCopy = [ ...errors ]
        if (res) errorsCopy[idx]['salary'] = res[1]
        else if ('salary' in errorsCopy[idx]) delete errorsCopy[idx]['salary']

        const rolesCopy = [...rolesState];
        rolesCopy[idx].salary = value;
        setRolesState(rolesCopy);
    }

    const handleContinue = (e, next=false) => {
        e.preventDefault();
        if (!next) return handleChange({roles: rolesState}, -1);

        const valid = isValid(); 
        if (valid === true) {
            setErrors([{}]);
            handleChange({roles: rolesState}, 1);
        } else {
            setErrors(valid);
        }
    }

    const handleInputChange = (e, idx) => {
        const { name, value } = e.target
        let res = rolesValidationMap[name](value)
        const errorsCopy = [ ...errors ]
        
        if (res) errorsCopy[idx][res[0]] = res[1]
        else if (name in errorsCopy[idx]) delete errorsCopy[idx][name]
        setErrors(errorsCopy)

        const rolesCopy = [ ...rolesState ]
        rolesCopy[idx][name] = value 
        setRolesState(rolesCopy)
    }

    return (
        <form className='role-form' autoComplete="off" >
            <h1>Role Details</h1>
            {rolesState.map((role, idx) => (
                <div key={`role-${idx}`} className='role-container'>
                    <div className='role-header'>
                        <h2>Role {idx+1}</h2>
                        {idx > 0 && (
                            <IconButton
                                onClick={(e) => removeRole(e, idx)}
                                aria-label="delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </div>
                    <TextField
                        id="outlined-basic"
                        label="Role Title"
                        variant="outlined"
                        name='roleTitle'
                        required
                        error={'roleTitle' in errors[idx]}
                        helperText={'roleTitle' in errors[idx] ? errors[idx]['roleTitle'] : ''}
                        value={role.roleTitle}
                        onChange={(e) => handleInputChange(e, idx)}
                    />
                    <FormControl sx={{ minWidth: 200 }} error={'division' in errors[idx]}>
                        <InputLabel id='division-label'>Division *</InputLabel>
                        <Select
                            labelId='division-label'
                            id='division'
                            label='Division '
                            variant='outlined'
                            name='division'
                            required
                            error={'division' in errors[idx]}
                            value={role.division}
                            onChange={(e) => handleInputChange(e, idx)}
                        >
                            {divisions.map(div => <MenuItem key={div} value={div} >{div}</MenuItem> )}
                        </Select>
                        {'division' in errors[idx] && <FormHelperText>{errors[idx]['division']}</FormHelperText>}
                    </FormControl>
                    <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                        name='location'
                        required
                        error={'location' in errors[idx]}
                        helperText={'location' in errors[idx] ? errors[idx]['location'] : ''}
                        value={role.location}
                        onChange={(e) => handleInputChange(e, idx)}
                    />
                    <TextField
                        type='number'
                        InputLabelProps={{shrink: true}}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        id="outlined-basic"
                        label="Years of experience"
                        variant="outlined"
                        name='experience'
                        required
                        error={'experience' in errors[idx]}
                        helperText={'experience' in errors[idx] ? errors[idx]['experience'] : ''}
                        value={role.experience}
                        onChange={(e) => handleInputChange(e, idx)}
                    />
                    <Box className='slider' sx={{width: '95%'}}>
                        <InputLabel id='salary-label' error={'salary' in errors[idx]}>
                            Salary {'salary' in errors[idx] && (
                                <FormHelperText style={{color: '#f44336'}}>
                                    {errors[idx]['salary']}
                                </FormHelperText>
                                )}
                        </InputLabel>
                        <Slider
                            min={50}
                            step={5}
                            max={300}
                            value={role.salary}
                            onChange={(e) => handleSalaryChange(e, idx)}
                            valueLabelDisplay="auto"
                        />
                        <InputLabel 
                            id="non-linear-slider"
                            error={'salary' in errors[idx]}
                        >
                            {role.salary[0] !== role.salary[1]
                            ?
                                `$${role.salary[0]}K - $${role.salary[1]}K`
                            :
                                `$${role.salary[0]}k`
                            }
                        </InputLabel>
                    </Box>
                </div>
            ))}
            <div className='role-buttons'>
                <Button
                    style={{textTransform: 'none'}}
                    variant="contained"
                    disableElevation
                    onClick={(e) =>handleContinue(e)}
                    size='medium'
                >
                    Previous
                </Button>
                {rolesState.length < 3 && (
                <Button
                    style={{textTransform: 'none'}}
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon/>}
                    disableElevation
                    onClick={addRole}
                    size='medium'
                >
                    Add role
                </Button>
            )}
                <Button
                    style={{textTransform: 'none'}}
                    variant="contained"
                    disableElevation
                    onClick={(e) => handleContinue(e, true)}
                    size='medium'
                >
                    Continue
                </Button>
            </div>
        </form>
    );
};

export default RoleDetails;