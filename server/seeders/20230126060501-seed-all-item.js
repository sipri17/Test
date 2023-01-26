'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
      name: "item1",
      price: 20000,
      stock : 10,
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      name: "item2",
      price: 30000,
      stock : 15,
      createdAt : new Date(),
      updatedAt : new Date()
    }]

    await queryInterface.bulkInsert('Items', data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Items', {}, {
      truncate: true, restartIdentity: true, cascade: true
    });

  }
};
