import {TextField} from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const CompanyDetails = ({nextStep, handleInputChange, companyDetails}) => {

    return (
        <form>
            <TextField 
                id="outlined-basic" 
                label="Company Username" 
                variant="outlined" 
                name='username' 
                value={companyDetails.username} 
                onChange={(e) => handleInputChange(e)}
            />
            <TextField 
                id="outlined-basic" 
                label="Company Name" 
                variant="outlined" 
                name='companyName'
                value={companyDetails.companyName} 
                onChange={(e) => handleInputChange(e)}
            />
            <TextField 
                id="outlined-basic" 
                label="Location" 
                variant="outlined" 
                name='location' 
                value={companyDetails.location} 
                onChange={(e) => handleInputChange(e)}
            />
            <TextField 
                id="outlined-basic" 
                label="Remote Work Policy" 
                variant="outlined" 
                name='remoteWorkPolicy' 
                value={companyDetails.remoteWorkPolicy} 
                onChange={(e) => handleInputChange(e)}
            />
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id='company-size-label'>Company Size</InputLabel>
                <Select 
                    labelId='company-size-label'
                    id='companySize'
                    label='Company Size'
                    variant='outlined'
                    name='companySize'
                    value={companyDetails.companySize}
                    onChange={(e) => handleInputChange(e)}
                >
                    <MenuItem value='0-10' >0-10</MenuItem>
                    <MenuItem value='10-50' >10-50</MenuItem>
                    <MenuItem value='50-100' >50-100</MenuItem>
                    <MenuItem value='100+' >100+</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id='funding-stage-label'>Funding Stage</InputLabel>
                <Select 
                    labelId='funding-stage-label'
                    id='funding-stage'
                    label='Funding Stage'
                    variant='outlined'
                    name='fundingStage'
                    value={companyDetails.fundingStage}
                    onChange={(e) => handleInputChange(e)}
                >
                    <MenuItem value="Pre-seed">Pre-seed</MenuItem>
                    <MenuItem value="Seed">Seed</MenuItem>
                    <MenuItem value="Series A">Series A</MenuItem>
                    <MenuItem value="Series B">Series B</MenuItem>
                    <MenuItem value="Series C">Series C</MenuItem>
                </Select>
            </FormControl>
            <Button 
                style={{textTransform: 'none'}} 
                variant="contained" 
                disableElevation 
                onClick={nextStep} 
                size='medium'
            >
                Continue
            </Button>
        </form>
    );
};

export default CompanyDetails;