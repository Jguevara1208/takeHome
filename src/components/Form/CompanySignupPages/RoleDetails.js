import { useState } from 'react';
import { roleTemplate } from '../Utilities/CompanyData';

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

import { rolesValidationMap, isValidRoles } from '../Utilities/Validations'
import { divisions } from '../Utilities/CompanyData'

const RoleDetails = ({companyDetails, handleChange}) => {

    const [rolesState, setRolesState] = useState(companyDetails.roles);
    const [errors, setErrors] = useState(new Array(companyDetails.roles.length).fill({}));

    const addRole = (e) => {
        const rolesCopy = [...rolesState];
        if (rolesCopy.length < 3) {
            setErrors([...errors, {}]);
            setRolesState([...rolesCopy, roleTemplate()]);
        }
    }

    const removeRole = (e, idx) => {
        const rolesCopy = [...rolesState];
        rolesCopy.splice(idx, 1);
        setRolesState(rolesCopy);

        const errorsCopy = [...errors];
        errorsCopy.splice(idx, 1);
        setErrors(errorsCopy);
    }

    const handleSalaryChange = (e, idx) => {
        const {value} = e.target;
        const res = rolesValidationMap['salary'](value) // -> ['input', 'error'] || null
        const errorsCopy = [ ...errors ]

        if (res) errorsCopy[idx]['salary'] = res[1]
        else if ('salary' in errorsCopy[idx]) delete errorsCopy[idx]['salary']

        const rolesCopy = [...rolesState];
        rolesCopy[idx].salary = value;
        setRolesState(rolesCopy);
    }

    const handleContinue = (e, next=false) => {

        if (!next) return handleChange({roles: rolesState}, -1);

        const valid = isValidRoles(rolesState); // -> [{'input' : 'error'}] || true

        if (valid === true) {
            setErrors([{}]);
            handleChange({roles: rolesState}, 1);
        } else {
            setErrors(valid);
        }
    }

    const handleInputChange = (e, idx) => {
        const { name, value } = e.target

        const res = rolesValidationMap[name](value) // -> ['input', 'error'] || null
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
                        variant="outlined"
                        label="Role Title"
                        name='roleTitle'
                        required
                        error={'roleTitle' in errors[idx]}
                        helperText={'roleTitle' in errors[idx] ? errors[idx]['roleTitle'] : ''}
                        value={role.roleTitle}
                        onChange={(e) => handleInputChange(e, idx)}
                    />
                    <FormControl 
                        sx={{ minWidth: 200 }}
                        error={'division' in errors[idx]}
                    >
                        <InputLabel id='division-label'>Division *</InputLabel>
                        <Select
                            variant='outlined'
                            labelId='division-label'
                            label='Division '
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
                        variant="outlined"
                        label="Location"
                        name='location'
                        required
                        error={'location' in errors[idx]}
                        helperText={'location' in errors[idx] ? errors[idx]['location'] : ''}
                        value={role.location}
                        onChange={(e) => handleInputChange(e, idx)}
                    />
                    <TextField
                        variant="outlined"
                        label="Years of experience"
                        type='number'
                        name='experience'
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0'}}
                        InputLabelProps={{shrink: true}}
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
                            valueLabelDisplay="auto"
                            min={50} step={5} max={300}
                            value={role.salary}
                            onChange={(e) => handleSalaryChange(e, idx)}
                        />
                        <InputLabel 
                            id="non-linear-slider"
                            error={'salary' in errors[idx]}
                        >
                            ${role.salary[0]} {role.salary[0] !== role.salary[1] && `- $${role.salary[1]}K`}
                        </InputLabel>
                    </Box>
                </div>
            ))}
            <div className='role-buttons'>
                <Button
                    variant="contained"
                    type='button'
                    size='medium'
                    disableElevation
                    style={{textTransform: 'none'}}
                    onClick={(e) =>handleContinue(e)}
                >
                    Previous
                </Button>
                {rolesState.length < 3 && (
                <Button
                    variant="outlined"
                    type='button'
                    onClick={addRole}
                    startIcon={<AddCircleOutlineIcon/>}
                    style={{textTransform: 'none'}}
                    disableElevation
                    size='medium'
                >
                    Add role
                </Button>
            )}
                <Button
                    variant="contained"
                    type='button'
                    size='medium'
                    disableElevation
                    style={{textTransform: 'none'}}
                    onClick={(e) => handleContinue(e, true)}
                >
                    Continue
                </Button>
            </div>
        </form>
    );
};

export default RoleDetails;