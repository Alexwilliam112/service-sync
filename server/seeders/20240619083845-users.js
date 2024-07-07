'use strict';
const { hash } = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const data = require('../data/users.json').map((el) => {
      el.password = hash(el.password)
      return el
    })
    await queryInterface.bulkInsert('Users', data, {})
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});
  }
};
