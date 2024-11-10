export default function buildfilter(req,res,next){
   const {status, prority, search } = req.query
   const filter = {}; // Define el filtro aquí como un objeto vacío

   if(status){
    filter.status = status
   };

   if(prority){
    filter.prority = prority
   };

    if(search){
        filter.$or = [
            {title: {$regex: search, $options: 'i'}}, // tiene expresion regular y la i es indistinto mayusculas o minusculas
            {description: {$regex: search, $options: 'i'}}
        ]
    };

    // vamos a pasar el filtro al objeto request
    req.filter = filter;
    next()
};