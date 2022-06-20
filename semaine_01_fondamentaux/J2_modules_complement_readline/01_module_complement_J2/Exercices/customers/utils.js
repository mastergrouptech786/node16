export function priceTTC({priceHT, tva, precision}){
    
    return Math.floor( priceHT*(1 + tva)  * precision ) / precision ; 
}