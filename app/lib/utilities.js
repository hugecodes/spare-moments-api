const utils = {
  getADate: function() {
    const date = new Date();
    return date.setDate(date.getDate() + 2);
  },

  randomTime: function() {
    return Math.floor(Math.random() * 7) + 1;
  },

  getRandomSkill: function() {
    const skills = ['cooking', 'driving', 'yardwork', 'computer', 'financial', 'tutoring', 'errands', 'handyman'];
    return skills[Math.floor(Math.random() * skills.length)];
  }
};

module.exports = utils;
