const fs = require('fs');

function readJSONFile() {
    const jsonInputFile = fs.readFileSync('input.json', 'utf8');
    return JSON.parse(jsonInputFile);
}

function writeJSONFile(data) {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync('output.json', jsonData, 'utf8');
}

function shiftHexValue(hexValue, shiftValue) {
    const hexVal = parseInt(hexValue, 16);
    let shiftedHexVal = hexVal - shiftValue;
    shiftHexVal = shiftedHexVal < 0 ? 0 : shiftedHexVal;
    return shiftHexVal.toString(16).padStart(2, '0').toUpperCase();
}

function darkenHexValues(data, shiftValue = 30) {
    const outputData = data.map((hexValue) => {
        const hexVal1 = shiftHexValue(hexValue.substring(1, 3), shiftValue);
        const hexVal2 = shiftHexValue(hexValue.substring(3, 5), shiftValue);
        const hexVal3 = shiftHexValue(hexValue.substring(5, 7), shiftValue);
        return "#" + hexVal1 + hexVal2 + hexVal3;
    });
    return outputData;
}

function main() {
    const inputData = readJSONFile();
    console.log("The input data is: ", inputData);
    const shiftValueInsertFlag = process.argv[2];
    let shiftValue = 30;
    if (shiftValueInsertFlag === "--shiftValue") { 
        shiftValue = parseInt(process.argv[3]);
    }
    console.log("The shift value is: ", shiftValue);
    const outputData = darkenHexValues(inputData, shiftValue);
    console.log("The output data is: ", outputData);
    writeJSONFile(outputData);
}

main();