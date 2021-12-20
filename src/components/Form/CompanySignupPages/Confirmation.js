import Button from '@mui/material/Button';

const Confirmation = ({companyDetails, handleSubmit, handleChange}) => {
    return (
        <div>
            <p>Company username: {companyDetails.username}</p>
            <p>Company name: {companyDetails.companyName}</p>
            <p>Company location: {companyDetails.location}</p>
            <p>Remote Work Policy: {companyDetails.remoteWorkPolicy}</p>
            <p>Company size: {companyDetails.companySize} employees</p>
            <p>Funding Stage: {companyDetails.fundingStage}</p>
            {companyDetails.roles.map((role, idx) => (
                <div key={`role-confirm-${idx}`}>
                        <p>Role title: {role.roleTitle}</p>
                        <p>Salary range: ${role.salary[0]}K-${role.salary[1]}K</p>
                        <p>Role division: {role.division}</p>
                        <p>Role location: {role.location}</p>
                        <p>Experience required: {role.experience}</p>
                </div>
            ))}
            <div className='role-buttons'>
                <Button
                    style={{textTransform: 'none'}}
                    variant="contained"
                    disableElevation
                    onClick={() => handleChange({}, -1)}
                    size='medium'
                >
                    Previous
                </Button>
                <Button
                    style={{textTransform: 'none'}}
                    variant="contained"
                    disableElevation
                    onClick={(e) => handleSubmit(e)}
                    size='medium'
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default Confirmation;