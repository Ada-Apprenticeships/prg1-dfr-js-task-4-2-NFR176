const fs = require("fs");

function fileExists(filename) {
  return fs.existsSync(filename);
}

function validNumber(value) {

}
  
function dataDimensions(dataframe) {
  const rows=dataframe.length;
  const columns = dataframe[0] ? Object.keys(dataframe[0]).length :0;

  return [rows,columns];
}

const salesData =  [


];


function findTotal(dataset) {
  if (Array.isArray(dataset) && dataset.every(Array.isArray)) {
    return 0; // Return 0 for 2D arrays
  }

  // Use reduce to sum up numeric values, ignoring non-numeric values
  return dataset.reduce((total, value) => {
    // Check if the value is a number
    return total + (isNaN(value) ? 0 : Number(value));
  }, 0);
}




function calculateMean(dataset) {
  if (!Array.isArray(dataset)) return 0;

  const validNumbers=dataset
  .flat()
 .map(item => Number(item))
 .filter(item => !isNaN(item))

 const sum=validNumbers.reduce((acc, curr) => acc +curr, 0);
  
 return validNumbers.length > 0 ? sum / validNumbers.length : 0;
}

function calculateMedian(dataset) {
   
    const numericData = dataset.filter(value => !isNaN(value)).map(Number);
  
    if (numericData.length === 0) {
      return null; 
    }
    
   numericData.sort((a, b) => a - b);
    
    const middleIndex = Math.floor(numericData.length / 2);
  
    
    if (numericData.length % 2 === 0) {
   
      return (numericData[middleIndex - 1] + numericData[middleIndex]) / 2;
    } else {
     
      return numericData[middleIndex];
    }
  }
  


  






function convertToNumber(dataframe, col) {

}

function flatten(dataframe) {

const dataset = dataframe.map(row => Object.values(row)[0]);
return dataset; 

}
const dataframe = [
  { value: 1500 },
  { value: 1750 },
  { value: 1800 },
  { value: 2000 }
];
const dataset = flatten(dataframe);
console.log(dataset);


function loadCSV(csvFile, ignoreRows, ignoreCols) {

}


function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {

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
}