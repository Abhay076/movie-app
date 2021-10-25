 //for practice 
function getCurryFunction(f){
    return function(a){
        return function(b){
            return function(c){
                return f(a,b,c);
            }
        }
    }
}
function sum(a,b,c){
    return a+b+c;
}
var CurriedSum=getCurryFunction(sum);
console.log(CurriedSum(1)(2)(3));