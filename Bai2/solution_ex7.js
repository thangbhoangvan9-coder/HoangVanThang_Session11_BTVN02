const validateDevice = (newDev) => {
    if (
        newDev.name === undefined ||
        newDev.name.trim() === ""
    ) {
        return false;
    }

    if (
        newDev.roomName === undefined ||
        newDev.roomName.trim() === ""
    ) {
        return false;
    }

    if (
        newDev.powerWatts === undefined ||
        newDev.powerWatts <= 0
    ) {
        return false;
    }

    return true;
};


const createDevice = (list, newDev) => {
    if (!validateDevice(newDev)) {
        return false;
    }

    const newId = "DEV_" + String(list.length + 1).padStart(3, "0");

    const device = {
        id: newId,
        name: newDev.name,
        roomName: newDev.roomName,
        powerWatts: newDev.powerWatts,
        isActive: newDev.isActive
    };

    list.push(device);

    return device;
};


const readDevicesByRoom = (list, roomName) => {
    const result = [];

    for (const device of list) {
        if (device.roomName === roomName) {
            result.push(device);
        }
    }

    return result;
};

const updateDevice = (list, id, updateData) => {
    let targetDevice = null;

    for (const device of list) {
        if (device.id === id) {
            targetDevice = device;
            break;
        }
    }

    if (targetDevice === null) {
        return false;
    }

    if (updateData.name !== undefined) {
        targetDevice.name = updateData.name;
    }

    if (updateData.roomName !== undefined) {
        targetDevice.roomName = updateData.roomName;
    }

    if (updateData.powerWatts !== undefined) {
        targetDevice.powerWatts = updateData.powerWatts;
    }

    if (updateData.isActive !== undefined) {
        targetDevice.isActive = updateData.isActive;
    }

    return true;
};

const deleteDevice = (list, id) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            list.splice(i, 1);
            return true;
        }
    }

    return false;
};

const devices = [
    {
        id: "DEV_001",
        name: "Điều hòa",
        roomName: "Phòng khách",
        powerWatts: 1500,
        isActive: true
    },
    {
        id: "DEV_002",
        name: "Đèn ngủ",
        roomName: "Phòng ngủ",
        powerWatts: 60,
        isActive: true
    },
    {
        id: "DEV_003",
        name: "Tivi",
        roomName: "Phòng khách",
        powerWatts: 120,
        isActive: false
    }
];

const createdDevice = createDevice(devices, {
    name: "Quạt",
    roomName: "Phòng khách",
    powerWatts: 75,
    isActive: true
});

console.log("1. CREATE");
console.log(createdDevice);

const livingRoomDevices = readDevicesByRoom(
    devices,
    "Phòng khách"
);

console.log("\n2. READ - THIẾT BỊ PHÒNG KHÁCH");
console.log(livingRoomDevices);

const updateResult = updateDevice(
    devices,
    "DEV_002",
    {
        isActive: false,
        powerWatts: 0
    }
);

console.log("\n3. UPDATE");
console.log("Kết quả:", updateResult);
console.log(devices);


const deleteResult = deleteDevice(
    devices,
    "DEV_003"
);

console.log("\n4. DELETE");
console.log("Kết quả:", deleteResult);
console.log(devices);


const deleteFail = deleteDevice(
    devices,
    "DEV_999"
);

console.log("\n5. DELETE ID KHÔNG TỒN TẠI");
console.log("Kết quả:", deleteFail);

