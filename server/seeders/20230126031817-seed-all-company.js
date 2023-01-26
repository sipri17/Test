'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = [{
      name: "Perusahaan A",
      companyCode: "A-101",
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      name: "Perusahaan B",
      companyCode: "B-102",
      createdAt : new Date(),
      updatedAt : new Date()
    }]

    await queryInterface.bulkInsert('Companies', data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Companies', {}, {
      truncate: true, restartIdentity: true, cascade: true
    });

  }
};
