import Button from '@mui/material/Button';

const Confirmation = ({companyDetails, handleSubmit, handleChange}) => {
    return (
        <div className='confirmation-container' >
            <h2 className='company-header'>Company Details</h2>
            <div className='confirmation-type'>
                <h3>Company Username: </h3>
                <p>{companyDetails.username}</p>
            </div>
            <div className='confirmation-type'>
                <h3>Company Name: </h3>
                <p>{companyDetails.companyName}</p>
            </div>
            <div className='confirmation-type'>
                <h3>Company Location: </h3>
                <p>{companyDetails.location}</p>
            </div>
            <div className='confirmation-type'>
                <h3>Remote Work Policy: </h3>
                <p>{companyDetails.remoteWorkPolicy}</p>
            </div>
            <div className='confirmation-type'>
                <h3>Company Size: </h3>
                <p>{companyDetails.companySize} employees</p>
            </div>
            <div className='confirmation-type'>
                <h3>Funding Stage: </h3>
                <p>{companyDetails.fundingStage}</p>
            </div>
            <h2 className='roles-header'>Role Details ({companyDetails.roles.length})</h2>
            {companyDetails.roles.map((role, idx) => (
                <div className='confirmation-role-wrapper' key={`role-confirm-${idx}`}>
                        <h2>{role.roleTitle}</h2>
                        <div>
                            <h4>Role division</h4>
                            <p>{role.division}</p>
                        </div>
                        <div>
                            <h4>Role location</h4>
                            <p>{role.location}</p>
                        </div>
                        <div>
                            <h4>Salary range</h4>
                            <p>${role.salary[0]}K-${role.salary[1]}K</p>    
                        </div>
                        <div>
                            <h4>Experience required</h4>
                            <p>{role.experience} {+role.experience === 1 ? 'year' : 'years'}</p>
                        </div>
                </div>
            ))}
            <div className='role-buttons'>
                <Button
                    variant="contained"
                    type='button'
                    style={{textTransform: 'none'}}
                    disableElevation
                    onClick={() => handleChange({}, -1)}
                    size='medium'
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    type='button'
                    style={{textTransform: 'none'}}
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