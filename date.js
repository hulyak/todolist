// jshint esversion:6

exports.getDate = function (){

  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  
  return today.toLocaleDateString("en-US", options);
  
};
// https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date

exports.getDay = function(){

  const today = new Date();
  const options = {
    weekday: "long"
  };
  
  return today.toLocaleDateString("en-US", options);
};

console.log(module.exports);