const fs = require("fs");

function fileExists(filename) {
	return fs.existsSync(filename);
}

function validNumber(value) {
	
		{ 
			// value can be string or numeric // returns a boolean 
		const number = parseFloat(value); // parseFloat is used to check if value can be converted into a finite number
		const isregexCheck = /^-?\d+(\.\d+)?$/.test(value); // Regex Check: '^-?\d+(\.\d+)?$' ensures the input has an optional - sign, followed by digits, with an optional decimal portion.
		return isregexCheck && !isNaN(number) && isFinite(number);
		
		} };
	  

	  
  



function dataDimensions(dataframe) {
	if (dataframe === undefined || dataframe === "" || dataframe.length === 0) {
		return [-1, -1];
	}
    const rows = dataframe.length;
    const cols = Array.isArray(dataframe[0]) ? dataframe[0].length : -1;
	return [rows, cols];
}

function findTotal(dataset) {
	// Check if dataset is not a 1D array or is empty
    if (dataDimensions(dataset)[1] !== -1 || dataset.length === 0) {
        return 0; 
    }
    
    let total = 0;
    for (let i = 0; i < dataset.length; i++) {
        if (validNumber(dataset[i])) {
            total += parseFloat(dataset[i]); 
        }
    }
    return total;
}


function calculateMean(dataset) {
	if (dataDimensions(dataset)[1] !==-1 || dataset.length ===0) {
		return 0;
	}
	let sum = 0;
	let count = 0;
	for (let i =0; i<dataset.length; i++) {
       if (validNumber(dataset[i])) {
		sum += parseFloat(dataset[i]);
		count ++;
	   }
	}
	return count >0 ? sum/count :0;
}

function calculateMedian(dataset) {
	if (dataDimensions(dataset)[1] !== -1 || dataset.length === 0) {
		return 0;
	}
	const validNumbers = dataset.filter(validNumber).map(Number).sort((a, b) => a - b);
	const mid = Math.floor(validNumbers.length / 2);
	return validNumbers.length % 2 === 0
		? (validNumbers[mid - 1] + validNumbers[mid]) / 2
		: validNumbers[mid];
}

function convertToNumber(dataframe, col) {
	let count = 0;
	
    if (dataframe === undefined || dataframe.length === 0) {
		return 0;
	}

	for (let i = 0; i < dataframe.length; i++) {
		
		if (dataframe[i][col] !== undefined && validNumber(dataframe[i][col])) {
			dataframe[i][col] = parseFloat(dataframe[i][col]);
			count++;
		}
	}
	return count;
}

function flatten(dataframe) {
	const dataset = dataframe.map((row) => Object.values(row)[0]);
	return dataset;
}
 const dataframe = [
	{ value: 1500 },
	{ value: 1750 },
	{ value: 1800 },
	{ value: 2000 },
];
const dataset = flatten(dataframe);
console.log(dataset);


function loadCSV(csvFile, ignoreRows=[], ignoreCols=[]) {
	if (!fileExists(csvFile)) {
        return [[], -1, -1];
    }

    const data = fs.readFileSync(csvFile, 'utf-8')
        .trim() // Remove any trailing newline
        .split('\n')
        .map(row => row.split(','));

    if (data.length === 0) {
        return [[], 0, 0];
    }

    const totalRows = data.length;
    const totalCols = data[0].length;

    const dataframe = data
        .filter((_, rowIndex) => !ignoreRows.includes(rowIndex))
        .map(row => row.filter((_, colIndex) => !ignoreCols.includes(colIndex)));

    return [dataframe, totalRows, totalCols];
}

function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {
	if (!Array.isArray(dataframe) || dataframe.length === 0 || columnIndex < 0) {
		return [];
	}
    const result =[];
	
	  for (const row of dataframe) {
	  if (!Array.isArray(row) || row.length <= columnIndex) continue;
	
    const cellValue = row[columnIndex];
       
 const matchesPattern= (pattern === '*' || String(cellValue) === String(pattern));

		if (matchesPattern) { 
		 const outputRow = exportColumns.length > 0 
			  ? exportColumns.map(colIndex => (row[colIndex] !== undefined ? row[colIndex] : null))
			  : row;
		  
			result.push(outputRow);
		  } 
		}  

		return result;
	}
		
			

module.exports = {
	fileExists,
	validNumber,
	dataDimensions,
	calculateMean,
	findTotal,
	convertToNumber,
	flatten,
	loadCSV,
	calculateMedian,
	createSlice,
};
