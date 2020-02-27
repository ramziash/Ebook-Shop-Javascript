//check if we are in a production envirnomnet or not. then we will load a different JS file. 

if(process.env.NODE_ENV ==='production') {
    module.exports=require('./keys_prod');
}else{
    module.exports=require('./keys_dev');
}