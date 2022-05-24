const express = require('express');

const app = express();
const PORT = 4001;

app.set ('view engine', 'hbs')

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.get ('/', function (req, res) {
    res.render('index')
})

app.get ('/contact', function (req, res) {
    res.render('contact')
})

app.get ('/addMyProject', function (req, res) {
    res.render('addMyProject')
})

app.post ('/addMyProject', function (req, res) {
    const data = req.body;
    console.log(data)
    res.redirect('/addMyProject')
})

app.get ('/myProject-Detail', function (req, res) {
    res.render('myProject-Detail')
})



app.listen(PORT, function() {
    console.log(`Server running on PORT: ${PORT}`);
});

