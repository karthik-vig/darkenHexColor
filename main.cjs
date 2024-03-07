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

function darkenHexValues(data) {
    const outputData = data.map((hexValue) => {
        const hexVal1 = shiftHexValue(hexValue.substring(1, 3), 30);
        const hexVal2 = shiftHexValue(hexValue.substring(3, 5), 30);
        const hexVal3 = shiftHexValue(hexValue.substring(5, 7), 30);
        return "#" + hexVal1 + hexVal2 + hexVal3;
    });
    return outputData;
}

function main() {
    const inputData = readJSONFile();
    console.log("The input data is: ", inputData);
    const outputData = darkenHexValues(inputData);
    console.log("The output data is: ", outputData);
    writeJSONFile(outputData);
}

main();