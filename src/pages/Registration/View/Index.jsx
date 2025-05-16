import React, { useState, useEffect } from "react";

// Styles object at the top of your file (outside the component)
const styles = {
  registrationContainer: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  formPaper: {
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '24px',
  },
  formTitle: {
    color: '#0047AB',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    paddingBottom: '8px',
    borderBottom: '1px solid #eee',
  },
  formSection: {
    marginBottom: '24px',
    paddingBottom: '8px',
  },
  sectionTitle: {
    color: '#0047AB',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
    paddingTop: '8px',
    borderTop: '1px solid #eee',
  },
  formField: {
    marginBottom: '16px',
  },
  formRow: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -8px',
  },
  halfWidth: {
    flex: '0 0 calc(50% - 16px)',
    margin: '0 8px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '6px',
    color: '#333',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  phoneInput: {
    display: 'flex',
    alignItems: 'center',
  },
  countryCode: {
    backgroundColor: '#f5f5f5',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRight: 'none',
    borderRadius: '4px 0 0 4px',
    fontSize: '14px',
    color: '#333',
  },
  phoneInputField: {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
  },
  helperText: {
    fontSize: '12px',
    color: '#666',
    marginTop: '4px',
  },
  errorText: {
    color: '#d32f2f',
  },
  formActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },
  btn: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  btnPrimary: {
    backgroundColor: '#0047AB',
    color: 'white',
  },
  btnSecondary: {
    backgroundColor: 'white',
    color: '#0047AB',
    border: '1px solid #0047AB',
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
};

// Media query handler for responsive design
const useResponsiveStyles = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;
  const isSmallScreen = windowWidth <= 480;
  
  return { isMobile, isSmallScreen };
};

const RegistrationForm = () => {
  const { isMobile, isSmallScreen } = useResponsiveStyles();
  
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    cashbackPhone: '',
    kraPin: '',
    buildingName: '',
    floorNumber: '',
    roomNumber: '',
    streetName: '',
    areaName: 'Westlands (KE)',
    city: '',
    country: 'Kenya',
    salesAgent: 'Vijay Kumar',
    userType: 'Company'
  });
  
  // Errors state
  const [errors, setErrors] = useState({});
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form data
    console.log('Form submitted:', formData);
    alert('Registration successful!');
  };
  
  return (
    <div style={styles.registrationContainer}>
      <div style={styles.formPaper}>
        <h1 style={styles.formTitle}>Create New Customer</h1>
        
        <form onSubmit={handleSubmit}>
          {/* ACCOUNT INFORMATION SECTION */}
          <div style={styles.formSection}>
            <h2 style={{...styles.sectionTitle, borderTop: 'none', paddingTop: 0}}>Account Information</h2>
            
            {/* Company/Individual Name */}
            <div style={styles.formField}>
              <label style={styles.label} htmlFor="companyName">Company/Individual Name</label>
              <div style={styles.inputWrapper}>
                <input 
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Company/Individual Name"
                  style={{
                    ...styles.input,
                    ...(errors.companyName ? styles.inputError : {})
                  }}
                />
              </div>
              <div style={{
                ...styles.helperText,
                ...(errors.companyName ? styles.errorText : {})
              }}>
                {errors.companyName || "Please note: Your invoice will be generated in this name"}
              </div>
            </div>
            
            {/* Contact Person */}
            <div style={styles.formField}>
              <label style={styles.label} htmlFor="contactPerson">Contact Person</label>
              <div style={styles.inputWrapper}>
                <input 
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  type="text"
                  placeholder="Contact Person"
                  style={styles.input}
                />
              </div>
            </div>
            
            {/* Email and Phone in a row */}
            <div style={{...styles.formRow, flexDirection: isMobile ? 'column' : 'row'}}>
              {/* Email */}
              <div style={isMobile ? styles.formField : {...styles.formField, ...styles.halfWidth}}>
                <label style={styles.label} htmlFor="email">Email</label>
                <div style={styles.inputWrapper}>
                  <input 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    style={{
                      ...styles.input,
                      ...(errors.email ? styles.inputError : {})
                    }}
                  />
                </div>
                <div style={{
                  ...styles.helperText,
                  ...(errors.email ? styles.errorText : {})
                }}>
                  {errors.email || ""}
                </div>
              </div>
              
              {/* Phone Number */}
              <div style={isMobile ? styles.formField : {...styles.formField, ...styles.halfWidth}}>
                <label style={styles.label} htmlFor="phoneNumber">Phone Number</label>
                <div style={styles.phoneInput}>
                  <div style={styles.countryCode}>+254</div>
                  <input 
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Phone Number"
                    style={{
                      ...styles.input,
                      ...styles.phoneInputField,
                      ...(errors.phoneNumber ? styles.inputError : {})
                    }}
                  />
                </div>
                <div style={{
                  ...styles.helperText,
                  ...(errors.phoneNumber ? styles.errorText : {})
                }}>
                  {errors.phoneNumber || ""}
                </div>
              </div>
            </div>
            
            {/* Cashback Phone */}
            <div style={styles.formField}>
              <label style={styles.label} htmlFor="cashbackPhone">Cashback Phone Number</label>
              <div style={styles.phoneInput}>
                <div style={styles.countryCode}>+254</div>
                <input 
                  id="cashbackPhone"
                  name="cashbackPhone"
                  value={formData.cashbackPhone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Cashback Phone Number"
                  style={{
                    ...styles.input,
                    ...styles.phoneInputField
                  }}
                />
              </div>
              <div style={styles.helperText}>
                Phone number to receive cashback notifications
              </div>
            </div>
            
            {/* KRA PIN */}
            <div style={styles.formField}>
              <label style={styles.label} htmlFor="kraPin">KRA PIN</label>
              <div style={styles.inputWrapper}>
                <input 
                  id="kraPin"
                  name="kraPin"
                  value={formData.kraPin}
                  onChange={handleChange}
                  type="text"
                  placeholder="KRA PIN"
                  style={styles.input}
                />
              </div>
            </div>
          </div>
          
          {/* ADDRESS INFORMATION SECTION */}
          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Address Information</h2>
            
            {/* Building Name */}
            <div style={styles.formField}>
              <label style={styles.label} htmlFor="buildingName">Building Name</label>
              <div style={styles.inputWrapper}>
                <input 
                  id="buildingName"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Building Name"
                  style={styles.input}
                />
              </div>
            </div>
            
            {/* Floor and Room in a row */}
            <div style={{...styles.formRow, flexDirection: isMobile ? 'column' : 'row'}}>
              {/* Floor Number */}
              <div style={isMobile ? styles.formField : {...styles.formField, ...styles.halfWidth}}>
                <label style={styles.label} htmlFor="floorNumber">Floor Number</label>
                <div style={styles.inputWrapper}>
                  <input 
                    id="floorNumber"
                    name="floorNumber"
                    value={formData.floorNumber}
                    onChange={handleChange}
                    type="text"
                    placeholder="Floor Number"
                    style={styles.input}
                  />
                </div>
              </div>
              
              {/* Room Number */}
              <div style={isMobile ? styles.formField : {...styles.formField, ...styles.halfWidth}}>
                <label style={styles.label} htmlFor="roomNumber">Room Number</label>
                <div style={styles.inputWrapper}>
                  <input 
                    id="roomNumber"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    type="text"
                    placeholder="Room Number"
                    style={styles.input}
                  />
                </div>
              </div>
            </div>
            
            {/* Street Name */}
            <div style={styles.formField}>
              <label style={styles.label} htmlFor="streetName">Street Name</label>
              <div style={styles.inputWrapper}>
                <input 
                  id="streetName"
                  name="streetName"
                  value={formData.streetName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Street Name"
                  style={styles.input}
                />
              </div>
            </div>
            
            {/* Area, City, Country in rows */}
            <div style={{...styles.formRow, flexDirection: isMobile ? 'column' : 'row'}}>
              {/* Area Name */}
              <div style={isMobile ? styles.formField : {...styles.formField, ...styles.halfWidth}}>
                <label style={styles.label} htmlFor="areaName">Area</label>
                <div style={styles.inputWrapper}>
                  <select
                    id="areaName"
                    name="areaName"
                    value={formData.areaName}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="Westlands (KE)">Westlands (KE)</option>
                    <option value="Nairobi CBD">Nairobi CBD</option>
                    <option value="Kilimani">Kilimani</option>
                    <option value="Lavington">Lavington</option>
                  </select>
                </div>
              </div>
              
              {/* City */}
              <div style={isMobile ? styles.formField : {...styles.formField, ...styles.halfWidth}}>
                <label style={styles.label} htmlFor="city">City</label>
                <div style={styles.inputWrapper}>
                  <input 
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text"
                    placeholder="City"
                    style={styles.input}
                  />
                </div>
              </div>
            </div>
            
            {/* Country */}
            <div style={styles.formField}>
              <label style={styles.label} htmlFor="country">Country</label>
              <div style={styles.inputWrapper}>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* ADDITIONAL INFORMATION SECTION */}
          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Additional Information</h2>
            
            {/* Sales Agent */}
            <div style={styles.formField}>
              <label style={styles.label} htmlFor="salesAgent">Sales Agent</label>
              <div style={styles.inputWrapper}>
                <select
                  id="salesAgent"
                  name="salesAgent"
                  value={formData.salesAgent}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Vijay Kumar">Vijay Kumar</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>
            </div>
            
            {/* User Type */}
            <div style={styles.formField}>
              <label style={styles.label}>User Type</label>
              <div style={{display: 'flex', gap: '16px'}}>
                <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                  <input
                    type="radio"
                    name="userType"
                    value="Company"
                    checked={formData.userType === 'Company'}
                    onChange={handleChange}
                    style={{marginRight: '8px'}}
                  />
                  Company
                </label>
                <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                  <input
                    type="radio"
                    name="userType"
                    value="Individual"
                    checked={formData.userType === 'Individual'}
                    onChange={handleChange}
                    style={{marginRight: '8px'}}
                  />
                  Individual
                </label>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div style={styles.formActions}>
            <button 
              type="submit" 
              style={{...styles.btn, ...styles.btnPrimary}}
            >
              Register
            </button>
            <button 
              type="button" 
              style={{...styles.btn, ...styles.btnSecondary}}
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;