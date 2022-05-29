const express = require('express');

const app = express();
const PORT = 4001;
const projects = [];
app.set ('view engine', 'hbs')

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.get ('/', function (req, res) {
    console.log(projects);
    const newProject = projects.map(function(project){
        project.time = getFullTime(project.postedAt);
        return project
    })


    res.render('index', {projects:newProject})
})

app.get ('/contact', function (req, res) {
    res.render('contact')
})

app.get ('/addMyProject', function (req, res) {
    res.render('addMyProject')
})

app.post ('/addMyProject', function (req, res) {
    const data = req.body;
    data.postedAt = new Date()
    data.duration = difference(data["StartDate"],data["EndDate"])
    projects.push(data);
    res.redirect('/')
})

app.get ('/myProject-Detail/:index', function (req, res) {
    const index = req.params.index;
    const project = projects[index];
    
    res.render('myProject-Detail', {data: index, project });
})

app.get ('/delete-project/:index', function (req, res){
    const index = req.params.index;
    projects.splice(index, 1);

    res.redirect('/')
})

app.get ('/updateMyProject/:index',function (req, res) {
    const index = req.params.index;
    const update = projects[index];

    res.render('updateMyProject',{data:index,update})
})

app.post ('/updateMyProject/:index', function (req, res) {
  const data = req.body;
  const index = req.params.index;

  data.postedAt = new Date();
  update.time = getFullTime(update.postedAt);
  data.duration = difference(data["StartDate"],data["EndDate"]);
 
  projects[index]=data;

  res.redirect('/')
})

const month = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  function getFullTime(time) {
   time = new Date()
    const date = time.getDate();
    const monthIndex = time.getMonth();
    const year = time.getFullYear();
    let hour = time.getHours();
    let minute = time.getMinutes();
  
  
    if (hour < 10) {
      hour = '0' + hour;
    }
  
    if (minute < 10) {
      minute = '0' + minute;
    }
  
    const fullTime = `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB`;
  
    return fullTime;
  }

  function difference (start, end){
    start = new Date (start);
    end = new Date (end)
    const dateStart = Date.UTC (start.getFullYear(), start.getMonth(), start.getDate());
    const dateEnd = Date.UTC (end.getFullYear(), end.getMonth(), end.getDate());
     milisecondsInDay = 1000 * 60 * 60 * 24;
     date = (dateEnd - dateStart)/milisecondsInDay ;
    return  date<30 ? date + " hari" : parseInt(date/30) + " bulan"
  }
  
app.listen(PORT, function() {
    console.log(`Server running on PORT: ${PORT}`);
});

