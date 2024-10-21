export default {
  GetListWordsByListId: (listID) => {
    return `SELECT w.id, w.question, w."check"
            FROM Words w
            JOIN VocabularyLists vl
            CROSS JOIN Word_List wl ON wl.wordId = w.id AND wl.listId = vl.id 
            WHERE wl.listId = ${listID} `;
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
    return `select id, email,password, verified
    from Users 
    where email = "${email}"`;
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
  GetUserVerification: (userId, code) => {
    return `SELECT userId, code, validDate FROM UserVerifications WHERE userId = ${userId} AND code = ${code}`;
  },
  UpdateUserVerified: (userId) => {
    return `UPDATE Users SET verified = 1 WHERE id = ${userId} `;
  },
};
