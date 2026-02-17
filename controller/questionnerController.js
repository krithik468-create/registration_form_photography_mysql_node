const db = require("../models/db");
const answersHelper = require("../helper/answersHelper")

exports.getAllGroupQuestionner = (req,res)=> {
    const sql = "SELECT g.id AS group_id, g.group_name, g.sequence as group_sequence, g.status as group_status, q.id AS question_id,q.group_id as question_group_id, q.question, q.sequence as question_sequence, q.question_type as question_type, q.options as options, q.status as question_status FROM group_questionner g LEFT JOIN questionner q ON g.id = q.group_id ORDER BY g.sequence, q.sequence";
    db.query(sql,(err, results)=>{
         if (err) {
            return console.log(err.message)
        }

        if (!results?.length) {
        return res.json({ success: false, message: "No group/questionner available..." });
    }

        const groupedData = results.reduce((acc, row) => {
        // Check if we already added this group to our accumulator
        let group = acc.find(g => g.group_id === row.group_id);

        if (!group) {
            // Create a new group object
            group = {
                group_id: row.group_id,
                group_name: row.group_name,
                group_sequence: row.group_sequence,
                group_status: row.group_status,
                questions: [] // Default empty array
            };
            acc.push(group);
        }

        // If there is a question (it's not a group without questions), push to array
        if (row.question_id) {
            group.questions.push({
                question_id: row.question_id,
                question_group_id:row.question_group_id,
                question: row.question,
                question_sequence: row.question_sequence,
                question_type: row.question_type,
                options: row.options, // mysql2 parses JSON automatically
                question_status: row.question_status
            });
        }

        return acc;
    }, []);
            res.json({ success: true, data: groupedData });
    })
}


exports.addGroupQuestionner = (req,res) => {
    const {id,group_name,sequence} = req.body 
    const sql = "insert into group_questionner(id,group_name,sequence) values(?,?,?)";
    if (!id && !group_name && !sequence){
        return res.json({success : false, message : "Id should not be empty!"})
    }
    db.query(sql,[id, group_name,sequence],(err, results)=>{
        if (err){
            return res.json({success:false,message:err.message})
        }
        res.json({success:true,message:"Group questionner added successfully...",group_questionner : results.affectedRows})
    })
}

exports.addQuestionner = async(req,res) => {
    const {questions} = req.body
    try {
    const promises = questions.map(q => {
        const sql = "INSERT INTO questionner (id, group_id, question, question_type, options, sequence) VALUES (?, ?, ?, ?, ?, ?)";
        return db.promise().query(sql, [q.id, q.group_id, q.question, q.question_type, JSON.stringify(q.options), q.sequence]);
    });

    await Promise.all(promises);

    res.json({ success: true, message: "All questions added successfully." });
} catch (err) {
    res.status(500).json({ success: false, message: err.message });
}
}

exports.addAnswers = (req,res) => {
    const { answer } = req.body

    const name = answersHelper.getValue("name", answer);
    const phone = answersHelper.getValue("phone number", answer);
    const portfolio_link = answersHelper.getValue("portfolio", answer);
    const city = answersHelper.getValue("city", answer);
    const willing_to_travel = answersHelper.getValue("willing to travel", answer);

    console.log(req.body)
    const stringifyAnswers = JSON.stringify(answer)
    console.log(JSON.stringify(answer))

        const sql = "INSERT INTO registrations_form (id, name, phone, portfolio_link, city,willing_to_travel_practice, answers) VALUES (?,?, ?, ?, ?, ?, ?)";
        db.query(sql,[Date.now(),name, phone, portfolio_link, city, willing_to_travel,stringifyAnswers],(err, results) => {
            if (err){
                console.log(err.message)
            }
            res.json({success:true,message:"Form has registered successfully..."})
        })
}