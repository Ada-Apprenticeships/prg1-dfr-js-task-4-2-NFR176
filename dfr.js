const fs = require("fs");

function fileExists(filename) {
	return fs.existsSync(filename);
}

function validNumber(value) {
		{ 
			
		const number = parseFloat(value); 
		const isregexCheck = /^-?\d+(\.\d+)?$/.test(value); 
		return isregexCheck && !isNaN(number) && isFinite(number);
  
	} };
		
function dataDimensions(dataframe) {
	if (dataframe === undefined || dataframe === "" || dataframe.length === 0) {
		return [-1, -1];
	}
    const rows = dataframe.length;
    const columns = Array.isArray(dataframe[0]) ? dataframe[0].length : -1;
	return [rows, columns];
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
	return count >0 ? sum/count :0; // returns sum divided by count
}

function calculateMedian(dataset) {
	if (dataDimensions(dataset)[1] !== -1 || dataset.length === 0) {
		return 0;
	}
	const validNumbers = dataset.filter(validNumber).map(Number).sort((a, b) => a - b);
	const mid = Math.floor(validNumbers.length / 2);//note to self- math.floor rounds down and gives the largest int ≤ to a given num
	return validNumbers.length % 2 === 0
		? (validNumbers[mid - 1] + validNumbers[mid]) / 2
		: validNumbers[mid];
}

function convertToNumber(dataframe, col) {
	let count = 0;
	
    if (dataframe === undefined || dataframe.length === 0) {
		return 0; // if dataframe is undefined return 0 same for an empty array- the code will execute
	}

	for (let i = 0; i < dataframe.length; i++) {
		
		if (dataframe[i][col] !== undefined && validNumber(dataframe[i][col])) {
			dataframe[i][col] = parseFloat(dataframe[i][col]);//note to self=parsefloat checks if the inputed value can be turnt into a finite number
			count++;
		}
	}
	return count;
}

// note to self- so the flatten function goes through a 2d array and extracts its elements and puts into 1 main array//
function flatten(dataframe) {
	const dataset = dataframe.map((row) => Object.values(row)[0]);//will take the first element of each row and place into an array//
	return dataset;
}
 const dataframe = [ //chosen values in the README//
	{ value: 1500 },
	{ value: 1750 },
	{ value: 1800 },
	{ value: 2000 },
];
const dataset = flatten(dataframe); // the outcome would be a single array with these elements//
console.log(dataset);


function loadCSV(csvFile, ignoreRows=[], ignoreCols=[]) {
	if (!fileExists(csvFile)) {
        return [[], -1, -1];
    }

    const data = fs.readFileSync(csvFile, 'utf-8')
        .trim() //trims whitespace
        .split('\n')
        .map(row => row.split(','));//breaks eachline of the file into seperate values

    if (data.length === 0) {
        return [[], 0, 0];
    }

    const totalRows = data.length;
    const totalCols = data[0].length;

    const dataframe = data
        .filter((_, rowIndex) => !ignoreRows.includes(rowIndex)) // allows data to be selectively excluded e.g in this case specific rows and columns//
        .map(row => row.filter((_, colIndex) => !ignoreCols.includes(colIndex)));

    return [dataframe, totalRows, totalCols];
}

function createSlice(dataframe,columnIndex,pattern, exportedColumns = []) {
   if (!Array.isArray(dataframe) || dataframe.length === 0 || columnIndex <0) {
	return [];
   }
	const result = [];

	for (const row of dataframe) {
	if (!Array.isArray(row) || row.length <= columnIndex) continue;

    const cellValue = row[columnIndex];
       
 const matchesPattern= (pattern === '*' || String(cellValue) === String(pattern));

		if (matchesPattern) { 
		 const RowOutput = exportedColumns.length > 0 
			  ? exportedColumns.map(colIndex => (row[colIndex] !== undefined ? row[colIndex] : null))
			  : row;
		  
			result.push(RowOutput);
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
