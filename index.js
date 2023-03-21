const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI).then((res, rej) => {
	if (res.connections.length > 0) {
		const { name, port } = res.connections[0];
		console.log(`Successfully connected to db ${name} on port ${port}`);
	}
	if (rej) console.log("Something went wrong")
})

const Schema = mongoose.Schema;
const userSchema = new Schema(
	{
		username: {
			type: String, 
			required: true, 
			unique: true
		},
	},
	{
		versionKey: false
	}
)
const exerciseSchema = new Schema(
	{
		username: String,
		description: String,
		duration: Number,
		date: String,
		userId: String,
	},
	{
		versionKey: false
	}
)

const User = mongoose.model('User', userSchema)
const Exercise = mongoose.model('Exercise', exerciseSchema)

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

// GET to /
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// GET to /api/users
app.get('/api/users', async (req, res) => {
	const users = await User.find();
	res.send(users);
});

//GET to /api/users/:_id/logs
// Add from, to and limit parameters to a GET /api/users/:_id/logs
app.get('/api/users/:_id/logs/', async (req, res) =>{
	let foundUser;
	let filter = {}
	let dateFilter = {}
	const userId = req.params["_id"];
	let {from, to , limit} = req.query;
	// "from" and "to" are dates in yyyy-mm-dd format. 
	// "limit" is an integer of how many logs to send back. 
	dateFilter['$gte'] = from ? new Date(from) : null;
	dateFilter['$lte'] = to ? new Date(to) : null;

	if (from || to)
		filter.dateFilter = dateFilter; 

	if (!limit)
		limit = 100;
	try {
		foundUser = await User.findById(userId);
		if (!foundUser) return res.json({"error": "User Not found"});
	} catch(err) {
		res.json({"error" : err.message});
	}
	
	const exercises = await Exercise
		.find({userId: userId})
		.limit(limit)
		.then((data) => {
			return data.map(exercise => {
				return {
					description: exercise.description,
					duration: exercise.duration,
					date: exercise.date,
				};
			})
		})
	res.json({
		username: foundUser.username,
		count: exercises.length,
		_id: userId,
		log: exercises
	})
})

// POST to /api/users
app.post('/api/users', async (req, res) => {
	console.log("Got a post request")
	const username = req.body.username;
	const foundUser = await User.findOne({ username: username});
	
	if (foundUser) return res.json({"error": "User already registered: " + foundUser.username +" "+ foundUser["_id"]})
	else{
		const user = await User.create({username})
		res.json(user);
	}
});

// POST to /api/users/:_id/exercises
app.post('/api/users/:_id/exercises', async (req, res) => {
	let { description, duration, date } = req.body;
	const _id = req.body[":_id"];
	const foundUser = await User.findById(_id)

	if (!foundUser) return res.json({"error": "No User exists for that ID."})

	try {
		const exercise = await Exercise.create({
			username: foundUser.username,
			description: description,
			duration: duration,
			date:  date ? new Date(date).toDateString() : new Date(Date.now()).toDateString() ,
			userId: _id,
		}).then((exercise) => {
			console.log(exercise)
			res.json({
				_id: foundUser["_id"],
				username: foundUser.username,
				date: exercise.date,
				duration: exercise.duration,
				description: exercise.description,
			})
		})	
	} catch (error) {
		res.json({
			"message" : "Something went wrong",
			errors : error
	})
	}
	
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
