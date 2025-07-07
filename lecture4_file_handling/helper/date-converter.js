

function formatDate(date){
  let formatedDate = new Date().toISOString();
  return formatedDate;
}

function dateConvrter(date){
  let newDate = new Date().toLocaleTimeString();
  return newDate;
}
// module.exports = formatDate // when only 1 function or variable returns
module.exports = {formatDate,dateConvrter} // multipe functions 
// and variable returns