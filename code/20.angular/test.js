
function person(){
    var gift = [];
    this.push = function(n){
        gift.push(n);
        console.log(gift);
    }
}

var p = new person();
p.push('flower');
console.log(p.gift);