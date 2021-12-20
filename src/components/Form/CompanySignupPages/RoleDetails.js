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

const RoleDetails = ({companyDetails, handleChange}) => {

    const divisions = ['Engineering', 'HR', 'Sales', 'Finance', 'Operations', 'People', 'Product', 'Data']

    const [rolesState, setRolesState] = useState(companyDetails.roles)
    const [errors, setErrors] = useState(new Array(companyDetails.roles.length).fill({}))

    const isValid = (rolesState) => {
        const tempErrors = []
        let isError = false
        rolesState.forEach(role => {
            const roleErrors = {}
            const { roleTitle, salary, division, location, experience } = role
            if (!roleTitle.length) roleErrors['roleTitle'] = 'Role title is required'
            if (!division.length) roleErrors['division'] = 'Role division is required'
            if (!location.length) roleErrors['location'] = 'Role location is required'
            if (!experience.length) roleErrors['experience'] = 'Role years of experience is required'
            if (salary[0] === 0 && salary[1] === 0) roleErrors['salary'] = 'Role salary is required'
            if (Object.keys(roleErrors).length) isError = true
            tempErrors.push(roleErrors)
        })
        if (isError) return tempErrors
        return true
    }

    const handleInputChange = (e, idx) => {
        const { name, value } = e.target
        const rolesCopy = [...rolesState]
        rolesCopy[idx][name] = value
        setRolesState(rolesCopy)
    }

    const addRole = (e) => {
        e.preventDefault()
        const rolesCopy = [...rolesState]
        if (rolesCopy.length < 3) {
            setErrors([...errors, {}])
            setRolesState([...rolesCopy, roleTemplate()])
        }
    }

    const removeRole = (e, idx) => {
        e.preventDefault()
        const rolesCopy = [...rolesState]
        const errorsCopy = [...errors]
        rolesCopy.splice(idx, 1)
        errorsCopy.splice(idx, 1)
        setErrors(errorsCopy)
        setRolesState(rolesCopy)
    }

    const handleSalaryChange = (e, idx) => {
        const {value} = e.target
        const rolesCopy = [...rolesState]
        rolesCopy[idx].salary = value
        setRolesState(rolesCopy)
    }

    const handleContinue = (e, next=false) => {
        e.preventDefault()
        if (!next) {
            handleChange({roles: rolesState}, -1)
            return
        }
        const valid = isValid()
        if (valid === true) {
            setErrors([{}])
            handleChange({roles: rolesState}, 1)
        } else {
            setErrors(valid)
        }
    }

    const onBlurValidate = () => {
        const valid = isValid()
        if (typeof valid !== 'boolean') {
            setErrors(valid)
        } else {
            setErrors(new Array(rolesState.length).fill({}))
        }
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
                        onBlur={onBlurValidate}
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
                            onFocus={onBlurValidate}
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
                        onBlur={onBlurValidate}
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
                        onBlur={onBlurValidate}
                    />
                    <Box className='slider' sx={{width: '95%'}}>
                        <InputLabel id='salary-label' error={'salary' in errors[idx]}>Salary {'salary' in errors[idx] && <FormHelperText style={{color: '#f44336'}}>{errors[idx]['salary']}</FormHelperText>}</InputLabel>
                        <Slider
                            min={50}
                            step={5}
                            max={300}
                            value={role.salary}
                            onChange={(e) => handleSalaryChange(e, idx)}
                            onBlur={onBlurValidate}
                            valueLabelDisplay="auto"
                        />
                        <InputLabel id="non-linear-slider" error={'salary' in errors[idx]}>
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