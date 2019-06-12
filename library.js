"use strict";

((window) =>{

    function myLibrary(){

      
        let catalog = createRandomCatalog(100);


        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }
    

        function searchProductsByType(type){

            let promise = new Promise((resolve,reject) => {
                let i = 0;
                let typeArray = [];
                let possibleTypes = ['Electronics','Book','Clothing','Food'];
                if(!possibleTypes.includes(type)){
                    reject("Invalid Type: " + type)
                }
                else{
                    setTimeout(() => {
                        while (i < catalog.length){
                            if (catalog[i].type == type){
                                typeArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});
                            }
                            i++;
                        }
                        resolve(typeArray);
                    },1000);
                }
            });
            return promise;
        }




        function searchProductsByPrice(price, difference) {
            let promise = new Promise((resolve,reject) => { 
                let i = 0;
                let priceArray = [];
                if(!isFinite(price)){
                    reject("Invalid Price: " + price)
                }
                else{
                    setTimeout(() => {
                        while (i < catalog.length){
                            if (Math.abs(catalog[i].price - price) < difference){
                                priceArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});

                            }
                            i++;
                        }
                        resolve(priceArray);

                    },1000);
                }
            });
            return promise;
        }



        function searchProductById(id){
        
            let promise = new Promise((resolve,reject) => {
                let i = 0;
                setTimeout(function(){
                    while (i < catalog.length){
                        if (catalog[i].id == id){                        
                            resolve({id:id,price:catalog[i].price,type:catalog[i].type});
                        }
                        i++;
                    }
                    reject("Invalid ID: " + id);
                },1000);
            });
            return promise;
        }










        function searchAllProducts(){
            let promise = new Promise((resolve, reject) => {

                setTimeout(() => {
                    resolve(catalog);
                },1000);
            });
            return promise;
        }


        function createRandomProduct(){
            let typeArray = ['Electronics','Book','Clothing','Food'];
            let price = (Math.random()*500).toFixed(2) ;
            let type = typeArray[Math.floor(Math.random()*4)];
            let valid = Math.random() > .5 ? true : false;
            return {price:price, type:type};
        }

        function createRandomCatalog(num){
            let catalog = [];
            for (let i = 0; i < num; i++){
                let obj = createRandomProduct();
                catalog.push({id:i,price:obj.price,type:obj.type});
            }
            return catalog;
        }
    }


    if(typeof(window.api) === 'undefined'){
        window.api = myLibrary();
    }

})(window); 

