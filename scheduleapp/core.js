//SETUP ============================================

//Dependencies
var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var Task       = require('./models/task');

//setup bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect to mongoose
mongoose.connect('mongodb://Smolitor:Mollytor15243@ds129394.mlab.com:29394/schedule-app');

//Declare us a port
var port = process.env.PORT || 1022;

//Declare router object
var router = express.Router();

//MIDDLEWARE ======================================

router.use(function(req, res, next){
	
	console.log('IT BE GOING DOWN');
	next();
});

//ROUTES ==========================================

router.route('/tasks')
	.post(function(req, res){
		//
		var task = new Task();
		task.title = req.body.title;
		task.date.day = req.body.day;
		task.date.month= req.body.month;
		task.date.year= req.body.year;
		task.description = req.body.description;
		
		task.save(function(err){
			if (err)
				res.send(err);
			
			res.json({message:'Successful creation'});
		});
	}).get(function(req, res){
		Task.find(function(err, tasks){
			if (err)
				res.send(err);
			
			res.json(tasks);
		});
	});
router.route('/tasks/:task_id')
	.get(function(req, res){
		Task.findById(req.params.task_id, function(err, task){
			if (err)
				res.send(err);
			
			res.json(task);
		});
	}).put(function(req, res){
		Task.findById(req.params.task_id, function(err, task){
			if (err)
				res.send(err);
			
			task.title = req.body.title;
			task.date.day = req.body.day;
			task.date.month= req.body.month;
			task.date.year= req.body.year;
			task.description = req.body.description;
			
			task.save(function(err){
				if (err)
					res.send(err);
				
				res.json({message: 'Task Updated'});
			});
		});
	}).delete(function(req, res){
		Task.remove({
			_id: req.params.task_id
		}, function(err, task){
			if (err)
				res.send(err);
			
			res.json({message: 'Delete successful'});
		});
	});









app.use('/api', router);

//RUN SERVER ======================================
app.listen(port);
console.log("It's Lit");