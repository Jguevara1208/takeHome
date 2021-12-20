
const Confirmation = ({prevStep, companyDetails, handleSubmit}) => {
    return (
        <div>
            <div className=''>
                Company username: {companyDetails.username}
            </div>
            <div className=''>
                Company name: {companyDetails.companyName}
            </div>
            <div className=''>
                Company location: {companyDetails.location}
            </div>
            <div className=''>
                Remote Work Policy: {companyDetails.remoteWorkPolicy}
            </div>
            <div className=''>
                Company size: {companyDetails.companySize}
            </div>
            <div className=''>
                Funding Stage: {companyDetails.fundingStage}
            </div>
            <div className=''>
                {companyDetails.roles.map((role, idx) => (
                    <div key={`role-confirm-${idx}`}>
                        <div>
                            Role title: {role.roleTitle}
                        </div>
                        <div>
                            Salary range: {role.salary[0]}-{role.salary[1]}
                        </div>
                        <div>
                            Role division: {role.division}
                        </div>
                        <div>
                            Role location: {role.location}
                        </div>
                        <div>
                            Experience required: {role.experience}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Confirmation;