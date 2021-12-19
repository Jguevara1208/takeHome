import {TextField} from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const RoleDetails = ({ nextStep, prevStep, handleInputChange, roles, addRole, removeRole, handleSalaryChange}) => {


    const divisions = ['Engineering', 'HR', 'Sales', 'Finance', 'Operations', 'People', 'Product', 'Data']

    return (
        <form>
            {roles.map((role, idx) => (
                <div key={`role-${idx}`} className='role-container'>
                    <TextField 
                        id="outlined-basic" 
                        label="Role Title" 
                        variant="outlined" 
                        name='roleTitle' 
                        value={role.roleTitle} 
                        onChange={(e) => handleInputChange(e, idx)}
                    />
                    <Box sx={{width: 200}}>
                        <Typography id="non-linear-slider" gutterBottom>
                            {role.salary[0] !== role.salary[1] 
                            ? 
                                `Salary: $${role.salary[0]}K - $${role.salary[1]}K`
                            :
                                `Salary: $${role.salary[0]}k`
                            }
                        </Typography>
                        <Slider 
                            min={50}
                            step={5}
                            max={300}
                            getAriaLabel={() => 'Temperature range'}
                            value={role.salary}
                            onChange={(e) => handleSalaryChange(e, idx)}
                            valueLabelDisplay="auto"
                        />
                    </Box>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id='division-label'>Division</InputLabel>
                        <Select 
                            labelId='division-label'
                            id='division'
                            label='Division'
                            variant='outlined'
                            name='division'
                            value={role.division}
                            onChange={(e) => handleInputChange(e, idx)}
                        >
                            {divisions.map(div => <MenuItem key={div} value={div} >{div}</MenuItem> )}
                        </Select>
                    </FormControl>
                    <TextField 
                        id="outlined-basic" 
                        label="Location" 
                        variant="outlined" 
                        name='location' 
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
                        value={role.experience} 
                        onChange={(e) => handleInputChange(e, idx)}
                    />
                    {idx > 0 && (
                        <IconButton 
                            onClick={(e) => removeRole(e, idx)} 
                            aria-label="delete"
                        > 
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            ))}

            {roles.length < 3 && (
                <Button 
                    style={{textTransform: 'none'}} 
                    variant="contained" 
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
                onClick={nextStep} 
                size='medium'
            >
                Continue
            </Button>
            <Button 
                style={{textTransform: 'none'}} 
                variant="contained" 
                disableElevation 
                onClick={prevStep} 
                size='medium'
            >
                Previous
            </Button>
        </form>
    );
};

export default RoleDetails;