// module.exports.getDate = getDate;

// function getDate(){
//     let options={
//         weekday:'long',
//         day:'numeric',
//         month: 'long'
//     };
    
//     let today = new Date();
    
//     let day=today.toLocaleDateString("en-US",options);
    
//     return day;
// }

// module.exports.getDay = getDay;

// function getDay(){
//     let options={
//         weekday:'long'
//     };
    
//     let today = new Date();
    
//     let day=today.toLocaleDateString("en-US",options);
    
//     return day;
// }



//shorter version of the above code

exports.getDate = function(){
    const options={
        day:'numeric',
        month: 'long',
        year: 'numeric'
    };
    
    const today = new Date();
    
    return today.toLocaleDateString("en-US",options);
};

exports.getDay = function(){
    const options={
        weekday:'long'
    };
    
    const today = new Date();
    
    return today.toLocaleDateString("en-US",options);
};