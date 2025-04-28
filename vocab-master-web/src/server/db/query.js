export default {
  GetListWordsByListId: (listID) => {
    return `SELECT w.id, w.question, w."check"
            FROM Words w
            JOIN VocabularyLists vl
            CROSS JOIN Word_List wl ON wl.wordId = w.id AND wl.listId = vl.id 
            WHERE wl.listId = ${listID} `;
  },
  GetListDetails: (listID) => {
    return `SELECT id, title, description 
            FROM VocabularyLists 
            WHERE id=${listID}`;
  },
  GetListsAll: () => {
    return `SELECT id, title, description 
            FROM VocabularyLists`;
  },
  GetWords: () => {
    return `SELECT id, question, "check" 
            FROM Words`;
  },
  GetRandomWords: (num) => {
    return `SELECT id, question, "check" 
            FROM Words 
            ORDER BY RANDOM() LIMIT ${num}`;
  },
  GetUserByEmail: (email) => {
    return `select u.id, u.email,u.password, u.verified, p.firstName as name
    from Users u
    INNER JOIN Profiles p ON p.userId = u.id AND p.isDefault = 1
    where email = "${email}"`;
  },
  GetAllUsers: () => {
    return `SELECT id, email,password, verified
    FROM Users `;
  },
  GetUserInfoById: (userId) => {
    return `select u.id as userId, u.email, u.verified, p.id as profileId, p.avatar , p.firstName, p.lastName
    from Users u
    INNER JOIN Profiles p ON p.userId = ${userId} AND p.isDefault = 1
    where u.id = "${userId}"`;
  },
  GetDefaultProfileByUserId: (userId) => {
    return `SELECT id, firstName, lastName, avatar 
            FROM Profiles
            Where userId = ${userId} AND isDefault = 1`;
  },
  AddWordToList: (wordId, listId) => {
    return `INSERT INTO Word_List(wordId,listId) VALUES ("${wordId}","${listId}")`;
  },
  DeleteWord: (wordId) => {
    return `DELETE FROM Words WHERE id=${wordId}`;
  },
  DeleteWordFromList: (wordId, listId) => {
    return `DELETE FROM Word_List WHERE wordId=${wordId} AND listId=${listId}`;
  },
  DeleteList: (id) => {
    return `DELETE FROM VocabularyLists Where id=${id}`;
  },
  DeleteListWords: (listId) => {
    return `DELETE FROM Word_List Where listId=${listId}`;
  },
  InsertList: (title, description) => {
    return `INSERT INTO VocabularyLists(title,description) VALUES ("${title}","${description}")`;
  },
  InsertWord: (question, check) => {
    return `INSERT INTO Words(question,"check") VALUES ("${question}","${check}")`;
  },
  UpdateWord: (id, question, check) => {
    return `UPDATE Words SET question="${question}",
                            "check"="${check}" 
            WHERE id=${id}`;
  },
  UpdateListDetails: (id, title, description) => {
    return `UPDATE VocabularyLists SET title="${title}",
                            description="${description}" 
            WHERE id=${id}`;
  },
  InsertUser: (email, password) => {
    return `INSERT INTO Users(email,password) VALUES ("${email}","${password}")`;
  },
  InsertProfile: (firstName, lastName, userId, avatar, isDefault) => {
    return `INSERT INTO Profiles(firstName,lastName,userId,avatar,isDefault) VALUES ("${firstName}","${lastName}",${userId},"${avatar}",${
      isDefault ? 1 : 0
    })`;
  },
  InsertUserVerification: (verificationCode, userId, validDate) => {
    return `INSERT OR REPLACE INTO UserVerifications(userId,code,validDate) VALUES (${userId},"${verificationCode}","${validDate}")`;
  },
  GetUserVerification: (code) => {
    return `SELECT userId, code, validDate FROM UserVerifications WHERE code = "${code}"`;
  },
  GetUserVerificationByUserId: (userId) => {
    return `SELECT userId, code, validDate FROM UserVerifications WHERE userId = ${userId}`;
  },
  DeleteUserVerification: (userId, code) => {
    return `DELETE FROM UserVerifications WHERE userId = ${userId} AND code = "${code}"`;
  },
  UpdateUserVerified: (userId) => {
    return `UPDATE Users SET verified = 1 WHERE id = ${userId} `;
  },
  UpdateUserPassword: (userId, password) => {
    return `UPDATE Users SET password = "${password}" WHERE id = ${userId}`;
  },
};
