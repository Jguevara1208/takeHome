import Button from '@mui/material/Button';

const Confirmation = ({companyDetails, handleSubmit, handleChange}) => {
    return (
        <div className='confirmation-container' >
            <h1>Confirmation</h1>
            <div>
                <h3>Company username: </h3>
                <p>{companyDetails.username}</p>
            </div>
            <div>
                <h3>Company name: </h3>
                <p>{companyDetails.companyName}</p>
            </div>
            <div>
                <h3>Company location: </h3>
                <p>{companyDetails.location}</p>
            </div>
            <div className={companyDetails.remoteWorkPolicy.length > 28 ? 'long' : ''}>
                <h3>Remote Work Policy: </h3>
                <p>{companyDetails.remoteWorkPolicy}</p>
            </div>
            <div>
                <h3>Company size: </h3>
                <p>{companyDetails.companySize} employees</p>
            </div>
            <div>
                <h3>Funding Stage: </h3>
                <p>{companyDetails.fundingStage}</p>
            </div>
            <h2 className='roles-header'>Role Details ({companyDetails.roles.length})</h2>
            {companyDetails.roles.map((role, idx) => (
                <div className='confirmation-role-wrapper' key={`role-confirm-${idx}`}>
                        <h2>{role.roleTitle}</h2>
                        <div>
                            <h4>Salary range</h4>
                            <p>${role.salary[0]}K-${role.salary[1]}K</p>    
                        </div>
                        <div>
                            <h4>Role division</h4>
                            <p>{role.division}</p>
                        </div>
                        <div>
                            <h4>Role location</h4>
                            <p>{role.location}</p>
                        </div>
                        <div>
                            <h4>Experience required</h4>
                            <p>{role.experience} {+role.experience === 1 ? 'year' : 'years'}</p>
                        </div>
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