/**
 * React Imports
 */
import React, { useState } from "react";
import { Dropdown } from "rsuite";

/**
 * Customized dropdown
 * @param {Object} props
 */
const CustomDropdown = (props) => {
  const [activeKey, setActiveKey] = useState();
  return (
    <Dropdown
      onSelect={(key) => {
        setActiveKey(key);
        props.onSelect(parseInt(key));
      }}
      title="Select Type"
      trigger="click"
    >
      {props.items.map((item) => {
        return (
          <Dropdown.Item
            eventKey={item.key.toString()}
            active={activeKey === item.key.toString()}
            key={item.key}
          >
            {item.name}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};

export default CustomDropdown;
