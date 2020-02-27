const express = require ('express');
const keys=require('./config/keys')
const stripe = require ('stripe') (keys.stripeSecretKey);
const bodyParser = require ('body-parser');
const exphbs = require ('express-handlebars'); 

const app = express();

// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')


//Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


// set static folder (to put images)
app.use(express.static(`${__dirname}/public`))


// Index page/ created in views folder
app.get('/', (req,res) => {
    res.render('index', {
        stripePublishableKey: keys.stripePublishableKey //this is amended in index.handlebars
    })
})

// to check if the success page actually runs. 
// app.get('/success', (req,res) => {
//     res.render('success')
// })

//charge route
app.post('/charge', (req,res) => {  // res returns 3 things, you can check them in the console.log(req.body) to fill the details
    const amount = 2500

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Web Development Ebook',
        currency: 'USD',
        customer: customer.id
    }))
    .then(charge => res.render('success'))  // now we have to create a new page with the success message. 
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})
