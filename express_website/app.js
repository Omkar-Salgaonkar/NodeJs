var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index',{title: 'Welcome'});
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth : {
			user : 'yourmail@gmail.com',
			pass : 'password'	
		}
	});
	
	var mailOptions = {
		from: 'Omkar Salgaonkar <salgaonkar.omkar58@gmail.com',
		to: 'salgaonkar.omkar58@gmail.com',
		subject: 'Website Submission',
		text: 'you have submission with following details... Name'+req.body.name+'Email '+req.body.email+'message'+req.body.message,
		html:'<p>you have submission with following details...</p><ul><li>Name '+req.body.name+'</li><li>Email '+req.body.email+'</li><li>message'+req.body.message+'</ul>',
	};
	
	transporter.sendMail(mailOptions,function(error,info){
	if(error){
		console.log(error);
		res.redirect('/');
		} else {
		console.log('message sent:'+info.response);
		res.redirect('/');
		}
	});
});


app.listen(3000);
console.log("server is running on port 3000");
