export const bitStrToOptions = (bitStr: string) => {
  if (bitStr.length != 5) {
    return "";
  }
  let res = "";
  let havePrev = false;
  if (bitStr[0] == "1") {
    res += "Mask Address";
    havePrev = true;
  }
  if (bitStr[1] == "1") {
    res += havePrev ? ", Volume Serial" : "Volume Serial";
    havePrev = true;
  }
  if (bitStr[2] == "1") {
    res += havePrev ? ", CPU Id" : "CPU Id";
    havePrev = true;
  }
  if (bitStr[3] == "1") {
    res += havePrev ? ", BIOS Activate Date" : "BIOS Activate Date";
    havePrev = true;
  }
  if (bitStr[4] == "1") {
    res += havePrev ? ", Device Name" : "Device Name";
    havePrev = true;
  }
  if (bitStr === "00000") {
    res = "No option";
  }
  return res;
};
