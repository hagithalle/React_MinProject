import { useState } from "react";

export default function OtherDataComp(props) {
  const { user, updateAddress } = props;
  const [street, setStreet] = useState(user.address?.street || "");
  const [city, setCity] = useState(user.address?.city || "");
  const [zipcode, setZipcode] = useState(user.address?.zipcode || "");

  // Function to handle changes and pass the updated address back to UserComp
  function handleAddressChange() {
    const newAddress = { street, city, zipcode };
    updateAddress(newAddress); // Pass the new address up to the parent
  }

  return (
    <div className="otherData" style={{ cursor: "pointer" }}>
      <div className="input-container">
        <label>Street:</label>
        <input
          type="text"
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
            handleAddressChange(); // Call the handler whenever input changes
          }}
        />
      </div>
      <div className="input-container">
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            handleAddressChange(); // Call the handler whenever input changes
          }}
        />
      </div>
      <div className="input-container">
        <label>Zip Code:</label>
        <input
          type="text"
          value={zipcode}
          onChange={(e) => {
            setZipcode(e.target.value);
            handleAddressChange(); // Call the handler whenever input changes
          }}
        />
      </div>
    </div>
  );
}