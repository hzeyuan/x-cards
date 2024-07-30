import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditableButton = ({ text }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);
  const inputRef = useRef(null);

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setIsEditing(false);
      // 在这里可以添加保存或提交的逻辑
      console.log('Submitted:', value);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="relative inline-block">
      {isEditing ? (
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="pr-20"
        />
      ) : (
        <Button size="sm" onClick={handleClick} variant="outline">
          {value}
        </Button>
      )}
      {isEditing && (
        <Button
          onClick={handleClick}
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
          size="sm"
        >
          保存
        </Button>
      )}
    </div>
  );
};

export default EditableButton;