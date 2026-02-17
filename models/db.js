const mysql = require('mysql2')

const db = mysql.createConnection({
  host: "b7d2besz6iuauzjumsih-mysql.services.clever-cloud.com",
  user: "ugqfelqyxied3moo",
  password: "dSCrQgG3Y2vx92bne8a8",
  database: "b7d2besz6iuauzjumsih",
  port:3306,
  multipleStatements: true
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err)
        return
    }
    console.log('MySql Connected...')
})

const createTables = () => {
  const sql = `create table if not exists registrations_form (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    portfolio_link VARCHAR(255),
    city VARCHAR(100),
    willing_to_travel_practice VARCHAR(255),
    answers JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
create table if not exists group_questionner(
    id bigint PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL,
    sequence INT DEFAULT 1 not null,
    status TINYINT(1) DEFAULT 1, -- 1: Active, 0: Disabled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
create table if not exists questionner(
	id bigint PRIMARY KEY,
    group_id bigint not null,
    question varchar(255) not null,
    sequence int default 1 not null,
    question_type ENUM('text', 'radio', 'checkbox', 'textarea','number','select') NOT NULL,
    options JSON NULL,
    status TINYINT(1) DEFAULT 1, -- 1: Active, 0: Disabled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES group_questionner(id) ON DELETE CASCADE,
    CONSTRAINT chk_options_required CHECK (
        (question_type NOT IN ('checkbox','select')) OR (options IS NOT NULL)
    )
);`;
  db.query(sql, (err, results) => {
    if (err) {
        console.log(err)
      console.log("Error creating table...");
    } else {
      console.log("Users table created successfully...");
    }
  });
};
createTables();

module.exports = db