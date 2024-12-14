export const deleteKeyIfEmptyorNull = (payload: any) => {
    Object.keys(payload).forEach((key) => {
      if (
        payload[key] === "" ||
        (payload[key] && payload[key].toString().toLowerCase() === "null") ||
        payload[key] == undefined
      ) {
      delete payload[key];
      }
    });
    return payload;
  };