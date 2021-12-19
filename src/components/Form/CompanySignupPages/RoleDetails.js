

const RoleDetails = ({nextStep, prevStep, handleInputChange, roles, addRole, removeRole}) => {

    console.log(roles)

    return (
        <form>
            {roles && roles.map((role, idx) => (
                <div key={`role-${idx}`} className='role-container'>
                    <label htmlFor="roleTitle">
                        Title
                        <input 
                            name='roleTitle' 
                            type="text" 
                            value={role.roleTitle} 
                            onChange={(e) => handleInputChange(e, idx)}
                        />
                    </label>
                    <label htmlFor="salary">
                        Salary
                        <input 
                            name='salary' 
                            type="number" 
                            value={role.salary} 
                            onChange={(e) => handleInputChange(e, idx)}
                        />
                    </label>
                    <label htmlFor="division">
                        Division
                        <select name="division">
                            <option value="Engineering">Engineering</option>
                            <option value="HR">HR</option>
                            <option value="Sales">Sales</option>
                            <option value="Finance">Finance</option>
                            <option value="Operations">Operations</option>
                            <option value="People">People</option>
                            <option value="Product">Product</option>
                            <option value="Data">Data</option>
                        </select>
                    </label>
                    <label htmlFor="location">
                        Location
                        <input 
                            name='location' 
                            type="text" 
                            value={role.location} 
                            onChange={(e) => handleInputChange(e, idx)}
                        />
                    </label>
                    <label htmlFor="experience">
                        Years of experience required
                        <input 
                            name='experience' 
                            type="text" 
                            value={role.experience} 
                            onChange={(e) => handleInputChange(e, idx)}
                        />
                    </label>
                    {idx > 0 && <button onClick={(e) => removeRole(e, idx)}>Remove</button>}
                </div>
            ))}

            {roles.length < 3 && <button onClick={addRole}>Add role</button>}
            <button onClick={nextStep}>Continue</button>
            <button onClick={prevStep}>Previous</button>
        </form>
    );
};

export default RoleDetails;