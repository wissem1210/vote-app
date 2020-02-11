import { Router } from 'express';

const User = require('../core/models/user');
const Question = require('../core/models/question');

const router = new Router()

//posting user data to database
router.post('/user/signup', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    }).save((err, response) => {
        if (err) res.status(400).send(err)
        res.status(200).send(response)
    })
})


router.post('/user/signin', (req, res) => {
    User.findOne({ 'email': req.body.email, 'password': req.body.password }, (err, user) => {
        if (!user) res.json({ message: 'Login failed, user not found' })
            //if email is present then compare password
            //else if (req.body.password !== user.password) res.json({ message: 'Wrong password' })
            /*user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) throw err;
                if (!isMatch) return res.status(400).json({
                    message: 'Wrong password'
                });*/
        res.status(200).send('Logged in successfully')
    })
})

//add question

router.post('/question/add', (req, res) => {

    const question = new Question({
        questionNumber: req.body.number,
        text: req.body.text
    }).save((err, response) => {
        if (err) res.status(400).send(err)
        res.status(200).send(response)
    })
})


//get all questions
router.get('/questions', (req, res) => {

    Question.find()
        .exec(function(err, questions) {
            if (err) {
                console.log(err)
            } else

                res.json(questions);

        });

})

//get question by id
router.get('/question/:questionId', (req, res) => {

    Question
        .findById(req.params.questionId)
        .exec(function(err, question) {
            if (err) {
                console.log(err)
            } else

                res.json(question);

        });

})

async function findQuestion(id) {
    return new Promise((resolve, reject) => {
        Question
            .findById(id)
            .exec(function(err, question) {
                if (err) {
                    reject(err)
                } else

                    resolve(question);

            });
    })


}


//update vote
router.put('/question/:questionId', async function vote(req, res) {
    return new Promise((resolve, reject) => {
        let question = findQuestion(req.params.questionId).then((question) => {
            if (req.body.vote === "Oui") {
                question.set('vote.Oui', question.get('vote.Oui') + 1)
                console.log("User voted Oui")

            } else if (req.body.vote === "Non") {
                question.vote.set('Non', question.vote.get('Non') + 1)
                console.log("User voted Non")

            } else
                question.vote.set('S\'abstenir', question.vote.get('S\'abstenir') + 1)
            question.save(function(err, res) {
                if (err) {
                    console.log(err)
                    reject(null)
                } else {
                    console.log(res);
                    resolve(question);
                }
            })



        })

        res.json(question)

    })
})









export default router;