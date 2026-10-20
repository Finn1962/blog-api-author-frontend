import { useState } from "react";

function useFormChanges() {
  const [initialValues, setInitialValues] = useState({});

  function addInitialValues(obj) {
    setInitialValues(obj);
  }

  function addInitialValue(key, value) {
    setInitialValues((prev) => ({ ...prev, [key]: value }));
  }

  function removeInitialValue(key) {
    setInitialValues((prev) => {
      const { [key]: _, ...rest } = prev; // eslint-disable-line
      return rest;
    });
  }

  function hasChanged(obj) {
    let hasChanged = false;
    for (const key of Object.keys(obj)) {
      if (initialValues[key] !== obj[key]) {
        hasChanged = true;
        break;
      }
    }
    return hasChanged;
  }

  return {
    addInitialValues,
    addInitialValue,
    removeInitialValue,
    hasChanged,
  };
}

export { useFormChanges };
