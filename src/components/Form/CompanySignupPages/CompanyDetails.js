
const CompanyDetails = ({nextStep, handleInputChange, companyDetails}) => {

    return (
        <form>
            <label htmlFor="username">
                Company Username
                <input 
                    name='username' 
                    type="text" 
                    value={companyDetails.username}
                    onChange={(e) => handleInputChange(e)}
                />
            </label>
            <label htmlFor="companyName">
                Company Name
                <input 
                    name='companyName' 
                    type="text" 
                    value={companyDetails.companyName}
                    onChange={(e) => handleInputChange(e)}
                />
            </label>
            <label htmlFor="location">
                Location
                <input 
                    name='location' 
                    type="text" 
                    value={companyDetails.location}
                    onChange={(e) => handleInputChange(e)}
                />
            </label>
            <label htmlFor="remoteWorkPolicy">
                Remote Work Policy
                <input 
                    name='remoteWorkPolicy' 
                    type="text" 
                    value={companyDetails.remoteWorkPolicy}
                    onChange={(e) => handleInputChange(e)}
                />
            </label>
            <label htmlFor="companySize">
                Company Size
                <input 
                    name='companySize' 
                    type="number" 
                    value={companyDetails.companySize}
                    onChange={(e) => handleInputChange(e)}
                />
            </label>
            <label htmlFor="fundingStage">
                Funding Stage
                <select 
                    name="fundingStage" 
                    value={companyDetails.fundingStage} 
                    onChange={(e) => handleInputChange(e)}
                >
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                    <option value="Series C">Series C</option>
                </select>
            </label>
            <button onClick={nextStep}>Continue</button>
        </form>
    );
};

export default CompanyDetails;