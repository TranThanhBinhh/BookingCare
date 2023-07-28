'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Schedules', 'currentNumber', {
      type: Sequelize.INTEGER,
      default: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Schedules', 'currentNumber', {
      type: Sequelize.STRING,
      default: false,
    });
  }
};
